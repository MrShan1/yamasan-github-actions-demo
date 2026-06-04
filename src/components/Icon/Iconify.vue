<script setup lang="ts">
import { Icon, type IconProps } from '@iconify/vue'

const props = defineProps<IconProps>()
</script>

<template>
  <component v-cloak :is="Icon" v-bind="props" />
</template>
