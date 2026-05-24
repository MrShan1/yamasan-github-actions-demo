<template>
  <el-switch
    v-model="copySvg"
    active-text="复制SVG"
    inactive-text="复制IconName"
    @change="handleCopySvgChange"
  />
  <ul class="flex flex-wrap border-t border-l border-gray-200 text-gray-500">
    <li
      class="w-1/8 border-r border-b border-gray-200 py-4 flex flex-col items-center justify-center cursor-pointer hover:bg-sky-200"
      v-for="icon in epIcons"
      :key="icon"
      @click="handleClick(icon)"
    >
      <Icon :icon="`ep:${icon}`" class="text-3xl mb-3" />
      <div class="text-center text-sm">{{ capitalizeString(icon) }}</div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { Icon, loadIcons, loadIcon } from '@iconify/vue'
// import epIcons from '@iconify/json/json/ep.json'
import epIcons from '../assets/icon-ep.json'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import type { IconifyIcon } from '@iconify/types'

// ============================== 图标加载 ==============================
// 首字母大写
// 例：add-location -> AddLocation
function capitalizeString(str: string) {
  const words = str.split('-')
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('')
}

onBeforeMount(async () => {
  await loadIcons(epIcons.map((icon) => `ep:${icon}`))
})

// ============================== 复制图标 ==============================
const copySvg = ref(true) // 是否复制SVG：true 复制SVG，false 复制IconName
const { copy, copied } = useClipboard()

async function handleClick(icon: string) {
  if (copySvg.value) {
    const res = await loadIcon(`ep:${icon}`)
    const svg = objectToSvg(res)
    copy(svg)
  } else {
    copy(capitalizeString(icon))
  }
  copied.value && ElMessage.success(copied.value ? '复制成功' : '复制失败')
}

function handleCopySvgChange(value: boolean) {
  copySvg.value = value
}

function objectToSvg(svgObject: IconifyIcon) {
  const { body, height, width, left, top, rotate } = svgObject
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" transform="translate(${left}, ${top}) rotate(${rotate})">
    ${body}
  </svg>
  `
}
</script>
