<template>
  <div>
    <!-- 触发选择图标的按钮 -->
    <el-button type="primary" @click="() => toggleVisible(true)">选择图标</el-button>
    <!-- 选择图标的弹窗 -->
    <el-dialog v-model="visible" title="选择图标" :width="width">
      <!-- 图标列表 -->
      <IconList
        :showIconNameFlag="false"
        @click="handleIconClick"
        activeClass="text-[#409eff]"
        itemWidth="1.875rem"
        itemClass=""
        iconClass="text-2xl"
      />
      <div class="mt-2 flex items-center justify-start">
        <!-- 图标颜色选择器 -->
        <el-color-picker v-model="color" />
        <!-- 图标大小选择器 -->
        <el-input-number v-model="size" :step="1" class="ml-2" />
      </div>
      <!-- 图标预览 -->
      <div class="mt-2">
        选中的图标：<Icon :icon="icon" :color="color" :width="size" :height="size" />
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

defineProps({
  width: {
    type: String,
    default: '50%',
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

<style lang="css" scoped></style>
