<script setup lang="ts">
import { ref } from 'vue'
import { Icon, addAPIProvider } from '@iconify/vue'
import svgIcon from '../assets/icons/chuang.svg'

const iconRef = ref<string>('@local:mdi:123') // 初始化图标

// 添加本地图标提供者
addAPIProvider('local', {
  resources: ['http://localhost:5173'],
})
</script>

<template>
  <div class="container px-4">
    <h3>全屏组件</h3>
    <FullScreen tag="span" style="color: blue; width: 20px; height: 20px" />

    <h3>主题切换组件 - 明亮|暗黑</h3>
    <DarkModeToggle :dark="false" />
    <!-- 在main.css中添加tailwind的指令@custom-variant dark (&:where(.dark, .dark *)) -->
    <!-- 然后在自定义元素中使用dark:xxx添加暗黑主题样式 -->
    <div class="bg-white dark:bg-red-500">自定义元素使用dark:xxx添加暗黑主题样式</div>

    <h3>IconPicker组件</h3>
    <IconPicker />

    <h3>IconList组件</h3>
    <IconList />

    <h3>IconFont 图标</h3>
    <NetIcon
      type="chuang"
      url="//at.alicdn.com/t/c/font_5177399_n7oi47jxo9j.css"
      class="text-blue-500 w-5 h-5"
    />
    <IconFontIcon type="kongtiao" class="text-green-500 w-5 h-5" />
    <IconFontIcon type="nuanqi" class="text-green-500 w-5 h-5" />

    <h3>SVG 图标</h3>
    <img :src="svgIcon" alt="SVG Icon" class="text-red-500 w-5 h-5" />
    <SvgIcon name="chugui" class="text-red-500 w-5 h-5" />

    <h3>Iconify 图标</h3>
    <Icon icon="mdi:home" class="text-red-500" />
    <!-- 使用动态组件渲染图标 -->
    <component :is="Icon" :icon="iconRef" />

    <h3>Element+ 组件</h3>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>
</template>

<style scoped>
h3 {
  margin-top: 15px;
  margin-bottom: 5px;
}
</style>
