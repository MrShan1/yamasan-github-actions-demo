<template>
  <VChart class="chart" v-bind="props" :style="computedStyle" />
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import * as Charts from 'echarts/charts'
import * as Components from 'echarts/components'
import * as Features from 'echarts/features'
import VChart from 'vue-echarts'
import { computed, onBeforeMount } from 'vue'
import type { CSSProperties } from 'vue'
import type { VueEChartsProps, ChartName, ComponentName } from './types'
import { getImportModules } from './utils'

const props = withDefaults(defineProps<VueEChartsProps>(), {
  autoresize: true,
  theme: 'default',
  height: '400px',
  // charts: () => ['PieChart'] as ChartName[],
  // components: () => ['TitleComponent', 'TooltipComponent', 'LegendComponent'] as ComponentName[],
})

const computedStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.theme.startsWith('#')) {
    style.backgroundColor = props.theme
  }
  style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  return { ...style, ...props.style }
})

// 在组件挂载前，根据option自动导入需要的模块
onBeforeMount(() => {
  let { charts, components, features } = getImportModules(props.option)
  // console.log(charts, components, features)

  if (props.charts && props.charts.length > 0) {
    charts = props.charts
  }
  if (props.components && props.components.length > 0) {
    components = props.components
  }

  use([
    CanvasRenderer,
    ...charts.map((name) => Charts[name]),
    ...components.map((name) => Components[name]),
    ...features.map((name) => Features[name]),
  ])
})
</script>
