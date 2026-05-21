<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue'
import { Icon, loadIcons } from '@iconify/vue'
import json from '@iconify/json/json/mdi.json'

const iconPrefix = json.prefix // 获取图标前缀
const icons = Object.keys(json.icons) // 获取所有图标名称
const iconRef = ref<string>('mdi:home') // 初始化图标
// console.log(icons)

onBeforeMount(() => {
  loadIcons(icons.map((icon) => iconPrefix + ':' + icon)) // 预加载所有图标，避免图标闪烁问题
})

onMounted(() => {
  // 随机切换图标
  setInterval(() => {
    const randomIcon = icons[Math.floor(Math.random() * icons.length)]
    iconRef.value = iconPrefix + ':' + randomIcon
  }, 1000)
})
</script>

<template>
  <div class="container px-4">
    <h3>Element+ 组件</h3>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>

    <h3>Iconify 图标</h3>
    <Icon icon="mdi:home" class="text-red-500" />
    <!-- 使用动态组件渲染图标 -->
    <component :is="Icon" :icon="iconRef" />
  </div>
</template>

<style scoped>
h3 {
  margin-top: 15px;
  margin-bottom: 5px;
}
</style>
