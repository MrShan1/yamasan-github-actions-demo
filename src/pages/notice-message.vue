<script setup lang="ts">
import { ref } from 'vue'

const scale = ref(0.8)
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
  </div>
</template>
