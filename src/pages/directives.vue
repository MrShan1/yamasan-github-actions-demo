<template>
  <div class="p-4">
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
</script>
