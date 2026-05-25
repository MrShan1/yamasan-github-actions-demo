<template>
  <div class="mb-2 w-full p-4 flex items-center justify-end">
    <div class="mr-4">
      <el-switch v-model="copySvgFlag" active-text="复制SVG" inactive-text="复制IconName" />
    </div>
    <div class="mr-4">
      <el-switch
        v-model="showIconNameFlag"
        active-text="显示图标名称"
        inactive-text="隐藏图标名称"
      />
    </div>
    <div class="mr-4">
      <el-checkbox v-model="copyIconComponentFlag" label="复制图标组件" size="large" />
    </div>
  </div>

  <IconList
    :showIconNameFlag="showIconNameFlag"
    :copyIconComponentFlag="copyIconComponentFlag"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { loadIcon } from '@iconify/vue'
// import epIcons from '@iconify/json/json/ep.json'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import type { IconifyIcon } from '@iconify/types'
import { capitalizeString } from '../utils'

// ============================== 复制图标 ==============================
const copySvgFlag = ref(true) // 是否复制SVG：true 复制SVG，false 复制IconName
const copiedSource = ref('') // 复制来源
const { copy, copied } = useClipboard({ source: copiedSource })

async function handleClick(icon: string) {
  if (copyIconComponentFlag.value) {
    copiedSource.value = `<div class="i-${icon}"></div>`
  } else if (copySvgFlag.value) {
    const res = await loadIcon(icon)
    const svg = objectToSvg(res)
    copiedSource.value = svg
  } else {
    const iconName = icon.split(':')[1]
    copiedSource.value = capitalizeString(iconName ?? '')
  }

  await copy()
  copied.value && ElMessage.success(copied.value ? '复制成功' : '复制失败')
}

function objectToSvg(svgObject: IconifyIcon) {
  const { body, height, width, left, top, rotate } = svgObject
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" transform="translate(${left}, ${top}) rotate(${rotate})">
    ${body}
  </svg>
  `
}

// ============================== 显示图标名称 ==============================
const showIconNameFlag = ref(true)

// ============================== 复制图标组件 ==============================
const copyIconComponentFlag = ref(false)
</script>
