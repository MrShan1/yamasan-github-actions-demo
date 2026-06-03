<script setup lang="tsx">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const activeTab = ref('message')

const DeleteIcon = () => <Icon icon="ep:delete" />
const MoreIcon = () => <Icon icon="ep:more" />
</script>

<template>
  <div class="px-4 pb-4 pt-2 w-100">
    <!-- 消息标签页列表 -->
    <el-tabs v-model="activeTab">
      <el-tab-pane label="消息" name="message">
        <!-- 消息列表 -->
        <ul>
          <li>
            <el-row justify="center" align="middle">
              <!-- 消息头像 -->
              <el-col :span="4" class="text-center">
                <el-avatar
                  size="small"
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                />
              </el-col>
              <!-- 消息内容 -->
              <el-col :span="20" class="px-3">
                <!-- 消息标题 + 标签 -->
                <el-row class="flex-nowrap!" align="middle">
                  <div class="text-base line-clamp-1">
                    消息标题消息标题消息标题消息标题消息标题消息标题消息标题
                  </div>
                  <el-tag type="success" size="small" effect="dark" class="ml-2">标签</el-tag>
                </el-row>
                <!-- 消息内容 -->
                <el-row class="mt-2">
                  <p class="text-sm text-gray-400 line-clamp-2">
                    消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容
                  </p>
                </el-row>
                <!-- 消息时间 -->
                <el-row class="mt-2">
                  <p class="text-sm text-gray-400">2026-06-03 10:00:00</p>
                </el-row>
              </el-col>
            </el-row>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
    <el-button-group class="mt-2 w-full flex! justify-center">
      <el-button type="link" :icon="DeleteIcon" class="flex-1">清空</el-button>
      <el-button type="link" :icon="MoreIcon" class="flex-1">更多</el-button>
    </el-button-group>
  </div>
</template>
