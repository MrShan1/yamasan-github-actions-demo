<script setup lang="tsx">
import { ref } from 'vue'
import type { AvatarProps } from 'element-plus'
import type { NoticeMessageListProps, MessageListItem } from './types'

const props = defineProps<NoticeMessageListProps>()

const emit = defineEmits<{
  avatarClick: [avatar?: AvatarProps]
  itemClick: [item: MessageListItem]
}>()

function handleAvatarClick(avatar: AvatarProps) {
  emit('avatarClick', avatar)
}

function handleItemClick(item: MessageListItem) {
  emit('itemClick', item)
}

const activeName = ref(props.lists[0]?.name)

// const ClearAllIcon = () => <Iconify icon="ep:delete" />
// const MoreIcon = () => <Iconify icon="ep:more" />
</script>

<template>
  <div class="px-4 pb-4 pt-2 w-100">
    <!-- 消息标签页列表 -->
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="list in lists" :key="list.name" :label="list.title" :name="list.name">
        <!-- 消息列表 -->
        <ul v-if="list.contents">
          <li v-for="item in list.contents" :key="item.title" class="mb-2">
            <el-row justify="center" align="middle">
              <!-- 消息头像 -->
              <el-col
                v-if="item.avatar"
                :span="4"
                class="text-center"
                @click="handleAvatarClick(item.avatar)"
              >
                <el-avatar v-bind="Object.assign({ size: 'small' }, item.avatar)" />
              </el-col>
              <!-- 消息内容 -->
              <el-col :span="20" class="px-3" @click="handleItemClick(item)">
                <!-- 消息标题 + 标签 -->
                <el-row class="flex-nowrap!" align="middle">
                  <div class="text-base line-clamp-1">
                    {{ item.title }}
                  </div>
                  <el-tag v-if="item.tag" v-bind="item.tagProps" class="ml-2">
                    {{ item.tag }}
                  </el-tag>
                </el-row>
                <!-- 消息内容 -->
                <el-row v-if="item.content" class="mt-2">
                  <p class="text-sm text-gray-400 line-clamp-2">
                    {{ item.content }}
                  </p>
                </el-row>
                <!-- 消息时间 -->
                <el-row v-if="item.time" class="mt-2">
                  <p class="text-sm text-gray-400">{{ item.time }}</p>
                </el-row>
              </el-col>
            </el-row>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
    <el-button-group class="mt-2 w-full flex! justify-center">
      <el-button
        v-for="action in actions"
        :key="action.title"
        :icon="action.icon"
        class="flex-1"
        @click="action.click"
        >{{ action.title }}</el-button
      >
    </el-button-group>
  </div>
</template>

<style scoped lang="less">
:deep(.el-button) {
  border-width: 1px 1px 0;
  border-radius: 0;

  &:first-child {
    border-left-width: 0;
  }

  &:last-child {
    border-right-width: 0;
  }
}
</style>
