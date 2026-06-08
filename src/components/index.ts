import type { DefineComponent } from 'vue'
import _VTable from './Table/VTable.vue'
import type { VTableProps } from './Table/types'

const VTable = _VTable as DefineComponent<VTableProps>

export { VTable }
