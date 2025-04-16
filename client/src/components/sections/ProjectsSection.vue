<template>
  <el-card class="projects-section">
    <template #header>
      <div class="flex items-center justify-between">
        <span class="text-lg font-semibold">项目经历</span>
        <el-button
          :icon="isExpanded ? 'ArrowUp' : 'ArrowDown'"
          @click="isExpanded = !isExpanded"
          text
        />
      </div>
    </template>

    <el-collapse-transition>
      <div v-show="isExpanded">
        <draggable
          v-model="projectsList"
          item-key="id"
          handle=".drag-handle"
          @end="handleReorder"
          class="space-y-4"
        >
          <template #item="{ element, index }">
            <el-card class="mb-4 !border-gray-200 dark:!border-gray-700">
              <template #header>
                <div class="flex justify-between items-center">
                  <div class="flex space-x-2">
                    <el-button
                      class="drag-handle"
                      text
                      :icon="DCaret"
                      title="拖动排序"
                    />
                  </div>
                  <el-button
                    text
                    :icon="Delete"
                    @click="removeProject(index)"
                    type="danger"
                  />
                </div>
              </template>

              <el-form 
                :model="element"
                label-position="top"
                class="projects-form"
              >
                <el-row :gutter="12">
                  <el-col :span="24">
                    <el-form-item label="项目名称">
                      <el-input
                        v-model="element.name"
                        placeholder="例如：个人作品集网站"
                        @input="updateProject(index, element)"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" class="mt-2">
                    <el-form-item label="开始日期">
                      <el-date-picker
                        v-model="element.startDate"
                        type="date"
                        placeholder="选择日期"
                        format="YYYY-MM-DD"
                        value-format="YYYY.MM.DD"
                        class="w-full"
                        @change="updateProject(index, element)"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" class="mt-2">
                    <el-form-item label="结束日期">
                      <el-date-picker
                        v-model="element.endDate"
                        type="date"
                        placeholder="选择日期"
                        format="YYYY-MM-DD"
                        value-format="YYYY.MM.DD"
                        class="w-full"
                        @change="updateProject(index, element)"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="项目链接" class="mt-2">
                  <el-input
                    v-model="element.url"
                    placeholder="https://example.com"
                    @input="updateProject(index, element)"
                  />
                </el-form-item>

                <el-form-item label="项目描述">
                  <el-input
                    v-model="element.description"
                    type="textarea"
                    :rows="3"
                    placeholder="描述项目目标、你的角色和贡献..."
                    @input="updateProject(index, element)"
                  />
                </el-form-item>

                <el-form-item label="使用技术">
                  <div class="mb-2">
                    <el-tag
                      v-for="(tech, techIndex) in element.technologies"
                      :key="techIndex"
                      closable
                      :disable-transitions="false"
                      @close="removeTechnology(index, techIndex)"
                      class="mr-2 mb-2"
                    >
                      {{ tech }}
                    </el-tag>
                  </div>
                  
                  <div class="flex gap-2">
                    <el-input
                      v-model="newTechnologies[index]"
                      placeholder="输入技术名称后按回车或点击添加"
                      @keyup.enter="addTechnology(index)"
                      class="flex-1"
                    />
                    <el-button
                      type="primary"
                      @click="addTechnology(index)"
                    >
                      添加
                    </el-button>
                  </div>
                </el-form-item>

                <el-form-item label="项目亮点">
                  <div class="space-y-2">
                    <div 
                      v-for="(highlight, highlightIndex) in element.highlights"
                      :key="highlightIndex"
                      class="flex gap-2"
                    >
                      <el-input
                        v-model="element.highlights[highlightIndex]"
                        placeholder="项目亮点或成就"
                        @input="updateProject(index, element)"
                      />
                      <el-button
                        type="danger"
                        :icon="Delete"
                        @click="removeHighlight(index, highlightIndex)"
                        text
                      />
                    </div>
                  </div>

                  <el-button
                    class="w-full mt-2"
                    @click="addHighlight(index)"
                  >
                    <el-icon class="mr-2"><Plus /></el-icon>
                    添加亮点
                  </el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </template>
        </draggable>

        <el-button
          type="primary"
          class="w-full mt-4"
          @click="addProject"
        >
          <el-icon class="mr-2"><Plus /></el-icon>
          添加项目
        </el-button>
      </div>
    </el-collapse-transition>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useResumeStore } from '../../stores/resume';
