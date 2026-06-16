<template>
  <div class="p-4">
    <h3 class="text-xl font-bold mb-2">v-hasPermission</h3>
    <div class="mb-2 flex items-center gap-2">
      <el-button type="success" @click="changePermission('admin')">设置为管理员</el-button>
      <el-button type="success" @click="changePermission('user')">设置为普通用户</el-button>
      <el-button type="success" @click="changePermission(['admin', 'user'])"
        >设置为管理员和普通用户</el-button
      >
      <span class="text-gray-500">当前权限：{{ store.roles.join(',') }}</span>
    </div>
    <div class="mb-2 flex items-center gap-2">
      <el-button type="primary" v-hasPermission="['admin']">管理员按钮</el-button>
      <el-button type="primary" v-hasPermission="['user']">用户按钮</el-button>
      <el-button type="primary" v-hasPermission.not="['user']">非用户按钮</el-button>
    </div>

    <h3 class="text-xl font-bold mb-2">v-flash</h3>
    <el-button type="primary" @click="toggleFlash">切换显示</el-button>
    <div class="mb-2" v-if="isShowFlash">
      <div class="text-2xl" v-flash>这是一段文字</div>
      <ul v-flash>
        <li>这是一段文字1</li>
        <li>这是一段文字2</li>
        <li>这是一段文字3</li>
        <li>这是一段文字4</li>
      </ul>
    </div>

    <h3 class="text-xl font-bold mb-2">v-throttle</h3>
    <div class="mb-2 flex items-center gap-2">
      <el-button type="primary" v-throttle="handleThrottleClick">节流点击</el-button>
    </div>

    <h3 class="text-xl font-bold mb-2">v-debounce</h3>
    <div class="mb-2 flex items-center gap-2">
      <el-button type="primary" v-debounce="handleClick">防抖点击</el-button>
    </div>

    <h3 class="text-xl font-bold mb-2">v-copy</h3>
    <div class="mb-2 flex items-center gap-2">
      <input type="text" v-model="copyText" class="border border-gray-300 rounded-md p-2" />
      <el-button type="primary" v-copy="copyText">复制文本</el-button>
      <el-button type="primary" v-copy.mute="copyText">静默复制文本</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/user'

// ---------- v-copy ----------
const copyText = ref('Copy me')

// ---------- v-debounce ----------
const handleClick = () => {
  console.log('防抖点击')
}

// ---------- v-throttle ----------
let count = 0
const handleThrottleClick = () => {
  console.log('节流点击', count++)
}

// ---------- v-flash ----------
const isShowFlash = ref(true)
const toggleFlash = () => {
  isShowFlash.value = !isShowFlash.value
}

// ---------- v-hasPermission ----------
const store = useUserStore()
const changePermission = (roles: string | string[]) => {
  if (typeof roles === 'string') {
    roles = [roles]
  }
  store.$patch({ roles })
}
</script>
