<template>
  <el-popover effect="light" trigger="hover" placement="top" width="auto">
    <template #default>
      <div>name: {{ name }}</div>
      <div>address: {{ address }}</div>
    </template>
    <template #reference>
      <el-tag>{{ name }}</el-tag>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string
    address: string
  }>(),
  {
    name: '',
    address: '',
  },
)
</script>
