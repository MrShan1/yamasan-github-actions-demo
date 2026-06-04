<script setup lang="ts">
import { computed } from 'vue'
import type { NoticeProps } from './types'

const props = defineProps<NoticeProps>()

const notificationProps = computed(() => {
  const { lists, actions, ...restProps } = props
  return restProps
})
</script>

<template>
  <el-dropdown trigger="click" placement="bottom-start">
    <Notification v-bind="notificationProps" />
    <template #dropdown>
      <NoticeMessageList :lists="lists" :actions="actions" />
    </template>
  </el-dropdown>
</template>