import type { Project } from '../../stores/resume';
import draggable from 'vuedraggable';
import { Plus, DCaret, Delete } from '@element-plus/icons-vue';

const resumeStore = useResumeStore();
const isExpanded = ref(true);
const newTechnologies = ref<{ [key: number]: string }>({});

const projectsList = computed({
  get: () => resumeStore.resumeData.projects,
  set: (value) => {
    resumeStore.resumeData.projects = value;
  },
});

function addProject() {
  const newProject: Project = {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    url: '',
    technologies: [],
    highlights: [],
  };
  resumeStore.addProject(newProject);
}

function updateProject(index: number, project: Project) {
  resumeStore.updateProject(index, project);
}

function removeProject(index: number) {
  resumeStore.removeProject(index);
}

function addTechnology(index: number) {
  if (newTechnologies.value[index]?.trim()) {
    const project = { ...projectsList.value[index] };
    project.technologies = [...project.technologies, newTechnologies.value[index].trim()];
    updateProject(index, project);
    newTechnologies.value[index] = '';
  }
}

function removeTechnology(projectIndex: number, techIndex: number) {
  const project = { ...projectsList.value[projectIndex] };
  project.technologies = project.technologies.filter((_, index) => index !== techIndex);
  updateProject(projectIndex, project);
}

function addHighlight(index: number) {
  const project = { ...projectsList.value[index] };
  project.highlights = [...project.highlights, ''];
  updateProject(index, project);
}

function removeHighlight(projectIndex: number, highlightIndex: number) {
  const project = { ...projectsList.value[projectIndex] };
  project.highlights = project.highlights.filter((_, index) => index !== highlightIndex);
  updateProject(projectIndex, project);
}

function handleReorder() {
  
}
</script>

<style scoped>
.projects-section {
  margin-bottom: 16px;
}

.projects-section :deep(.el-card__header) {
  padding: 10px 16px;
  border-bottom: 1px solid var(--el-border-color-light);
}

.projects-section :deep(.el-card__body) {
  padding: 16px;
}

.projects-form :deep(.el-form-item__label) {
  padding-bottom: 8px;
  line-height: 20px;
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.projects-form :deep(.el-form-item) {
  margin-bottom: 16px;
}

.projects-form :deep(.el-form-item:last-child) {
  margin-bottom: 0;
}

:deep(.el-card.mb-4) {
  margin-bottom: 16px;
  border: 1px solid var(--el-border-color-light);
}

:deep(.el-card.mb-4:last-child) {
  margin-bottom: 0;
}

:deep(.el-card.mb-4 .el-card__header) {
  padding: 8px 12px;
}

:deep(.el-card.mb-4 .el-card__body) {
  padding: 16px;
}

:deep(.el-input__wrapper),
:deep(.el-textarea__inner) {
  @apply dark:bg-gray-700 dark:text-white;
  box-shadow: 0 0 0 1px var(--el-border-color) inset;
}

:deep(.el-input__wrapper.is-focus),
:deep(.el-textarea__inner:focus) {
  box-shadow: 0 0 0 1px var(--el-color-primary) inset;
}

:deep(.el-form-item__label) {
  @apply dark:text-gray-300;
  width: 100%;
}

:deep(.el-card) {
  @apply dark:bg-gray-800 dark:border-gray-700;
}

:deep(.el-card__header) {
  @apply dark:bg-gray-800 dark:border-gray-700;
}

:deep(.drag-handle) {
  cursor: move;
  margin-right: 4px;
}

:deep(.el-tag) {
  @apply dark:bg-gray-700 dark:border-gray-600;
  margin: 0 4px 8px 0;
}

:deep(.el-tag .el-tag__close) {
  @apply dark:text-gray-400 dark:hover:text-white;
}

:deep(.el-select-dropdown__item) {
  @apply dark:text-gray-300;
}

:deep(.el-select-dropdown__item.hover) {
  @apply dark:bg-gray-700;
}

:deep(.el-select-dropdown__item.selected) {
  @apply dark:bg-gray-600;
}

:deep(.el-row) {
  margin-bottom: 0 !important;
}

:deep(.el-row + .el-row) {
  margin-top: 16px;
}

:deep(.el-button--primary) {
  margin-top: 16px;
}

:deep(.flex.space-x-2) {
  align-items: center;
}

:deep(.mb-2) {
  margin-bottom: 8px;
}

:deep(.el-date-editor.el-input) {
  width: 100%;
}
</style> 