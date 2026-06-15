<template>
  <div class="p-4">
    <h3 class="text-xl font-bold mb-2">v-copy</h3>
    <div class="flex items-center gap-2">
      <input type="text" v-model="copyText" class="border border-gray-300 rounded-md p-2" />
      <div v-copy="copyText" class="cursor-pointer">复制文本</div>
      <div v-copy.mute="copyText" class="cursor-pointer">静默复制文本</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const copyText = ref('Copy me')
</script>
