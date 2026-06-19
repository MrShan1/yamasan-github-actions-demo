<template>
  <div ref="chart" :style="chartStyle" />
</template>

<script setup lang="ts">
import {
  computed,
  useAttrs,
  shallowRef,
  onMounted,
  useTemplateRef,
  onBeforeUnmount,
  watch,
} from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption, EChartsType } from 'echarts'
import type { CSSProperties } from 'vue'
import { useThrottleFn } from '@vueuse/core'

interface ChartsProps {
  option: Object
  width?: number | string
  height?: number | string
  autoresize?: boolean
}

const props = withDefaults(defineProps<ChartsProps>(), {
  autoresize: true,
})

// ----------------------初始化图表实例----------------------------
const chartRef = useTemplateRef<HTMLDivElement>('chart')
const chartInstanceRef = shallowRef<EChartsType>() // 使用shallowRef，避免属性的深层次监听导致意外错误
const emits = defineEmits<{
  init: [chartInstance: EChartsType]
}>()

onMounted(() => {
  if (chartRef.value) {
    chartInstanceRef.value = echarts.init(chartRef.value)
    chartInstanceRef.value.setOption(props.option as EChartsOption)
    emits('init', chartInstanceRef.value)
  }
})

onBeforeUnmount(() => {
  chartInstanceRef.value?.dispose()
})

// ----------------------处理style----------------------------
const attrs = useAttrs()

const chartStyle = computed(() => {
  const style: CSSProperties = (attrs.style ?? {}) as CSSProperties
  style.width = formatDimension(props.width, '100%')
  style.height = formatDimension(props.height, '400px')
  return style
})

function formatDimension(value: number | string | undefined, defaultValue: string) {
  if (typeof value === 'number') {
    return `${value}px`
  }
  return value ?? defaultValue
}

// ----------------------处理resize----------------------------
const resizeFn = useThrottleFn(resize, 50)

onMounted(() => {
  if (props.autoresize) {
    window.addEventListener('resize', resizeFn)
  }
})

onBeforeUnmount(() => {
  if (props.autoresize) {
    window.removeEventListener('resize', resizeFn)
  }
})

watch(
  () => props.option,
  (newOption: Object) => {
    chartInstanceRef.value?.setOption(newOption as EChartsOption)
  },
  { deep: true },
)

function resize() {
  chartInstanceRef.value?.resize()
}
</script>
