<template>
  <div class="p-8">
    <Editor :options="options" v-model="modelValue" />
    <el-button type="primary" @click="handleClick" class="mt-2">修改编辑器内容</el-button>
    <el-button type="primary" @click="handleChangeLanguage" class="mt-2">修改编辑器语言</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Editor from '@/components/Editor/Editor.vue'
import type { VditorOptions } from '@/components/Editor/types'

const options = ref<VditorOptions>({
  height: 800,
  mode: 'ir', // 推荐使用ir模式，类似与typora使用
  cache: {
    id: Math.random().toString(36).slice(2), // 生成一个随机id，必传字段
  },
})

const modelValue = ref('')
function handleClick() {
  modelValue.value = '修改后的内容'
}

function handleChangeLanguage() {
  options.value.lang = 'en_US'
}
</script>
