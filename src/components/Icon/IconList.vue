<template>
  <ul
    class="grid border-t border-l border-gray-200 text-gray-500"
    :style="{ gridTemplateColumns: `repeat(auto-fill, minmax(${itemWidth}, 1fr))` }"
  >
    <li
      :class="[
        'border-r border-b border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-sky-100',
        itemClass,
      ]"
      v-for="icon in icons"
      :key="icon"
      @click="handleClick(icon)"
    >
      <Icon
        :icon="`${prefix}:${icon}`"
        :class="[
          iconClass,
          { [activeClass]: (modelValue && modelValue === icon) || selectedIcon === icon },
        ]"
      />
      <div class="text-center text-sm mt-3" v-if="showIconNameFlag">
        {{ capitalizeString(icon) }}
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { Icon, loadIcons } from '@iconify/vue'
// import epIcons from '@iconify/json/json/ep.json'
import epIcons from '../../assets/icon-ep.json'
import { capitalizeString } from '../../utils'
import type { IconListType } from './types'

const props = withDefaults(defineProps<IconListType>(), {
  icons: () => epIcons,
  prefix: 'ep',
  itemWidth: '130px',
  itemClass: 'py-4',
  iconClass: 'text-3xl',
  showIconNameFlag: true,
  copyIconComponentFlag: false,
  activeClass: '',
})

const selectedIcon = ref('')

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
  selectedIcon.value = icon
  modelValue.value = icon
  emit('click', `${props.prefix}:${icon}`)
}

// ============================== 默认图标 ==============================
const modelValue = defineModel('defaultIcon', {
  type: String,
  default: 'alarm-clock',
})
</script>
