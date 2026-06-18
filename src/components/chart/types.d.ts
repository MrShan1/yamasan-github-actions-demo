import type { VChartProps } from './polyfill'
import type * as Charts from 'echarts/charts'
import type * as Components from 'echarts/components'
import type * as Features from 'echarts/features'

export type ChartName = keyof typeof Charts
export type ComponentName = keyof typeof Components
export type FeatureName = keyof typeof Features

export interface VueEChartsProps extends Partial<VChartProps> {
  theme?: 'dark' | 'default' | string
  style?: CSSProperties
  height?: number | string
  charts?: ChartName[]
  components?: ComponentName[]
}
