<script setup lang="tsx">
import { ref } from 'vue'
import Iconify from '@/components/Icon/Iconify.vue'
import type { AvatarProps } from 'element-plus'
import type { MessageListItem } from '@/components/Notice/types'

const scale = ref(0.8)

const avartarUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const lists = ref([
  {
    name: 'message',
    title: '消息',
    contents: [
      {
        title: '消息1消息1消息1消息1消息1消息1消息1消息1消息1消息1消息1消息1消息1',
        content:
          '消息1内容消息1内容消息1内容消息1内容消息1内容消息1内容消息1内容消息1内容消息1内容消息1内容',
        time: '2026-06-03 10:00:00',
        tag: '标签',
        tagProps: { type: 'success' },
        avatar: { src: avartarUrl },
      },
      {
        title: '消息2',
        content: '消息2内容',
        time: '2026-06-03 10:00:00',
        avatar: { src: avartarUrl },
      },
      {
        title: '消息3',
        content: '消息3内容',
        time: '2026-06-03 10:00:00',
        avatar: { src: avartarUrl },
      },
    ],
  },
  {
    name: 'system',
    title: '系统',
    contents: [
      {
        title: '系统消息1',
      },
    ],
  },
])

const actions = ref([
  {
    title: '清空',
    icon: () => <Iconify icon="ep:delete" />,
    click: () => {
      console.log('清空')
    },
  },
  {
    title: '更多',
    icon: () => <Iconify icon="ep:more" />,
    click: () => {
      console.log('更多')
    },
  },
])

function handleAvatarClick(avatar: AvatarProps) {
  console.log(avatar)
}

function handleItemClick(item: MessageListItem) {
  console.log(item)
}
</script>

<template>
  <div class="p-4">
    <Notification
      :value="12"
      iconColor="#409eff"
      :iconSize="36"
      color="green"
      :size="12"
      :scale="scale"
    />
    <div class="mt-4 flex items-center gap-2">
      <span>缩放比例：</span>
      <el-slider
        v-model="scale"
        :min="0.4"
        :max="1.5"
        :step="0.1"
        size="small"
        style="width: 200px"
      />
      <span>{{ scale }}</span>
    </div>
    <Notice
      class="mt-4"
      :value="12"
      :lists="lists"
      :actions="actions"
      @avatarClick="handleAvatarClick"
      @itemClick="handleItemClick"
    />
  </div>
</template>
