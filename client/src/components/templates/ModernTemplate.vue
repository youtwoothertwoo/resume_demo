<template>
  <div class="modern-template bg-white dark:bg-gray-900 min-h-[297mm] w-[210mm] mx-auto shadow-lg" :style="themeStyles">
    <!-- Header -->
    <header class="px-12 py-8 header-gradient text-white">
      <div class="flex items-center justify-center gap-6">
        <img
          v-if="props.resumeData.basics.picture"
          :src="props.resumeData.basics.picture"
          alt="头像"
          class="w-24 h-24 rounded-full object-cover border-4 border-white/30"
        />
        <div class="flex flex-col">
          <h1 class="text-4xl font-bold">{{ props.resumeData.basics.name }}</h1>
          <div class="mt-4 flex flex-wrap justify-center gap-6 text-sm">
            <div v-if="props.resumeData.basics.email" class="flex items-center">
              <el-icon class="mr-2"><Message /></el-icon>
              {{ props.resumeData.basics.email }}
            </div>
            <div v-if="props.resumeData.basics.phone" class="flex items-center">
              <el-icon class="mr-2"><Phone /></el-icon>
              {{ props.resumeData.basics.phone }}
            </div>
            <div v-if="props.resumeData.basics.location" class="flex items-center">
              <el-icon class="mr-2"><Location /></el-icon>
              {{ props.resumeData.basics.location }}
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="flex" >
      <!-- Left Column -->
      <div class="w-2/3 p-8 border-r border-gray-200 dark:border-gray-700">
        <!-- Professional Summary -->
        <section v-if="props.resumeData.basics.summary" class="mb-8">
          <h2 class="section-title">个人总结</h2>
          <div class="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed text-left pl-6">
            {{ props.resumeData.basics.summary }}
          </div>
        </section>

        <!-- Work Experience -->
        <section v-if="props.resumeData.work?.length" class="mb-8">
          <h2 class="section-title">工作经历</h2>
          <div class="mt-4 space-y-6">
            <div v-for="(work, index) in props.resumeData.work" :key="index" 
                 class="pl-6 pb-6 border-l-2 border-primary-500/20 last:pb-0">
              <div class="mb-2">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-left">{{ work.position }}</h3>
                <div class="flex items-center justify-between mt-1">
                  <span class="text-primary-600 dark:text-primary-400">{{ work.company }}</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(work.startDate) }} - {{ work.endDate ? formatDate(work.endDate) : '至今' }}
                  </span>
                </div>
              </div>
              <div class="text-gray-700 dark:text-gray-300 leading-relaxed text-left">
                {{ work.description }}
              </div>
            </div>
          </div>
        </section>

        <!-- Projects -->
        <section v-if="props.resumeData.projects?.length" class="mb-8">
          <h2 class="section-title">项目经历</h2>
          <div class="mt-4 space-y-6">
            <div v-for="(project, index) in props.resumeData.projects" :key="index" 
                 class="pl-6 rounded-lg">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ project.name }}</h3>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(project.startDate) }} - {{ project.endDate ? formatDate(project.endDate) : '至今' }}
                </span>
              </div>
              <div class="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed text-left">
                {{ project.description }}
              </div>
              <div v-if="project.technologies?.length" class="mt-3 flex flex-wrap gap-2">
                <span v-for="keyword in project.technologies" :key="keyword" 
                      class="px-2 py-0.5 text-xs rounded bg-primary-50 dark:bg-primary-900/30 
                             text-primary-700 dark:text-primary-300">
                  {{ keyword }}
                </span>
              </div>

              <a v-if="project.url" :href="project.url" target="_blank" 
                 class="text-primary-600 dark:text-primary-400 text-sm mt-2 block text-right">
                {{ project.url }}
              </a>

            </div>
          </div>
        </section>
      </div>

      <!-- Right Column -->
      <div class="w-1/3 p-8 ">
        <!-- Education -->
        <section v-if="props.resumeData.education?.length" class="mb-8">
          <h2 class="section-title">教育经历</h2>
          <div class="mt-4 space-y-4 text-left">
            <div v-for="(education, index) in props.resumeData.education" :key="index" 
                 class="p-3 rounded-lg ">
              <h3 class="font-semibold text-gray-900 dark:text-white">{{ education.institution }}</h3>
              <div class="text-primary-600 dark:text-primary-400 mt-1">
                {{ education.studyType }} · {{ education.area }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {{ formatDate(education.startDate) }} - {{ education.endDate ? formatDate(education.endDate) : '至今' }}
              </div>
            </div>
          </div>
        </section>

        <!-- Skills -->
        <section v-if="props.resumeData.skills?.length" class="mb-8">
          <h2 class="section-title">技能特长</h2>
          <div class="mt-4">
            <div v-for="(skill, index) in props.resumeData.skills" :key="index" 
                 class="p-3 rounded-lg ">
              <div class="flex items-center justify-between">
                <h3 >{{ skill.name }}</h3>
                <span class="text-sm text-primary-600 dark:text-primary-400">{{ skill.level }}</span>
              </div>
              <div v-if="skill.keywords?.length" class="mt-2 flex flex-wrap gap-1.5">
                <span v-for="keyword in skill.keywords" :key="keyword" 
                      class="px-2 py-0.5 text-xs rounded bg-gray-100 dark:bg-gray-700 
                             text-gray-700 dark:text-gray-300">
                  {{ keyword }}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ResumeData } from '../../stores/resume';
import { Message, Phone, Location, Link } from '@element-plus/icons-vue';
import { useThemeStore } from '../../stores/theme';

interface Props {
  resumeData: ResumeData;
}

const props = defineProps<Props>();
const themeStore = useThemeStore();

// 计算主题样式
const themeStyles = computed(() => {
  const { colors, fontFamily } = themeStore.currentTheme;
  return {
    '--theme-primary': colors.primary,
    '--theme-secondary': colors.secondary,
    '--theme-text': colors.text,
    '--theme-background': colors.background,
    '--theme-primary-rgb': hexToRgb(colors.primary),
    'font-family': fontFamily + ', system-ui, -apple-system, sans-serif',
  };
});

// 将十六进制颜色转换为 RGB
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

// 格式化日期
function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  return dateStr.replace(/-/g, '.');
}
</script>

<style scoped>
@import './style/base.css';
.modern-template {
  color: var(--theme-text);
  background-color: var(--theme-background);
}

.header-gradient {
  background: linear-gradient(to right, var(--theme-primary), var(--theme-secondary));
}

.section-title {
  @apply text-xl font-semibold pb-2 mb-2 border-b;
  text-align: left;
  color: var(--theme-text);
  border-color: rgb(var(--theme-primary-rgb) / 0.2);
}

:deep(.text-primary-600) {
  color: var(--theme-primary);
}

:deep(.dark .text-primary-400) {
  color: var(--theme-primary);
  opacity: 0.9;
}

:deep(.bg-primary-50) {
  background-color: rgba(var(--theme-primary-rgb), 0.1);
}

:deep(.text-primary-700) {
  color: var(--theme-secondary);
}

:deep(.border-primary-500\/20) {
  border-color: rgba(var(--theme-primary-rgb), 0.2);
}



</style> 