import { init } from 'echarts/core'

import type { SetOptionOpts, ECElementEvent, ElementEvent } from 'echarts/core'
import type { MaybeRefOrGetter } from 'vue'

export type Injection<T> = MaybeRefOrGetter<T | null>

type InitType = typeof init
export type InitParameters = Parameters<InitType>
export type Theme = NonNullable<InitParameters[1]>
export type ThemeInjection = Injection<Theme>
export type InitOptions = NonNullable<InitParameters[2]>
export type InitOptionsInjection = Injection<InitOptions>
export type UpdateOptions = SetOptionOpts
export type UpdateOptionsInjection = Injection<UpdateOptions>

export type EChartsType = ReturnType<InitType>

export type SetOptionType = EChartsType['setOption']
export type Option = Parameters<SetOptionType>[0]

export type AutoResize =
  | boolean
  | {
      throttle?: number
      onResize?: () => void
    }

export type LoadingOptions = {
  text?: string
  textColor?: string
  fontSize?: number | string
  fontWeight?: number | string
  fontStyle?: string
  fontFamily?: string
  maskColor?: string
  showSpinner?: boolean
  color?: string
  spinnerRadius?: number
  lineWidth?: number
  zlevel?: number
}

export interface VChartProps {
  option: Option
  theme: {
    type: Theme
  }
  initOptions: InitOptions
  updateOptions: UpdateOptions
  group: string
  manualUpdate: boolean
  autoresize: AutoResize
  loading: boolean
  loadingOptions: LoadingOptions
}
