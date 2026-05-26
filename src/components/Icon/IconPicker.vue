<template>
  <div class="icon-picker">
    <!-- 触发选择图标的按钮 -->
    <el-button type="primary" @click="() => toggleVisible(true)">选择图标</el-button>
    <!-- 选择图标的弹窗 -->
    <el-dialog v-model="visible" :title="title" :width="width">
      <!-- 图标列表 -->
      <IconList
        :showIconNameFlag="false"
        @click="handleIconClick"
        activeClass="text-[#409eff]"
        itemWidth="1.875rem"
        itemClass=""
        iconClass="text-2xl"
        v-model:defaultIcon="defaultIcon"
      />
      <div class="mt-2 py-2 flex items-center justify-start whitespace-nowrap">
        <div class="flex items-center">
          <span>图标颜色：</span>
          <el-color-picker v-model="color" class="ml-2" />
        </div>
        <div class="flex items-center ml-4 flex-1">
          <span>图标大小：</span>
          <el-slider v-model="size" show-input class="ml-2" />
        </div>
      </div>
      <!-- 图标预览 -->
      <div class="mt-2 flex items-start justify-start">
        <span>选中的图标：</span>
        <Icon class="ml-2" :icon="icon" :color="color" :width="size" :height="size" />
        <span class="ml-2">{{ icon }}</span>
      </div>
      <!-- 确定和取消按钮 -->
      <template #footer>
        <el-button @click="toggleVisible(false)">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useToggle } from '@vueuse/core'
import type { IconPickerDataType } from './types'

const [visible, toggleVisible] = useToggle(false)
const color = ref('#409eff')
const size = ref(16)
const icon = ref('')
const defaultIcon = ref('apple')

defineProps({
  width: {
    type: String,
    default: '50%',
  },
  title: {
    type: String,
    default: '选择图标',
  },
})

const emit = defineEmits<{
  (e: 'confirm', data: IconPickerDataType): void
}>()

function handleIconClick(iconName: string) {
  icon.value = iconName
}

const handleConfirm = () => {
  toggleVisible(false)
  emit('confirm', { icon: icon.value, color: color.value, size: size.value })
}
</script>

<style lang="less" scoped>
.icon-picker {
  :deep(.el-dialog__body) {
    height: auto;
    padding-top: 0;
    padding-bottom: 0;
    max-height: 65vh;
    overflow-y: auto;
  }
}
</style>
