<script setup lang="ts">
import { computed } from 'vue'
import type { AvatarProps, TabsPaneContext } from 'element-plus'
import type { NoticeProps, NoticeMessageListEmits, MessageListItem } from './types'

const props = defineProps<NoticeProps>()

const notificationProps = computed(() => {
  const { lists, actions, ...restProps } = props
  return restProps
})

const emit = defineEmits<NoticeMessageListEmits>()

const forwardedEvents = {
  avatarClick: (avatar?: AvatarProps) => emit('avatarClick', avatar),
  itemClick: (item: MessageListItem) => emit('itemClick', item),
  tabClick: (pane: TabsPaneContext, ev: Event) => emit('tabClick', pane, ev),
}
</script>

<template>
  <el-dropdown trigger="click" placement="bottom-start">
    <Notification v-bind="notificationProps" />
    <template #dropdown>
      <NoticeMessageList
        :lists="lists"
        :actions="actions"
        :wrapClass="wrapClass"
        :wrapStyle="wrapStyle"
        v-on="forwardedEvents"
      />
    </template>
  </el-dropdown>
</template>
