import _VTable from './Table/VTable.vue'
import _VTableColumn from './Table/VTableColumn.vue'
import type { VTableType, VTableColumnType } from './Table/types'

const VTable = _VTable as VTableType
const VTableColumn = _VTableColumn as VTableColumnType

export { VTable, VTableColumn }
