<script setup lang="ts">
import ResumeBuilder from './components/ResumeBuilder.vue';
import MobileResumeBuilder from './components/MobileResumeBuilder.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="block lg:hidden">
      <MobileResumeBuilder />
    </div>
    <div class="hidden lg:block">
      <ResumeBuilder />
    </div>
  </div>
</template>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

:root {
  /* 主色调 - 清新绿色 */
  --el-color-primary: #10b981;
  --el-color-primary-light-3: #34d399;
  --el-color-primary-dark-2: #059669;
  
  /* 原有的其他变量保持不变 */
  --primary-50: #f0f9ff;
  --primary-100: #e0f2fe;
  --primary-200: #bae6fd;
  --primary-300: #7dd3fc;
  --primary-400: #38bdf8;
  --primary-500: #0ea5e9;
  --primary-600: #0284c7;
  --primary-700: #0369a1;
  --primary-800: #075985;
  --primary-900: #0c4a6e;
  --primary-950: #082f49;
}

/* 暗色模式下的按钮颜色 */
html.dark {
  --el-color-primary: #34d399;
  --el-color-primary-light-3: #6ee7b7;
  --el-color-primary-dark-2: #059669;
}

/* 按钮悬停效果优化 */
.el-button--primary {
  &:hover,
  &:focus {
    background-color: var(--el-color-primary-light-3);
    border-color: var(--el-color-primary-light-3);
  }
  
  &:active {
    background-color: var(--el-color-primary-dark-2);
    border-color: var(--el-color-primary-dark-2);
  }
}

/* 保持其他样式不变 */
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 打印样式 */
@media print {
  @page {
    margin: 0;
    size: A4;
  }
  
  html, body {
    height: auto;
    overflow: visible;
    background: white;
    
  }
}
</style>
