<template>
  <ul class="flex flex-wrap border-t border-l border-gray-200 text-gray-500">
    <li
      :class="[
        'border-r border-b border-gray-200 flex flex-col items-center justify-center cursor-pointer',
        itemClass,
      ]"
      v-for="icon in icons"
      :key="icon"
      @click="handleClick(icon)"
    >
      <Icon :icon="`${prefix}:${icon}`" :class="iconClass" />
      <div class="text-center text-sm mt-3" v-if="showIconNameFlag">
        {{ capitalizeString(icon) }}
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { Icon, loadIcons } from '@iconify/vue'
// import epIcons from '@iconify/json/json/ep.json'
import epIcons from '../assets/icon-ep.json'
import { capitalizeString } from '../utils'

interface Props {
  icons?: string[] // 图标列表
  prefix?: string // 图标前缀
  itemClass?: string // 图标项类名
  iconClass?: string // 图标类名
  showIconNameFlag?: boolean // 是否显示图标名称
  copyIconComponentFlag?: boolean // 是否复制图标组件
}

const props = withDefaults(defineProps<Props>(), {
  icons: () => epIcons,
  prefix: 'ep',
  itemClass: 'w-1/8 py-4 hover:bg-sky-100',
  iconClass: 'text-3xl',
  showIconNameFlag: true,
  copyIconComponentFlag: false,
})

// ============================== 图标加载 ==============================

onBeforeMount(async () => {
  await loadIcons(props.icons.map((icon) => `${props.prefix}:${icon}`))
})

// ============================== 事件 ==============================
const emit = defineEmits<{
  (e: 'click', icon: string): void
}>()

// 点击图标
function handleClick(icon: string) {
  emit('click', icon)
}
</script>
