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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

// 导出简历为 PDF
const exportResume = async () => {
  const element = document.getElementById('resume-print')
  if (!element) return

  try {
    // 添加加载提示
    ElMessage.info('正在生成 PDF，请稍候...')
    
    // 等待组件渲染完成
    await nextTick()
    
    // 创建一个临时的容器用于导出
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.left = '1px'
    container.style.top = '1px'

    container.style.width = '210mm'
    container.style.height = '297mm'
    container.style.backgroundColor = '#ffffff'
    container.style.zIndex = '-9999'
    
    // 克隆原始元素到临时容器
    const clone = element.cloneNode(true) as HTMLElement
    container.appendChild(clone)
    document.body.appendChild(container)
    
    // 设置克隆元素的样式
    clone.style.width = '100%'
    clone.style.height = '100%'
    clone.style.position = 'relative'
    clone.style.display = 'block'
    clone.style.visibility = 'visible'
    clone.style.opacity = '1'

 
    
    
    // 使用 html2canvas 捕获内容
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      removeContainer: true,
      foreignObjectRendering: true,
      allowTaint: true,
      width: 210 * 3.78, // A4 宽度（毫米转换为像素）
      height: 297 * 3.78, // A4 高度（毫米转换为像素）
      onclone: (clonedDoc: Document) => {
        const clonedElement = clonedDoc.querySelector('#resume-print') as HTMLElement
        if (clonedElement) {
          clonedElement.style.width = '100%'
          clonedElement.style.height = '100%'
          clonedElement.style.position = 'relative'
          clonedElement.style.display = 'block'
          clonedElement.style.visibility = 'visible'
          clonedElement.style.opacity = '1'
          
        }
      }
    })
    
    // 创建 PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
    
    // 计算缩放比例以适应 A4 纸
    const imgWidth = 210 // A4 宽度
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    
    // 添加图片到 PDF
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 1.0),
      'JPEG',
      0,
      0,
      imgWidth,
      imgHeight
    )
    
    // 保存 PDF
    pdf.save('resume.pdf')
    
    // 移除临时容器
    document.body.removeChild(container)
    
    ElMessage.success('PDF 导出成功')
  } catch (error) {
    console.error('PDF 导出失败:', error)
    ElMessage.error('PDF 导出失败，请重试')
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