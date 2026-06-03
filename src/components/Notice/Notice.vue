<script setup lang="ts"></script>

<template>
  <el-dropdown trigger="click" placement="bottom-start">
    <Notification :value="12" />
    <template #dropdown>
      <NoticeMessageList />
    </template>
  </el-dropdown>
</template>
