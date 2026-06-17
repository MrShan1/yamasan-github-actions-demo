import type { VChartProps } from './polyfill'

export interface VueEChartsProps extends Partial<VChartProps> {
  theme?: 'dark' | 'default' | string
  style?: CSSProperties
  height?: number | string
}
