<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-2xl font-bold">Charts</h3>
    <el-button type="primary" @click="modifyScatterData" style="width: 100px"
      >修改图表数据</el-button
    >
    <Charts :option="scatterOption" width="100%" height="300px" @init="handleInit" />
  </div>
  <div class="p-4 flex flex-col gap-4">
    <h3 class="text-2xl font-bold">VueEcharts</h3>
    <VueEcharts :option="pieOption" theme="#ffb" height="300px" />
    <VueEcharts :option="barOption" theme="default" height="300px" />
    <VueEcharts
      :option="barOption"
      :charts="['BarChart']"
      :components="['TitleComponent', 'TooltipComponent', 'LegendComponent', 'GridComponent']"
      theme="default"
      height="300px"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueEcharts from '@/components/chart/VueEcharts.vue'
import Charts from '@/components/chart/Charts.vue'
import type { EChartsOption, SeriesOption, EChartsType } from 'echarts'

const barOption = ref<EChartsOption>({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
    },
  ],
})

const pieOption = ref<EChartsOption>({
  title: {
    text: 'Traffic Sources',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
  },
  series: [
    {
      universalTransition: true,
      name: 'Traffic Sources',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: 'Direct' },
        { value: 310, name: 'Email' },
        { value: 234, name: 'Ad Networks' },
        { value: 135, name: 'Video Ads' },
        { value: 1548, name: 'Search Engines' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
})

const scatterOption = ref<EChartsOption>({
  xAxis: {},
  yAxis: {},
  series: [
    {
      symbolSize: 20,
      data: [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68],
      ],
      type: 'scatter',
    },
  ],
})

function modifyScatterData() {
  const series = scatterOption.value.series as SeriesOption[]
  if (series[0]?.data) {
    const data = series[0].data as [number, number][]
    series[0].data = data.map((item) => [item[0] + 1, item[1] + 1])
  }
}

function handleInit(chartInstance: EChartsType) {
  console.log(chartInstance)
}
</script>
