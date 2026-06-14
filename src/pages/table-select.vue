<template>
  <el-tabs class="p-4">
    <el-tab-pane label="展开行">
      切换父级边框: <el-switch v-model="parentBorder" /> 切换子级边框:
      <el-switch v-model="childBorder" /> 保留展开状态: <el-switch v-model="preserveExpanded" />
      <VTable
        :columns="[]"
        :data="expandTableData"
        :border="parentBorder"
        :preserve-expanded-content="preserveExpanded"
        style="width: 100%"
      >
        <VTableColumn type="expand">
          <template #default="props">
            <TableColumnDetail :row="props.row" :childBorder="childBorder" />
          </template>
        </VTableColumn>
        <VTableColumn label="Date" prop="date" />
        <VTableColumn label="Name" prop="name" />
      </VTable>
    </el-tab-pane>
    <el-tab-pane label="自定义表头">
      <VTable :columns="customHeaderColumns" :data="filteredTableDataBySearch" />
    </el-tab-pane>
    <el-tab-pane label="自定义列模板">
      <VTable :columns="customColumns" :data="tableData">
        <VTableColumn label="Operations">
          <template #default="scope">
            <el-button size="small" @click="console.log('Edit', scope.$index, scope.row)">
              Edit
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="console.log('Delete', scope.$index, scope.row)"
            >
              Delete
            </el-button>
          </template>
        </VTableColumn>
      </VTable>
    </el-tab-pane>
    <el-tab-pane label="筛选">
      <VTable
        :columns="filterableColumns"
        :data="filterTableData"
        row-key="date"
        ref="filterTableRef"
      />
      <div class="mt-2">
        <el-button @click="resetDateFilter">重置日期筛选</el-button>
        <el-button @click="clearFilter">重置所有筛选</el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="排序">
      <VTable
        :columns="sortableColumns"
        :data="tableData"
        :default-sort="{ prop: 'date', order: 'descending' }"
      />
    </el-tab-pane>
    <el-tab-pane label="多选">
      <VTable
        ref="multipleTableRef"
        :columns="selectableColumns"
        :data="tableDataWithID"
        row-key="id"
        @selection-change="handleSelectionChange"
      >
      </VTable>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableDataWithID[1]!, tableDataWithID[2]!])">
          切换第二和第三行的选中状态（忽略可选择性）
        </el-button>
        <el-button @click="toggleSelection([tableDataWithID[1]!, tableDataWithID[2]!], false)">
          切换第二和第三行的选中状态（根据可选择性）
        </el-button>
        <el-button @click="toggleSelection()">清空选中</el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="单选">
      <VTable
        :columns="columnsWithSlots"
        :data="tableData"
        ref="singleTableRef"
        highlight-current-row
        @current-change="handleCurrentChange"
      />
      <div class="mt-2">
        <el-button @click="setCurrent(tableData[1])">Select second row</el-button>
        <el-button @click="setCurrent()">Clear selection</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="tsx">
import { VTable, VTableColumn, Iconify } from '@/components'
import type { VTableColumnProps } from '@/components/Table/types'
import { ref, h, computed } from 'vue'
import type { VTableInstance } from '@/components/Table/types'
import TablePopover from './table-popover.vue'
import TableColumnDetail from './table-column-detail.vue'

const columns: VTableColumnProps[] = [
  {
    prop: 'date',
    label: 'Date',
  },
  {
    prop: 'name',
    label: 'Name',
  },
  {
    prop: 'address',
    label: 'Address',
    // width: 200,
  },
]

const tableData: any[] = [
  {
    date: '2016-05-03',
    name: 'Tom1',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom2',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom3',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom4',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const handleClick = (row: any) => {
  console.log(`Detail info of ${row.name}`)
}

const handleEdit = (row: any) => {
  console.log(`Edit info of ${row.name}`)
}

const columnsWithSlots: VTableColumnProps[] = [
  ...columns,
  {
    prop: '',
    label: 'Operations',
    fixed: 'right',
    width: 120,
    defaultSlot: ({ row }: { row: any }) => (
      <>
        <el-button
          link
          type="primary"
          size="small"
          onClick={(e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            handleClick(row)
          }}
        >
          Detail
        </el-button>
        <el-button
          link
          type="primary"
          size="small"
          onClick={(e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            handleEdit(row)
          }}
        >
          Edit1
        </el-button>
      </>
    ),
  },
]

// ---------- 单选 ----------
const singleTableRef = ref<VTableInstance>()

const currentRow = ref<any>(null)
const handleCurrentChange = (row: any) => {
  currentRow.value = row
}

const setCurrent = (row?: any) => {
  singleTableRef.value?.table?.setCurrentRow(row)
}

// ---------- 多选 ----------
interface User {
  id: number
  date: string
  name: string
  address: string
}

const multipleTableRef = ref<VTableInstance>()
const multipleSelection = ref<User[]>([])
const selectable = (row: User) => ![1, 2].includes(row.id) // 第1和第2行不可选择

const selectableColumns: VTableColumnProps[] = [
  {
    type: 'selection',
    width: 55,
    selectable: selectable,
  },
  {
    // prop: 'date',
    label: 'Date',
    width: 120,
    defaultSlot: ({ row }: { row: User }) => (
      <>
        <span>{row.date}</span>
      </>
    ),
  },
  {
    prop: 'name',
    label: 'Name',
    width: 120,
  },
  {
    prop: 'address',
    label: 'Address',
  },
]

const tableDataWithID: User[] = [
  {
    id: 1,
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 5,
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 6,
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 7,
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

// ignoreSelectable: 是否忽略可选择性
const toggleSelection = (rows?: User[], ignoreSelectable?: boolean) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value!.table?.toggleRowSelection(row, undefined, ignoreSelectable)
    })
  } else {
    multipleTableRef.value!.table?.clearSelection()
  }
}

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

