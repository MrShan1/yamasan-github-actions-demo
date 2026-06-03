<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import type { NotificationProps } from './types'

const props = withDefaults(defineProps<NotificationProps>(), {
  icon: 'ep:bell',
  iconColor: '#333',
  iconSize: 30,
  size: 12,
  scale: 1,
})

// scale -> transform
function calculateTransform(scale: number) {
  // 定义scale和translateX的取值范围
  const minScale = 0.4
  const maxScale = 1
  const minTranslateX = 75
  const maxTranslateX = 100

  // 计算translateX的值
  const translateX =
    minTranslateX + ((maxTranslateX - minTranslateX) * (scale - minScale)) / (maxScale - minScale)

  // 返回完整的transform属性
  return `translateY(-50%) translateX(${translateX}%) scale(${scale})`
}

const transformData = computed(() => calculateTransform(props.scale))
</script>

<template>
  <!-- 旧版样式绑定color和size -->
  <!-- <el-badge
    :style="{
      '--notification-color': color ?? 'var(--el-color-danger)',
      '--notification-size': `${size}px` || 'var(--el-badge-size)',
    }"
  ></el-badge>-->

  <!-- 新版样式绑定参数color和size -->
  <el-badge
    :value="value"
    :color="color"
    :badge-style="{ fontSize: `${size}px`, transform: transformData }"
  >
    <Icon
      :icon="icon"
      :color="iconColor"
      :width="iconSize"
      :height="iconSize"
      class="cursor-pointer"
    />
  </el-badge>
</template>

<style scoped lang="less">
// 旧版样式绑定参数color和size
// @color: var(--notification-color);
// @size: var(--notification-size);
// :deep(.el-badge__content) {
//   background-color: @color;
//   font-size: @size;
// }
</style>
