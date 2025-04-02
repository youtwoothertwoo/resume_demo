<template>
  <div class="space-y-4">
    <!-- Theme Selection -->
    <div class="grid grid-cols-2 gap-3">
      <el-button
        v-for="theme in themes"
        :key="theme.id"
        @click="setTheme(theme.id)"
        :class="{
          'is-selected': currentThemeId === theme.id
        }"
        class="theme-button !flex !items-center !justify-start !h-auto !p-3"
        style="margin: 0;"
      >
        <div class="flex items-center space-x-2">
          <div
            class="w-4 h-4 rounded-full"
            :style="{ backgroundColor: theme.colors.primary }"
          />
          <span class="text-sm">
            {{ theme.name }}
          </span>
        </div>
      </el-button>
    </div>

    <!-- Color Customization -->
    <div class="space-y-3">
      <h3 class="text-sm font-medium">颜色配置</h3>
      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="(color, key) in currentTheme.colors"
          :key="key"
          class="space-y-1"
        >
          <label class="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {{ key }}
          </label>
          <div class="flex items-center space-x-2">
            <el-color-picker
              v-model="colors[key]"
              :predefine="predefineColors"
              @change="updateThemeColors"
              size="small"
              show-alpha
              class="!w-full"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Dark Mode Toggle -->
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium">深色模式</span>
      <el-switch
        v-model="isDarkMode"
        @change="toggleDarkMode"
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useThemeStore } from '../stores/theme';
import { Moon, Sunny } from '@element-plus/icons-vue';

const themeStore = useThemeStore();

const themes = computed(() => themeStore.themes);
const currentThemeId = computed(() => themeStore.currentThemeId);
const currentTheme = computed(() => themeStore.currentTheme);
const isDarkMode = computed({
  get: () => themeStore.isDarkMode,
  set: () => {} // 由 toggleDarkMode 处理
});

const colors = ref({ ...currentTheme.value.colors });

// 预定义的颜色选项
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  '#000000',
  '#ffffff'
];

watch(() => currentTheme.value, (newTheme) => {
  colors.value = { ...newTheme.colors };
}, { deep: true });

function setTheme(themeId: string) {
  themeStore.setTheme(themeId);
}

function updateThemeColors() {
  themeStore.updateTheme(currentThemeId.value, {
    colors: { ...colors.value }
  });
}

function toggleDarkMode() {
  themeStore.toggleDarkMode();
}

// Update document classes for dark mode
watch(isDarkMode, (darkMode) => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, { immediate: true });

// Initialize dark mode based on system preference
onMounted(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark && !isDarkMode.value) {
    toggleDarkMode();
  }
});
</script>

<style scoped>
.theme-button {
  border: 1px solid var(--el-border-color);
}

.theme-button.is-selected {
  border-color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
}

.theme-button:hover {
  border-color: var(--el-color-primary-light-7);
}

:deep(.el-color-picker) {
  width: 100%;
}

:deep(.el-color-picker__trigger) {
  width: 100%;
  height: 32px;
  padding: 2px;
  border: 1px solid var(--el-border-color);
}

:deep(.el-color-picker__color) {
  border: none;
}

:deep(.el-switch) {
  --el-switch-on-color: var(--el-color-primary);
}

.dark {
  :deep(.theme-button.is-selected) {
    background-color: var(--el-color-primary-dark-2);
  }
  
  :deep(.el-color-picker__trigger) {
    background-color: var(--el-bg-color);
    border-color: var(--el-border-color-darker);
  }
}
</style> 