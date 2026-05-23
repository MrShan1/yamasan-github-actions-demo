<template>
  <NetIcon v-bind="props" />
</template>

<script setup lang="ts">
import NetIcon from './NetIcon.vue'
import type { NetIconProps } from './types'

type Props = NetIconProps & {
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  url: '//at.alicdn.com/t/c/font_5177399_n7oi47jxo9j.css',
  prefix: 'iconfont',
  fontFamily: 'icon',
})
</script>
