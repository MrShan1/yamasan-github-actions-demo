<template>
  <VChart class="chart" v-bind="props" :style="computedStyle" />
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { VueEChartsProps } from './types'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

const props = withDefaults(defineProps<VueEChartsProps>(), {
  autoresize: true,
  theme: 'default',
  height: '400px',
})

const computedStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.theme.startsWith('#')) {
    style.backgroundColor = props.theme
  }
  style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  return { ...style, ...props.style }
})
</script>
