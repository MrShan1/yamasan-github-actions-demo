import type {
  PaginationProps,
  TableProps,
  TableColumnCtx,
  TableSortOrder,
  ElTable,
} from 'element-plus'
import type { Component, DefineComponent } from 'vue'
import type { TableEmits } from './polyfill'

// =====================VTableColumn=========================

export interface VTableColumnPropsBase {
  defaultSlot?: Component
  headerSlot?: Component
  children?: VTableColumnPropsBase[]
}

export interface VTableColumnProps extends VTableColumnPropsBase, Partial<TableColumnCtx<any>> {
  children?: VTableColumnProps[]
}

export type VTableColumnType = DefineComponent<VTableColumnProps>

// =====================VTable=========================

export interface PaginationType extends Partial<PaginationProps> {
  align?: 'left' | 'center' | 'right'
  total: number
}

// 使用魔法注释，跳过extends TableProps，使用$attrs透传el-table属性
// export interface VTableProps extends /* @vue-ignore */ TableProps<any> {
//   pagination?: PaginationType
//   columns: VTableColumnProps[]
// }

// 表格组件的props类型窄定义，不包含el-table的属性
export interface VTablePropsBase {
  pagination?: PaginationType
  columns: VTableColumnProps[]
}

// 表格组件的props类型宽定义，包含el-table的属性
export interface VTableProps extends VTablePropsBase, Partial<TableProps<any>> {}

export type VTableEmits = Record<keyof TableEmits, any>
export type VTableType = DefineComponent<VTableProps, {}, {}, {}, {}, {}, {}, VTableEmits>
