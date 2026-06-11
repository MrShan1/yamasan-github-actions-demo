import type { TableColumnCtx } from 'element-plus'

/** 与 element-plus 内部 DefaultRow 一致 */
type ElTableDefaultRow = Record<PropertyKey, unknown>

/** 与 element-plus 内部 TableSortOrder 一致 */
export type ElTableSortOrder = 'ascending' | 'descending'

/** sort-change 事件载荷（store/index.ts -> changeSortCondition） */
export interface ElTableSortChangeEvent<T extends ElTableDefaultRow = ElTableDefaultRow> {
  /** 当前排序列，清空排序时为 null */
  column: TableColumnCtx<T> | null
  /** 当前排序字段，清空排序时为 null */
  prop: string | null
  /** 当前排序方式，清空排序时为 null */
  order: ElTableSortOrder | null
}

/** scroll 事件载荷（table.vue -> el-scrollbar @scroll） */
export interface ElTableScrollEvent {
  scrollLeft: number
  scrollTop: number
}

/**
 * filter-change 事件载荷
 * key 为 column.columnKey 或 column.id
 * value 为该列当前选中的筛选项
 */
export type ElTableFilterChangeEvent = Record<string, string[]>

/**
 * ElTable 全部事件（Element Plus 2.14.x）
 * 泛型 T 建议传表格行数据类型，如 interface User { ... }
 */
export interface ElTableEmits<T extends ElTableDefaultRow = ElTableDefaultRow> {
  /** 用户勾选某行 checkbox */
  select: [selection: T[], row: T]
  /** 用户点击表头全选 checkbox */
  'select-all': [selection: T[]]
  /** 选中项发生变化 */
  'selection-change': [selection: T[]]
  /** 鼠标进入单元格 */
  'cell-mouse-enter': [
    row: T,
    column: TableColumnCtx<T>,
    cell: HTMLTableCellElement,
    event: MouseEvent,
  ]
  /** 鼠标离开单元格 */
  'cell-mouse-leave': [
    row: T,
    column: TableColumnCtx<T> | undefined,
    cell: HTMLTableCellElement | undefined,
    event: MouseEvent,
  ]
  /** 单击单元格 */
  'cell-click': [row: T, column: TableColumnCtx<T>, cell: HTMLTableCellElement, event: MouseEvent]
  /** 双击单元格 */
  'cell-dblclick': [
    row: T,
    column: TableColumnCtx<T>,
    cell: HTMLTableCellElement,
    event: MouseEvent,
  ]
  /** 右键单元格 */
  'cell-contextmenu': [
    row: T,
    column: TableColumnCtx<T>,
    cell: HTMLTableCellElement,
    event: MouseEvent,
  ]
  /** 单击行 */
  'row-click': [row: T, column: TableColumnCtx<T> | null, event: MouseEvent]
  /** 右键行 */
  'row-contextmenu': [row: T, column: TableColumnCtx<T> | null, event: MouseEvent]
  /** 双击行 */
  'row-dblclick': [row: T, column: TableColumnCtx<T> | null, event: MouseEvent]
  /** 单击表头 */
  'header-click': [column: TableColumnCtx<T>, event: MouseEvent]
  /** 右键表头 */
  'header-contextmenu': [column: TableColumnCtx<T>, event: MouseEvent]
  /** 排序条件变化 */
  'sort-change': [data: ElTableSortChangeEvent<T>]
  /** 筛选条件变化 */
  'filter-change': [filters: ElTableFilterChangeEvent]
  /** 当前行变化（需 highlight-current-row） */
  'current-change': [currentRow: T | null, oldCurrentRow: T | null]
  /** 拖拽表头改变列宽后 */
  'header-dragend': [
    newWidth: number,
    oldWidth: number,
    column: TableColumnCtx<T>,
    event: MouseEvent,
  ]
  /**
   * 展开/收起行
   * - type="expand" 时：第二参数为已展开行数组
   * - 树形表格时：第二参数为是否展开（boolean）
   */
  'expand-change': [row: T, expandedRows: T[] | boolean]
  /** 表格滚动后（2.9.0+） */
  scroll: [data: ElTableScrollEvent]
}

export interface TableEmits extends ElTableEmits {}
