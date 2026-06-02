<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { BadgeProps } from 'element-plus'

interface NotificationProps extends Partial<BadgeProps> {
  icon?: string
  iconColor?: string
  iconSize?: number
  color?: string
  size?: number
}

const props = withDefaults(defineProps<NotificationProps>(), {
  icon: 'ep:bell',
  iconColor: '#333',
  iconSize: 30,
  size: 12,
})
</script>

<template>
  <!-- 旧版样式绑定color和size -->
  <!-- <el-badge
    :style="{
      '--notification-color': color || 'var(--el-color-danger)',
      '--notification-size': `${size}px` || 'var(--el-badge-size)',
    }"
  ></el-badge>-->

  <!-- 新版样式绑定参数color和size -->
  <el-badge :value="value" :color="color" :badge-style="{ fontSize: `${size}px` }">
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
@color: var(--notification-color);
@size: var(--notification-size);

:deep(.el-badge__content) {
  background-color: @color;
  font-size: @size;
}
</style>
