<!-- 开发全屏功能组件
添加全屏和退出全屏的图标class

使用动态组件展示全屏图标

使用useFullScreen实现全屏切换功能

添加props:tag，允许用户自定义组件标签
引用图标时可以在外部设置样式
 -->
<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

const props = defineProps({
  tag: {
    type: String,
    default: 'i',
  },
})

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <component
    :is="tag"
    :class="[
      isFullscreen ? 'ep--full-screen' : 'ri--fullscreen-exit-fill',
      'w-5 h-5 cursor-pointer',
    ]"
    @click="toggle"
  />
</template>

<style scoped>
@import '@/assets/icon.css';
</style>
