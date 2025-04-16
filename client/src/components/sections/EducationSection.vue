<template>
  <el-card class="education-section">
    <template #header>
      <div class="flex items-center justify-between">
        <span class="text-lg font-semibold">教育经历</span>
        <el-button
          :icon="isExpanded ? 'ArrowUp' : 'ArrowDown'"
          @click="isExpanded = !isExpanded"
          text
        />
      </div>
    </template>

    <el-collapse-transition>
      <div v-show="isExpanded">
        <el-form :model="educationList" label-position="top">
          <draggable
            v-model="educationList"
            item-key="id"
            handle=".drag-handle"
            @end="handleReorder"
            class="space-y-4"
          >
            <template #item="{ element, index }">
              <el-card class="mb-4 !border-gray-200 dark:!border-gray-700">
                <template #header>
                  <div class="flex justify-end space-x-2">
                    <el-button
                      class="drag-handle !p-1"
                      text
                      :icon="DCaret"
                      title="拖动排序"
                    />
                    <el-button
                      class="!p-1"
                      text
                      :icon="Delete"
                      @click="removeEducation(index)"
                      type="danger"
                    />
                  </div>
                </template>

                <el-form-item>
                  <el-row :gutter="16">
                    <el-col :span="12">
                      <el-form-item label="学校名称">
                        <el-input
                          v-model="element.institution"
                          placeholder="大学或学校名称"
                          @input="updateEducation(index, element)"
                        >
                          
                        </el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label="学历">
                        <el-input
                          v-model="element.studyType"
                          placeholder="输入学历"
                          class="w-full"
                          @input="updateEducation(index, element)"
                        >
                         
                        </el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="24">
                      <el-form-item label="专业方向">
                        <el-input
                          v-model="element.area"
                          placeholder="专业或研究方向"
                          @input="updateEducation(index, element)"
                        >
                          
                        </el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label="开始时间">
                        <el-date-picker
                          v-model="element.startDate"
                          type="date"
                          placeholder="选择开始时间"
                          format="YYYY-MM-DD"
                          value-format="YYYY.MM.DD"
                          class="w-full"
                          @change="updateEducation(index, element)"
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
                          class="w-full"
                          @change="updateEducation(index, element)"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-card>
            </template>
          </draggable>

          <el-button
            type="primary"
            class="w-full mt-4"
            @click="addEducation"
          >
            <el-icon class="mr-2"><Plus /></el-icon>
            添加教育经历
          </el-button>
        </el-form>
      </div>
    </el-collapse-transition>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useResumeStore } from '../../stores/resume';
import type { Education } from '../../stores/resume';
import draggable from 'vuedraggable';
import { Plus, School, Reading, DCaret, Delete } from '@element-plus/icons-vue';

const resumeStore = useResumeStore();
const isExpanded = ref(true);

const educationList = computed({
  get: () => resumeStore.resumeData.education,
  set: (value) => {
    resumeStore.resumeData.education = value;
  },
});

function addEducation() {
  const newEducation: Education = {
    institution: '',
    area: '',
    studyType: '',
    startDate: '',
    endDate: '',
  };
  resumeStore.addEducation(newEducation);
}

function updateEducation(index: number, education: Education) {
  resumeStore.updateEducation(index, education);
}

function removeEducation(index: number) {
  resumeStore.removeEducation(index);
}

function handleReorder() {
  
}
</script>

<style scoped>
.education-section :deep(.el-card__header) {
  padding: 12px 20px;
}

.education-section :deep(.el-card__body) {
  padding: 20px;
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

:deep(.el-select) {
  width: 100%;
}

:deep(.el-date-editor.el-input) {
  width: 100%;
}

:deep(.el-card) {
  @apply dark:bg-gray-800 dark:border-gray-700;
}

:deep(.el-card__header) {
  @apply dark:bg-gray-800 dark:border-gray-700;
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
</style> 