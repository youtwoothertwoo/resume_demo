<!-- MobileResumeBuilder.vue -->
<template>
  <div class="h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Header -->
    <div class="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between p-4">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">菜菜的简历工厂</h1>
        <el-button @click="activeTab = activeTab === 'preview' ? 'edit' : 'preview'">
          <template #icon>
            <el-icon><component :is="activeTab === 'preview' ? 'Edit' : 'View'" /></el-icon>
          </template>
          {{ activeTab === 'preview' ? '编辑' : '预览' }}
        </el-button>
      </div>
      
      <!-- Quick Actions -->
      <div class="flex items-center gap-2 p-4 pt-0">
        <el-button type="primary" class="flex-1" @click="exportResume">
          <template #icon>
            <el-icon><Download /></el-icon>
          </template>
          导出简历
        </el-button>
        <el-button @click="showThemeSelector = true">
          <template #icon>
            <el-icon><Brush /></el-icon>
          </template>
          主题
        </el-button>
      </div>
    </div>

    <!-- Content Area -->
    <div v-if="activeTab === 'edit'" class="h-[calc(100vh-120px)] overflow-y-auto">
      <div class="p-4 space-y-4">
        <template v-for="section in resumeData.sections" :key="section">
          <component
            :is="getSectionComponent(section)"
            v-if="isSectionVisible(section)"
          />
        </template>
      </div>
    </div>

    <!-- Preview Area -->
    <div v-else class="h-[calc(100vh-120px)] overflow-y-auto bg-gray-100 dark:bg-gray-900">
      <div class="p-4">
        <div class="bg-white dark:bg-gray-800 shadow-sm transform-gpu">
          <component
            id="resume-print"
            :is="getCurrentTemplate"
            :resume-data="resumeData"
          />
        </div>
      </div>
    </div>

    <!-- Theme Selector Dialog -->
    <el-dialog
      v-model="showThemeSelector"
      title="选择主题"
      width="90%"
      :close-on-click-modal="true"
      class="mobile-dialog"
    >
      <ThemeSelector />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { useResumeStore } from '../stores/resume';
import { useThemeStore } from '../stores/theme';
import { Download, Edit, View, Brush } from '@element-plus/icons-vue';
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
import { API_ENDPOINTS } from '../config/api';


const resumeStore = useResumeStore();
const themeStore = useThemeStore();

const resumeData = computed(() => resumeStore.resumeData);
const activeTab = ref('edit');
const showThemeSelector = ref(false);

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
    const element = document.querySelector('#resume-print');
    if (!element) {
      ElMessage.error('未找到简历模板');
      return;
    }

    ElMessage.info('正在生成PDF，请稍候...');

    // 收集所有样式表
    const styles = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          console.warn('无法读取样式表:', e);
          return '';
        }
      })
      .join('\n');

    // 创建完整的HTML
    const html = `
      <html>
        <head>
          <style>${styles}</style>
        </head>
        <body>
          ${element.outerHTML}
        </body>
      </html>
    `;

    // 发送到服务器生成PDF
    const response = await fetch(API_ENDPOINTS.EXPORT_PDF, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ html })
    });

    if (!response.ok) {
      throw new Error('PDF生成失败');
    }

    // 下载PDF
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume_${new Date().toISOString().slice(0, 10)}.pdf`;
    a.click();

    // 清理URL对象
    window.URL.revokeObjectURL(url);
    
    ElMessage.success('PDF导出成功');
  } catch (error) {
    console.error('导出失败:', error);
    ElMessage.error('导出失败，请重试');
  }
}

</script>

<style scoped>
/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600;
  border-radius: 2px;
}

/* 移动端预览缩放 */
.transform-gpu {
  transform: scale(0.85);
  transform-origin: top center;
}


/* 移动端对话框样式 */
:deep(.mobile-dialog) {
  .el-dialog {
    margin: 1rem auto !important;
    max-width: calc(100vw - 2rem) !important;
  }
}
</style> 