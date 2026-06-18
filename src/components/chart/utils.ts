import { CHARTS_MAP, COMPONENTS_MAP, FEATURES } from './const'
import type { ChartName, ComponentName, FeatureName } from './types'

type PlainObject = Record<string, unknown>
type DependencyList = string[]
type OptionLike = PlainObject & {
  options?: unknown
  baseOption?: unknown
  series?: unknown
  dataset?: unknown
}
type SeriesOptionLike = PlainObject & {
  type?: unknown
  coordinateSystem?: unknown
  labelLayout?: unknown
  universalTransition?: unknown
}
type BundleCode = {
  charts: ChartName[]
  components: ComponentName[]
  features: FeatureName[]
}

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object' && value !== null
}

function isOptionLike(value: unknown): value is OptionLike {
  return isPlainObject(value)
}

function isSeriesOptionLike(value: unknown): value is SeriesOptionLike {
  return isPlainObject(value)
}

function toOptionLike(value: unknown): OptionLike | null {
  return isOptionLike(value) ? value : null
}

function toSeriesList(value: unknown): SeriesOptionLike[] {
  const list: SeriesOptionLike[] = []
  if (Array.isArray(value)) {
    value.forEach((item) => {
      if (isSeriesOptionLike(item)) {
        list.push(item)
      }
    })
  } else if (isSeriesOptionLike(value)) {
    list.push(value)
  }
  return list
}

function collectDeps(option: unknown): DependencyList {
  const deps: DependencyList = []
  const optionObject = toOptionLike(option)
  if (!optionObject) {
    return deps
  }

  Object.keys(optionObject).forEach((key) => {
    if (COMPONENTS_MAP[key]) {
      deps.push(COMPONENTS_MAP[key])
    }
  })

  const seriesList = toSeriesList(optionObject.series)
  let hasScatterSeries = false
  seriesList.forEach((seriesOpt) => {
    const type = typeof seriesOpt.type === 'string' ? seriesOpt.type : ''
    if (type === 'scatter') {
      hasScatterSeries = true
    }
    if (CHARTS_MAP[type]) {
      deps.push(CHARTS_MAP[type])
    }

    if (seriesOpt.labelLayout) {
      deps.push('LabelLayout')
    }
    if (seriesOpt.universalTransition) {
      deps.push('UniversalTransition')
    }
  })

  Object.keys(optionObject).forEach((key) => {
    if (!key.endsWith('Axis')) {
      return
    }
    const value = optionObject[key]
    const axes = Array.isArray(value) ? value : [value]
    axes.forEach((axisOption) => {
      if (hasScatterSeries && Number(axisOption.jitter) > 0) {
        deps.push('ScatterJitter')
      }
      const breaks = axisOption.breaks
      if (Array.isArray(breaks) && breaks.length > 0) {
        deps.push('AxisBreak')
      }
    })
  })

  const dataset = optionObject.dataset
  if (Array.isArray(dataset)) {
    dataset.forEach((item) => {
      if (isPlainObject(item) && item.transform) {
        deps.push('TransformComponent')
      }
    })
  }

  return Array.from(new Set(deps))
}

// Component that was dependent.
const DEPENDENT_COMPONENTS: string[] = [
  'xAxis',
  'yAxis',
  'angleAxis',
  'radiusAxis',
  'xAxis3D',
  'yAxis3D',
  'zAxis3D',
]

function createReverseMap(map: Record<string, string>): Record<string, string> {
  const reverseMap: Record<string, string> = {}
  Object.keys(map).forEach((key) => {
    // Exclude dependencies.
    if (DEPENDENT_COMPONENTS.includes(key)) {
      return
    }
    if (map[key]) {
      reverseMap[map[key]] = key
    }
  })

  return reverseMap
}

const COMPONENTS_MAP_REVERSE = createReverseMap(COMPONENTS_MAP)
const CHARTS_MAP_REVERSE = createReverseMap(CHARTS_MAP)

function buildMinimalBundleCode(deps: string[]): BundleCode {
  const chartsImports: string[] = []
  const componentsImports: string[] = []
  const featuresImports: string[] = []

  deps.forEach((dep) => {
    if (CHARTS_MAP_REVERSE[dep]) {
      chartsImports.push(dep)
    } else if (COMPONENTS_MAP_REVERSE[dep]) {
      componentsImports.push(dep)
    } else if (dep === 'TransformComponent') {
      // TransformComponent don't have individual option type.
      // TODO will put in to an config if there are other similar components
      componentsImports.push(dep)
    } else if (FEATURES.includes(dep)) {
      featuresImports.push(dep)
    }
  })

  return {
    charts: chartsImports as unknown as ChartName[],
    components: componentsImports as unknown as ComponentName[],
    features: featuresImports as unknown as FeatureName[],
  }
}

export function getImportModules(option: unknown): BundleCode {
  const deps = collectDeps(option)
  const bundleCode = buildMinimalBundleCode(deps)
  return bundleCode
}
