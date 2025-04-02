<template>
  <el-card class="skills-section">
    <template #header>
      <div class="flex items-center justify-between">
        <span class="text-lg font-semibold">技能特长</span>
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
          v-model="skillsList"
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
                    @click="removeSkill(index)"
                    type="danger"
                  />
                </div>
              </template>

              <el-form 
                :model="element"
                label-position="top"
                class="skills-form"
              >
                <el-row :gutter="12">
                  <el-col :span="12">
                    <el-form-item label="技能名称">
                      <el-input
                        v-model="element.name"
                        placeholder="例如：编程语言"
                        @input="updateSkill(index, element)"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="熟练程度">
                      <el-select
                        v-model="element.level"
                        placeholder="选择熟练程度"
                        class="w-full"
                        @change="updateSkill(index, element)"
                      >
                        <el-option label="入门" value="Beginner" />
                        <el-option label="熟练" value="Intermediate" />
                        <el-option label="精通" value="Advanced" />
                        <el-option label="专家" value="Expert" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="关键词" class="mt-2">
                  <div class="mb-2 flex flex-wrap gap-2">
                    <el-tag
                      v-for="(keyword, keywordIndex) in element.keywords"
                      :key="keywordIndex"
                      closable
                      :disable-transitions="false"
                      @close="removeKeyword(index, keywordIndex)"
                    >
                      {{ keyword }}
                    </el-tag>
                  </div>
                  
                  <div class="flex gap-2">
                    <el-input
                      v-model="newKeywords[index]"
                      placeholder="输入关键词后按回车或点击添加"
                      @keyup.enter="addKeyword(index)"
                      class="flex-1"
                    />
                    <el-button
                      type="primary"
                      @click="addKeyword(index)"
                    >
                      添加
                    </el-button>
                  </div>
                </el-form-item>
              </el-form>
            </el-card>
          </template>
        </draggable>

        <el-button
          type="primary"
          class="w-full mt-4"
          @click="addSkill"
        >
          <el-icon class="mr-2"><Plus /></el-icon>
          添加技能
        </el-button>
      </div>
    </el-collapse-transition>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useResumeStore } from '../../stores/resume';
import type { Skill } from '../../stores/resume';
import draggable from 'vuedraggable';
import { Plus, DCaret, Delete } from '@element-plus/icons-vue';

const resumeStore = useResumeStore();
const isExpanded = ref(true);
const newKeywords = ref<{ [key: number]: string }>({});

const skillsList = computed({
  get: () => resumeStore.resumeData.skills,
  set: (value) => {
    resumeStore.resumeData.skills = value;
  },
});

function addSkill() {
  const newSkill: Skill = {
    name: '',
    level: '',
    keywords: [],
  };
  resumeStore.addSkill(newSkill);
}

function updateSkill(index: number, skill: Skill) {
  resumeStore.updateSkill(index, skill);
}

function removeSkill(index: number) {
  resumeStore.removeSkill(index);
}

function addKeyword(index: number) {
  if (newKeywords.value[index]?.trim()) {
    const skill = { ...skillsList.value[index] };
    skill.keywords = [...skill.keywords, newKeywords.value[index].trim()];
    updateSkill(index, skill);
    newKeywords.value[index] = '';
  }
}

function removeKeyword(skillIndex: number, keywordIndex: number) {
  const skill = { ...skillsList.value[skillIndex] };
  skill.keywords = skill.keywords.filter((_, index) => index !== keywordIndex);
  updateSkill(skillIndex, skill);
}

function handleReorder() {
  // The v-model on draggable will automatically update the store
  // No additional handling needed
}
</script>

<style scoped>
.skills-section {
  margin-bottom: 16px;
}

.skills-section :deep(.el-card__header) {
  padding: 12px 20px;
  border-bottom: 1px solid var(--el-border-color-light);
}

.skills-section :deep(.el-card__body) {
  padding: 16px 20px;
}

.skills-form :deep(.el-form-item__label) {
  padding-bottom: 4px;
  line-height: 20px;
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.skills-form :deep(.el-form-item) {
  margin-bottom: 12px;
}

.skills-form :deep(.el-form-item:last-child) {
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

:deep(.el-tag) {
  @apply dark:bg-gray-700 dark:border-gray-600;
  margin-right: 4px;
  margin-bottom: 4px;
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
  margin-top: 12px;
}

:deep(.el-button--primary) {
  margin-top: 12px;
}
</style> 