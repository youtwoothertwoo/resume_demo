<template>
  <el-card class="basics-section">
    <template #header>
      <div class="flex items-center justify-between">
        <span class="text-lg font-semibold">个人信息</span>
        <el-button
          :icon="isExpanded ? 'ArrowUp' : 'ArrowDown'"
          @click="isExpanded = !isExpanded"
          text
        />
      </div>
    </template>

    <el-collapse-transition>
      <div v-show="isExpanded">
        <el-form :model="basics" label-position="top">
          <!-- Profile Picture -->
          <div class="flex items-center space-x-4 mb-4">
            <div class="relative">
              <el-upload
                class="avatar-uploader"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handleImageUpload"
                :before-upload="beforeImageUpload"
                accept=".jpg,.jpeg,.png"
              >
                <template v-if="profilePreview">
                  <img
                    :src="profilePreview"
                    class="w-20 h-20 rounded-full object-cover"
                  />
                  <div class="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <el-icon class="text-white text-xl"><EditPen /></el-icon>
                  </div>
                </template>
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
              <el-button
                v-if="profilePreview"
                type="danger"
                size="small"
                circle
                class="absolute -top-2 -right-2"
                @click.stop="removeAvatar"
              >
                <el-icon><Close /></el-icon>
              </el-button>
            </div>

            <el-form-item label="姓名" class="flex-1 mb-0">
              <el-input
                v-model="basics.name"
                placeholder="张三"
                @input="updateBasics"
              />
            </el-form-item>
          </div>

          <!-- Contact Information -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <el-form-item label="邮箱">
              <el-input
                v-model="basics.email"
                placeholder="john@example.com"
                type="email"
                @input="updateBasics"
              >
                <template #prefix>
                  <el-icon><Message /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="电话">
              <el-input
                v-model="basics.phone"
                placeholder="+86 (123) 456-7890"
                @input="updateBasics"
              >
                <template #prefix>
                  <el-icon><Phone /></el-icon>
                </template>
              </el-input>
            </el-form-item>
          </div>

          <!-- Location -->
          <el-form-item label="地址">
            <el-input
              v-model="basics.location"
              placeholder="温州市龙湾区"
              @input="updateBasics"
            >
              <template #prefix>
                <el-icon><Location /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <!-- Professional Summary -->
          <el-form-item label="个人总结">
            <el-input
              v-model="basics.summary"
              type="textarea"
              :rows="4"
              placeholder="写一段关于你的专业背景和职业目标的简短总结..."
              @input="updateBasics"
            />
          </el-form-item>
        </el-form>
      </div>
    </el-collapse-transition>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useResumeStore } from '../../stores/resume';
import type { ResumeBasics } from '../../stores/resume';
import { Plus, Message, Phone, Location, EditPen, Close } from '@element-plus/icons-vue';
import type { UploadFile } from 'element-plus';
import { ElMessage } from 'element-plus';

const resumeStore = useResumeStore();
const isExpanded = ref(true);
const profilePreview = ref<string>('');

const basics = reactive<ResumeBasics>({
  name: resumeStore.resumeData.basics.name,
  email: resumeStore.resumeData.basics.email,
  phone: resumeStore.resumeData.basics.phone,
  location: resumeStore.resumeData.basics.location,
  summary: resumeStore.resumeData.basics.summary,
  picture: resumeStore.resumeData.basics.picture,
});

function updateBasics() {
  resumeStore.updateBasics(basics);
}

// 图片上传前的验证
function beforeImageUpload(file: File): boolean {
  // 检查文件类型
  const isImage = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
  if (!isImage) {
    ElMessage.error('只能上传 JPG 或 PNG 格式的图片！');
    return false;
  }

  // 检查文件大小（2MB）
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB！');
    return false;
  }

  return true;
}

// 处理图片上传
function handleImageUpload(file: UploadFile) {
  if (!file.raw || !beforeImageUpload(file.raw)) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e.target?.result as string;
    profilePreview.value = result;
    basics.picture = result;
    updateBasics();
    ElMessage.success('头像上传成功');
  };

  reader.onerror = () => {
    ElMessage.error('图片读取失败，请重试');
  };

  reader.readAsDataURL(file.raw);
}

// 移除头像
function removeAvatar(e: Event) {
  e.stopPropagation();
  profilePreview.value = '';
  basics.picture = '';
  updateBasics();
  ElMessage.success('头像已移除');
}
</script>

<style scoped>
.basics-section :deep(.el-card__header) {
  padding: 12px 20px;
}

.basics-section :deep(.el-card__body) {
  padding: 20px;
}

.avatar-uploader {
  :deep(.el-upload) {
    @apply border border-gray-300 dark:border-gray-600 rounded-full;
    @apply w-20 h-20 cursor-pointer overflow-hidden;
    @apply hover:border-primary-500 dark:hover:border-primary-400;
    @apply relative;
  }
}

.avatar-uploader-icon {
  @apply text-gray-400 dark:text-gray-500;
  @apply w-20 h-20 flex items-center justify-center text-2xl;
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
</style>