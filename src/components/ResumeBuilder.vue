<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar -->
    <div class="w-64 flex-shrink-0 h-full overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div class="p-4">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">菜菜的简历工厂</h1>
        </div>
        
        <!-- Export Button -->
        <div class="mb-6">
          <el-button
            type="primary"
            class="w-full"
            @click="exportResume"
          >
            <template #icon>
              <el-icon><Download /></el-icon>
            </template>
            导出简历
          </el-button>
        </div>

        <!-- Theme Selection -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">主题</h2>
          <ThemeSelector />
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 h-full overflow-y-auto min-w-[600px]">
      <div class="w-full p-8">
        <!-- Sections -->
        <div class="space-y-4">
          <template v-for="section in resumeData.sections" :key="section">
            <component
              :is="getSectionComponent(section)"
              v-if="isSectionVisible(section)"
            />
          </template>
        </div>
      </div>
    </div>

    <!-- Preview -->
    <div class="flex-shrink-0 h-full overflow-y-auto bg-gray-100 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700">
      <div class="p-8">
        <div class="bg-white dark:bg-gray-800 shadow-lg">
          <component
            id="resume-print"
            :is="getCurrentTemplate"
            :resume-data="resumeData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useResumeStore } from '../stores/resume';
import { useThemeStore } from '../stores/theme';
import { Download } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import ThemeSelector from './ThemeSelector.vue';
import BasicsSection from './sections/BasicsSection.vue';
import WorkSection from './sections/WorkSection.vue';
import EducationSection from './sections/EducationSection.vue';
import SkillsSection from './sections/SkillsSection.vue';
import ProjectsSection from './sections/ProjectsSection.vue';
import ModernTemplate from './templates/ModernTemplate.vue';
import ClassicTemplate from './templates/ClassicTemplate.vue';
import MinimalTemplate from './templates/MinimalTemplate.vue';

const resumeStore = useResumeStore();
const themeStore = useThemeStore();

const resumeData = computed(() => resumeStore.resumeData);

const getCurrentTemplate = computed(() => {
  switch (themeStore.currentThemeId) {
    case 'modern':
      return ModernTemplate;
    case 'classic':
      return ClassicTemplate;
    case 'minimal':
      return MinimalTemplate;
    default:
      return ModernTemplate;
  }
});

const sectionComponents = {
  basics: BasicsSection,
  work: WorkSection,
  education: EducationSection,
  skills: SkillsSection,
  projects: ProjectsSection,
};

function getSectionComponent(section: string) {
  return sectionComponents[section as keyof typeof sectionComponents];
}

function isSectionVisible(section: string): boolean {
  return section in sectionComponents;
}

// 导出简历
async function exportResume() {
  try {
    // 这里可以根据需要添加不同的导出格式选项
    const element = document.querySelector('#resume-print');
    if (!element) {
      ElMessage.error('未找到简历模板');
      return;
    }

    // 这里先用简单的打印功能代替
    window.print();
    ElMessage.success('正在准备打印...');
  } catch (error) {
    console.error('导出失败:', error);
    ElMessage.error('导出失败，请重试');
  }
}
</script>

<style scoped>
/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}

/* 确保预览区域完整显示 */
@media screen and (max-width: 1600px) {
  .w-\[210mm\] {
    width: 297mm; /* A4纸宽度 */
  }
}

/* 打印样式 */
@media print {
  .w-64,
  .flex-1 {
    display: none !important;
  }
  
  .flex-shrink-0 {
    width: 100% !important;
    height: auto !important;
    overflow: visible !important;
  }

  .p-8 {
    padding: 0 !important;
  }

  .shadow-lg {
    box-shadow: none !important;
  }
}
</style> 