<template>
  <div class="classic-template bg-white dark:bg-gray-900 min-h-[297mm] w-[210mm] mx-auto shadow-lg p-8" :style="themeStyles">
    <!-- Header Section -->
    <header class="text-center mb-6">
      <div class="flex items-center justify-center gap-6 mb-4">
        <img
          v-if="props.resumeData.basics.picture"
          :src="props.resumeData.basics.picture"
          alt="头像"
          class="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
        />
        <div class="flex flex-col items-start">
          <h1 class="text-3xl font-bold text-primary">{{ props.resumeData.basics.name }}</h1>
          <div class="flex justify-start items-center gap-6 mt-3 text-gray-600 dark:text-gray-400">
            <span v-if="props.resumeData.basics.email" class="inline-flex items-center hover:text-primary transition-colors">
              <svg class="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {{ props.resumeData.basics.email }}
            </span>
            <span v-if="props.resumeData.basics.phone" class="inline-flex items-center hover:text-primary transition-colors">
              <svg class="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {{ props.resumeData.basics.phone }}
            </span>
            <span v-if="props.resumeData.basics.location" class="inline-flex items-center hover:text-primary transition-colors">
              <svg class="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ props.resumeData.basics.location }}
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Summary Section -->
    <section v-if="props.resumeData.basics.summary" class="mb-6">
      <h2 class="text-xl font-semibold border-b-2 border-primary/20 mb-3 pb-1 text-primary">个人总结</h2>
      <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">{{ props.resumeData.basics.summary }}</p>
    </section>

    <!-- Work Experience Section -->
    <section v-if="props.resumeData.work.length" class="mb-6">
      <h2 class="text-xl font-semibold border-b-2 border-primary/20 mb-3 pb-1 text-primary">工作经历</h2>
      <div class="space-y-4">
        <div v-for="(work, index) in props.resumeData.work" :key="index" class="space-y-2">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-medium">{{ work.position }}</h3>
              <p class="text-primary">{{ work.company }}</p>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ formatDate(work.startDate) }} - {{ work.endDate ? formatDate(work.endDate) : '至今' }}
            </p>
          </div>
          <p v-if="work.description" class="text-gray-700 dark:text-gray-300">{{ work.description }}</p>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section v-if="props.resumeData.education.length" class="mb-6">
      <h2 class="text-xl font-semibold border-b-2 border-primary/20 mb-3 pb-1 text-primary">教育经历</h2>
      <div class="space-y-4">
        <div v-for="(edu, index) in props.resumeData.education" :key="index" class="space-y-2">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-medium">{{ edu.studyType }} {{ edu.area }}</h3>
              <p class="text-primary">{{ edu.institution }}</p>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ formatDate(edu.startDate) }} - {{ edu.endDate ? formatDate(edu.endDate) : '至今' }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section v-if="props.resumeData.skills.length" class="mb-6">
      <h2 class="text-xl font-semibold border-b-2 border-primary/20 mb-3 pb-1 text-primary">技能特长</h2>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(skill, index) in props.resumeData.skills"
          :key="index"
          class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
        >
          {{ skill.name }}
          <span v-if="skill.level" class="ml-1 opacity-75">({{ skill.level }})</span>
        </span>
      </div>
      <div v-for="(skill, index) in props.resumeData.skills" :key="'keywords-'+index" class="mt-2">
        <div v-if="skill.keywords?.length" class="flex flex-wrap gap-2">
          <span
            v-for="(keyword, kIndex) in skill.keywords"
            :key="kIndex"
            class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
          >
            {{ keyword }}
          </span>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section v-if="props.resumeData.projects.length" class="mb-6">
      <h2 class="text-xl font-semibold border-b-2 border-primary/20 mb-3 pb-1 text-primary">项目经历</h2>
      <div class="space-y-4">
        <div v-for="(project, index) in props.resumeData.projects" :key="index" class="space-y-2">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-medium flex items-center">
                {{ project.name }}
                <a
                  v-if="project.url"
                  :href="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary hover:text-primary/80 ml-2 text-sm"
                >
                  <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ formatDate(project.startDate) }} - {{ project.endDate ? formatDate(project.endDate) : '至今' }}
              </p>
            </div>
          </div>
          <p v-if="project.description" class="text-gray-700 dark:text-gray-300">{{ project.description }}</p>
          <div v-if="project.technologies?.length" class="flex flex-wrap gap-2">
            <span
              v-for="(tech, tIndex) in project.technologies"
              :key="tIndex"
              class="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-sm"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ResumeData } from '../../stores/resume';
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

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  return dateStr.replace(/-/g, '.');
}
</script>

<style scoped>
@import './style/base.css';

.classic-template {
  color: var(--theme-text);
  background-color: var(--theme-background);
}

.text-primary {
  color: var(--theme-primary);
}

.border-primary\/20 {
  border-color: rgba(var(--theme-primary-rgb), 0.2);
}

.bg-primary\/10 {
  background-color: rgba(var(--theme-primary-rgb), 0.1);
}

.bg-primary\/20 {
  background-color: rgba(var(--theme-primary-rgb), 0.2);
}

.hover\:bg-primary\/20:hover {
  background-color: rgba(var(--theme-primary-rgb), 0.2);
}

.hover\:text-primary:hover {
  color: var(--theme-primary);
}

.hover\:text-primary\/80:hover {
  color: rgba(var(--theme-primary-rgb), 0.8);
}
</style>