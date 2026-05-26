<template>
  <i :class="className"></i>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import type { NetIconProps } from './types'

const props = withDefaults(defineProps<NetIconProps>(), {
  prefix: 'iconfont',
  fontFamily: 'icon',
})

const className = computed(() => `${props.prefix} ${props.fontFamily}-${props.type}`)

onBeforeMount(() => {
  if (props.url) {
    const existingLink = document.querySelector(`link[href="${props.url}"]`) // 检查是否已经加载过
    if (!existingLink) {
      const iconFont = document.createElement('link')
      iconFont.href = props.url
      iconFont.rel = 'stylesheet'
      document.head.appendChild(iconFont)
    }
  }
})
</script>
