import type { PaginationProps, TableProps, TableColumnCtx } from 'element-plus'

export type TableColumnType = TableColumnCtx<any>

export interface PaginationType extends Partial<PaginationProps> {
  align?: 'left' | 'center' | 'right'
  total: number
}

export interface VTableProps extends /* @vue-ignore */ TableProps<any> {
  pagination?: PaginationType
  columns: TableColumnType[]
}
