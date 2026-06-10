import type { DefineComponent } from 'vue'
import _VTable from './Table/VTable.vue'
import _VTableColumn from './Table/VTableColumn.vue'
import type { VTableProps } from './Table/types'
import type { VTableColumnProps } from './Table/types'

const VTable = _VTable as DefineComponent<VTableProps>
const VTableColumn = _VTableColumn as DefineComponent<VTableColumnProps>
export { VTable, VTableColumn }
