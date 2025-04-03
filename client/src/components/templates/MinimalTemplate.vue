<template>
  <div class="minimal-template bg-white dark:bg-gray-900 min-h-[297mm] w-[210mm] mx-auto shadow-lg p-8" :style="themeStyles">
    <!-- Header Section -->
    <header class="mb-8">
      <div class="flex items-start justify-between gap-6 mb-6">
        <div class="flex-1">
          <h1 class="text-4xl font-light text-primary tracking-wide">{{ props.resumeData.basics.name }}</h1>
          <div class="flex flex-wrap gap-4 text-base text-gray-600 dark:text-gray-400 mt-4">
            <span v-if="props.resumeData.basics.email" class="flex items-center hover:text-primary transition-colors">
              <svg class="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {{ props.resumeData.basics.email }}
            </span>
            <span v-if="props.resumeData.basics.phone" class="flex items-center hover:text-primary transition-colors">
              <svg class="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {{ props.resumeData.basics.phone }}
            </span>
            <span v-if="props.resumeData.basics.location" class="flex items-center hover:text-primary transition-colors">
              <svg class="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ props.resumeData.basics.location }}
            </span>
          </div>
        </div>
        <img
          v-if="props.resumeData.basics.picture"
          :src="props.resumeData.basics.picture"
          alt="头像"
          class="w-24 h-24 object-cover"
        />
      </div>
    </header>

    <!-- Summary Section -->
    <section v-if="props.resumeData.basics.summary" class="mb-8">
      <p class="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{{ props.resumeData.basics.summary }}</p>
    </section>

    <!-- Work Experience Section -->
    <section v-if="props.resumeData.work.length" class="mb-8">
      <h2 class="text-xl font-light mb-4 text-primary border-b border-primary/20 pb-2">工作经历</h2>
      <div class="space-y-6">
        <div v-for="(work, index) in props.resumeData.work" :key="index">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
            <div class="space-y-1">
              <h3 class="text-lg font-medium">{{ work.position }}</h3>
              <p class="text-base text-primary">{{ work.company }}</p>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400 font-light">
              {{ formatDate(work.startDate) }} - {{ work.endDate ? formatDate(work.endDate) : '至今' }}
            </span>
          </div>
          <p v-if="work.description" class="text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-2">{{ work.description }}</p>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section v-if="props.resumeData.projects.length" class="mb-8">
      <h2 class="text-xl font-light mb-4 text-primary border-b border-primary/20 pb-2">项目经历</h2>
      <div class="space-y-6">
        <div v-for="(project, index) in props.resumeData.projects" :key="index">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
            <div class="space-y-1">
              <h3 class="text-lg font-medium flex items-center">
                {{ project.name }}
                <a
                  v-if="project.url"
                  :href="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary hover:text-primary/80 ml-2 text-base font-normal"
                >
                  <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </h3>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400 font-light">
              {{ formatDate(project.startDate) }} - {{ project.endDate ? formatDate(project.endDate) : '至今' }}
            </span>
          </div>
          <p v-if="project.description" class="text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-2 mb-2">{{ project.description }}</p>
          <div v-if="project.technologies?.length" class="flex flex-wrap gap-2">
            <span
              v-for="(tech, tIndex) in project.technologies"
              :key="tIndex"
              class="px-2 py-0.5 text-sm rounded-full bg-primary/10 text-primary font-medium"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section v-if="props.resumeData.education.length" class="mb-8">
      <h2 class="text-xl font-light mb-4 text-primary border-b border-primary/20 pb-2">教育经历</h2>
      <div class="space-y-4">
        <div v-for="(edu, index) in props.resumeData.education" :key="index">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
            <div class="space-y-1">
              <h3 class="text-lg font-medium">{{ edu.studyType }} {{ edu.area }}</h3>
              <p class="text-base text-primary">{{ edu.institution }}</p>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400 font-light">
              {{ formatDate(edu.startDate) }} - {{ edu.endDate ? formatDate(edu.endDate) : '至今' }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section v-if="props.resumeData.skills.length" class="mb-8">
      <h2 class="text-xl font-light mb-4 text-primary border-b border-primary/20 pb-2">技能特长</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="(skill, index) in props.resumeData.skills" :key="index">
          <div class="flex items-baseline gap-2 mb-2">
            <h3 class="text-lg font-medium">{{ skill.name }}</h3>
            <span v-if="skill.level" class="text-sm text-primary font-medium">{{ skill.level }}</span>
          </div>
          <div v-if="skill.keywords?.length" class="flex flex-wrap gap-2">
            <span
              v-for="(keyword, kIndex) in skill.keywords"
              :key="kIndex"
              class="px-2 py-0.5 text-sm rounded-full bg-primary/10 text-primary font-medium"
            >
              {{ keyword }}
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
    'font-family': fontFamily + ', system-ui, -apple-system, sans-serif',
  };
});

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  return dateStr.replace(/-/g, '.');
}
</script>

<style scoped>
@import './style/base.css';

.minimal-template {
  color: var(--theme-text);
  background-color: var(--theme-background);
}

.text-primary {
  color: var(--theme-primary);
}

.bg-primary\/10 {
  background-color: rgba(var(--theme-primary-rgb), 0.1);
}

.border-primary\/20 {
  border-color: rgba(var(--theme-primary-rgb), 0.2);
}

.hover\:text-primary:hover {
  color: var(--theme-primary);
}

.hover\:text-primary\/80:hover {
  color: rgba(var(--theme-primary-rgb), 0.8);
}
</style> 