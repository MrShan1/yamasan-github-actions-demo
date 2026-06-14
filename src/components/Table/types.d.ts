import type {
  PaginationProps,
  TableProps,
  TableColumnCtx,
  TableSortOrder,
  ElTable,
  TableInstance,
} from 'element-plus'
import type { Component, DefineComponent, VNode } from 'vue'
import type { TableEmits } from './polyfill'
import type { ComponentEmit, ComponentExposed } from 'vue-component-type-helpers'
import VTable from './VTable.vue'

// =====================VTableColumn=========================
export type ColumnSlotScope<T = any> = {
  row: T
  column: TableColumnCtx<T>
  $index: number
}

export interface VTableColumnSlots<T = any> {
  default?: (scope: ColumnSlotScope<T>) => any
  header?: (scope: ColumnSlotScope<T>) => any
}

export interface VTableColumnPropsBase<T = any> {
  // defaultSlot?: Component
  // headerSlot?: Component
  defaultSlot?: (scope: ColumnSlotScope<T>) => VNode | VNode[]
  headerSlot?: (scope: ColumnSlotScope<T>) => VNode | VNode[]
  children?: VTableColumnProps<T>[]
}

export interface VTableColumnProps<T = any>
  extends VTableColumnPropsBase<T>, Partial<TableColumnCtx<T>> {
  children?: VTableColumnProps<T>[]
}

export type VTableColumnType<T = any> = DefineComponent<VTableColumnProps<T>>

// =====================VTable=========================

export interface PaginationType extends Partial<PaginationProps> {
  align?: 'left' | 'center' | 'right'
  total: number
}

// 使用魔法注释，跳过extends TableProps，使用$attrs透传el-table属性
// export interface VTableProps extends /* @vue-ignore */ TableProps<any> {
//   pagination?: PaginationType
//   columns: VTableColumnProps<any>[]
// }

// 表格组件的props类型窄定义，不包含el-table的属性
export interface VTablePropsBase {
  pagination?: PaginationType
  columns: VTableColumnProps<any>[]
}

// 表格组件的props类型宽定义，包含el-table的属性
export interface VTableProps extends VTablePropsBase, Partial<TableProps<any>> {}

type emits = ComponentEmit<typeof ElTable>
type eventNames = Parameters<emits>[0]
// type eventValues = Parameters<emits> extends [any, ...infer Rest] ? Rest : never

// 设置组件的对外事件类型VTableEmits
export type VTableEmits = Record<eventNames, any[]>
// export type VTableEmits = Record<keyof TableEmits, any>

// 设置组件的对外类型VTableType， props + emits
export type VTableType = DefineComponent<VTableProps, {}, {}, {}, {}, {}, {}, VTableEmits>

// 设置组件实例的对外类型
export type VTableInstance = ComponentExposed<typeof VTable>
