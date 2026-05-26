export interface NetIconProps {
  url: string
  prefix?: string
  fontFamily?: string
  type: string
}

export interface IconPickerDataType {
  icon: string
  color: string
  size: number
}

export interface IconListType {
  icons?: string[] // 图标列表
  prefix?: string // 图标前缀
  itemWidth?: string // 图标项宽度
  itemClass?: string // 图标项类名
  iconClass?: string // 图标类名
  showIconNameFlag?: boolean // 是否显示图标名称
  copyIconComponentFlag?: boolean // 是否复制图标组件
  activeClass?: string // 激活图标类名
}
