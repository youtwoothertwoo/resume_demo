<template>
  <el-card class="work-section">
    <template #header>
      <div class="flex items-center justify-between">
        <span class="text-lg font-semibold">工作经历</span>
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
          v-model="workExperiences"
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
                    @click="removeExperience(index)"
                    type="danger"
                  />
                </div>
              </template>

              <el-form 
                :model="element"
                label-position="top"
                class="work-form"
              >
                <el-row :gutter="12">
                  <el-col :span="12">
                    <el-form-item label="公司">
                      <el-input
                        v-model="element.company"
                        placeholder="公司名称"
                        @input="updateExperience(index, element)"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="职位">
                      <el-input
                        v-model="element.position"
                        placeholder="职位名称"
                        @input="updateExperience(index, element)"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="12">
                  <el-col :span="12">
                    <el-form-item label="开始时间">
                      <el-date-picker
                        v-model="element.startDate"
                        type="date"
                        placeholder="选择开始时间"
                        format="YYYY-MM-DD"
                        value-format="YYYY.MM.DD"
                        style="width: 100%"
                        @change="updateExperience(index, element)"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="结束时间">
                      <el-date-picker
                        v-model="element.endDate"
                        type="date"
                        placeholder="选择结束时间"
                        format="YYYY-MM-DD"
                        value-format="YYYY.MM.DD"
                        style="width: 100%"
                        @change="updateExperience(index, element)"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="工作描述">
                  <el-input
                    v-model="element.description"
                    type="textarea"
                    :rows="4"
                    placeholder="描述你的工作职责和成就..."
                    @input="updateExperience(index, element)"
                  />
                </el-form-item>
              </el-form>
            </el-card>
          </template>
        </draggable>

        <el-button
          type="primary"
          class="w-full mt-4"
          @click="addExperience"
        >
          <el-icon class="mr-2"><Plus /></el-icon>
          添加工作经历
        </el-button>
      </div>
    </el-collapse-transition>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useResumeStore } from '../../stores/resume';
import type { WorkExperience } from '../../stores/resume';
import draggable from 'vuedraggable';
import { Plus, DCaret, Delete } from '@element-plus/icons-vue';

const resumeStore = useResumeStore();
const isExpanded = ref(true);

const workExperiences = computed({
  get: () => resumeStore.resumeData.work,
  set: (value) => {
    resumeStore.resumeData.work = value;
  },
});

function addExperience() {
  const newExperience: WorkExperience = {
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
  };
  resumeStore.addWorkExperience(newExperience);
}

function updateExperience(index: number, experience: WorkExperience) {
  resumeStore.updateWorkExperience(index, experience);
}

function removeExperience(index: number) {
  resumeStore.removeWorkExperience(index);
}

function handleReorder() {
  // The v-model on draggable will automatically update the store
  // No additional handling needed
}
</script>

<style scoped>
.work-section {
  margin-bottom: 16px;
}

.work-section :deep(.el-card__header) {
  padding: 12px 20px;
  border-bottom: 1px solid var(--el-border-color-light);
}

.work-section :deep(.el-card__body) {
  padding: 16px 20px;
}

.work-form :deep(.el-form-item__label) {
  padding-bottom: 4px;
  line-height: 20px;
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.work-form :deep(.el-form-item) {
  margin-bottom: 12px;
}

.work-form :deep(.el-form-item:last-child) {
  margin-bottom: 0;
}

:deep(.el-card.mb-4) {
  margin-bottom: 12px;
}

:deep(.el-card.mb-4:last-child) {
  margin-bottom: 0;
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
  border: 1px solid var(--el-border-color-light);
}

:deep(.el-card__header) {
  @apply dark:bg-gray-800 dark:border-gray-700;
}


:deep(.drag-handle) {
  cursor: move;
}

:deep(.el-date-editor.el-input),
:deep(.el-date-editor.el-input__wrapper) {
  width: 100% !important;
}

:deep(.el-row) {
  margin-bottom: 0 !important;
}

:deep(.el-row + .el-row) {
  margin-top: 12px;
}

:deep(.el-button--primary) {
  margin-top: 12px;
}
</style> 