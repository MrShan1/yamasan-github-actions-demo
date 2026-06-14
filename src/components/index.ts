import _VTable from './Table/VTable.vue'
import _VTableColumn from './Table/VTableColumn.vue'
import Iconify from './Icon/Iconify.vue'
import type { VTableType, VTableColumnType } from './Table/types'

const VTable = _VTable as unknown as VTableType
const VTableColumn = _VTableColumn as unknown as VTableColumnType

export { VTable, VTableColumn, Iconify }