// ---------- 排序 ----------
const sortableColumns: VTableColumnProps[] = [
  {
    prop: 'date',
    label: 'Date',
    width: 180,
    sortable: true,
  },
  {
    prop: 'name',
    label: 'Name',
    width: 180,
    sortable: true,
  },
  {
    prop: 'address',
    label: 'Address',
    formatter: (row: any) => {
      return row.address
    },
  },
]

// ---------- 筛选 ----------
interface FilterUser {
  date: string
  name: string
  address: string
  tag: string
}

const filterTableRef = ref<VTableInstance>()

const filterTableData: FilterUser[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
]

const filterableColumns: VTableColumnProps<FilterUser>[] = [
  {
    prop: 'date',
    label: 'Date',
    width: 180,
    sortable: true,
    columnKey: 'date',
    filters: [
      { text: '2016-05-01', value: '2016-05-01' },
      { text: '2016-05-02', value: '2016-05-02' },
      { text: '2016-05-03', value: '2016-05-03' },
      { text: '2016-05-04', value: '2016-05-04' },
    ],
    filterMethod: (value: string, row: FilterUser, column: VTableColumnProps<FilterUser>) => {
      const property = column['property'] as unknown as keyof FilterUser
      if (property) {
        return row[property] === value
      }
      return true
    },
  },
  {
    prop: 'name',
    label: 'Name',
    width: 180,
  },
  {
    prop: 'address',
    label: 'Address',
    formatter: (row: FilterUser) => {
      return row.address
    },
  },
  {
    prop: 'tag',
    label: 'Tag',
    width: 100,
    filters: [
      { text: 'Home', value: 'Home' },
      { text: 'Office', value: 'Office' },
    ],
    filterMethod: (value: string, row: FilterUser) => {
      return row.tag === value
    },
    filterPlacement: 'bottom-end', // 过滤弹出框的定位在右下角
    defaultSlot: ({ row }: { row: FilterUser }) => (
      <>
        <el-tag type={row.tag === 'Home' ? 'primary' : 'success'} disable-transitions>
          {row.tag}
        </el-tag>
      </>
    ),
  },
]

const resetDateFilter = () => {
  filterTableRef.value!.table?.clearFilter(['date'])
}

const clearFilter = () => {
  filterTableRef.value!.table?.clearFilter()
}

// ---------- 自定义列模板 ----------
const customColumns: VTableColumnProps[] = [
  {
    prop: '',
    label: 'Date',
    width: 180,
    defaultSlot: ({ row }: { row: any }) => (
      <div style="display: flex; align-items: center">
        <Iconify icon="ep:timer" />
        <span style="margin-left: 10px">{row.date}</span>
      </div>
    ),
  },
  {
    prop: '',
    label: 'Name',
    width: 180,
    defaultSlot: ({ row }: { row: any }) =>
      h(TablePopover, { name: row.name, address: row.address }),
  },
  // {
  //   prop: '',
  //   label: 'Operations',
  //   defaultSlot: ({ row, $index }: { row: any; $index: number }) => (
  //     <>
  //       <el-button
  //         size="small"
  //         onClick={() => {
  //           console.log('Edit', $index, row)
  //         }}
  //       >
  //         Edit
  //       </el-button>
  //       <el-button
  //         size="small"
  //         type="danger"
  //         onClick={() => {
  //           console.log('Delete', $index, row)
  //         }}
  //       >
  //         Delete
  //       </el-button>
  //     </>
  //   ),
  // },
]

// ---------- 自定义表头 ----------
const search = ref('')
const filteredTableDataBySearch = computed(() =>
  tableData.filter(
    (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase()),
  ),
)

const customHeaderColumns: VTableColumnProps[] = [
  {
    prop: 'date',
    label: 'Date',
  },
  {
    prop: 'name',
    label: 'Name',
  },
  {
    prop: '',
    align: 'right',
    headerSlot: ({ column }: { column: VTableColumnProps }) => (
      <el-input
        modelValue={search.value}
        onUpdate:modelValue={(value: string) => (search.value = value)}
        size="small"
        placeholder="Type to search by name"
      />
    ),
    defaultSlot: ({ row, $index }: { row: any; $index: number }) => (
      <>
        <el-button
          size="small"
          onclick={() => {
            console.log('Edit', $index, row)
          }}
        >
          Edit
        </el-button>
        <el-button
          size="small"
          type="danger"
          onclick={() => {
            console.log('Delete', $index, row)
          }}
        >
          Delete
        </el-button>
      </>
    ),
  },
]

// ---------- 展开行 ----------
const parentBorder = ref(false)
const childBorder = ref(false)
const preserveExpanded = ref(false)

const expandTableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
]
</script>
