<template>
  <el-tabs class="p-4">
    <el-tab-pane label="多级表头：JSON配置法">
      <VTable :columns="columns2Nested" :data="tableData2" />
    </el-tab-pane>
    <el-tab-pane label="多级表头：模板配置法">
      <VTable :columns="[]" :data="tableData2">
        <el-table-column prop="date" label="Date" width="150" />
        <el-table-column label="Delivery Info">
          <el-table-column prop="name" label="Name" width="120" />
          <el-table-column label="Address Info">
            <el-table-column prop="state" label="State" width="120" />
            <el-table-column prop="city" label="City" width="120" />
            <el-table-column prop="address" label="Address" />
            <el-table-column prop="zip" label="Zip" width="120" />
          </el-table-column>
        </el-table-column>
      </VTable>
    </el-tab-pane>
    <el-tab-pane label="流体高度">
      <VTable
        :columns="columns2WithSlots"
        :data="tableData2"
        style="width: 100%"
        max-height="250"
      />
      <el-button class="mt-2" style="width: 100%" @click="onAddItem"> Add Item </el-button>
    </el-tab-pane>
    <el-tab-pane label="固定列和表头">
      <VTable
        :columns="columns2"
        :data="[...tableData2, ...tableData2]"
        height="200"
        className="w-1/2!"
      >
      </VTable>
    </el-tab-pane>
    <el-tab-pane label="固定列2：使用table-column插槽">
      <VTable :columns="columnsWithSlots" :data="tableData"></VTable>
    </el-tab-pane>
    <el-tab-pane label="固定列1：使用table插槽">
      <VTable :columns="columns" :data="tableData">
        <template #default>
          <el-table-column fixed="right" label="Operations" width="120">
            <template #default="{ row, column, $index }">
              <el-button link type="primary" size="small" @click="handleClick(row)"
                >Detail</el-button
              >
              <el-button link type="primary" size="small" @click="handleEdit(row)">Edit</el-button>
            </template>
          </el-table-column>
        </template>
        <template #append>
          <el-button type="primary" size="small" class="m-2">添加行</el-button>
        </template>
      </VTable>
    </el-tab-pane>
    <el-tab-pane label="固定表头">
      <VTable :columns="columns" :data="[...tableData, ...tableData]" height="200"></VTable>
    </el-tab-pane>
    <el-tab-pane label="显示溢出工具提示的表格">
      <VTable :columns="columns" :data="tableData">
        <el-table-column
          prop="address"
          label="测试溢出工具提示"
          show-overflow-tooltip
          width="200"
          className="text-red-500 font-bold"
        ></el-table-column>
      </VTable>
    </el-tab-pane>
    <el-tab-pane label="带状态表格">
      <VTable :columns="columns" :data="tableData" :row-class-name="rowClassName" />
    </el-tab-pane>
    <el-tab-pane label="带边框表格">
      <VTable :columns="columns" :data="tableData" border />
    </el-tab-pane>
    <el-tab-pane label="带斑马纹表格">
      <VTable :columns="columns" :data="tableData" stripe />
    </el-tab-pane>
    <el-tab-pane label="基础表格">
      <VTable :columns="columns" :data="tableData" :pagination="pagination" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="tsx">
import { VTable } from '@/components'
import type { VTableColumnProps } from '@/components/Table/types'
import { ref } from 'vue'
import dayjs from 'dayjs'

const pagination = ref({
  align: 'right' as const,
  layout: 'total, sizes, prev, pager, next, jumper',
  total: 100,
  pageSizes: [10, 20, 30, 40, 50, 100],
  defaultPageSize: 10,
  defaultCurrentPage: 1,
  onSizeChange: (size: number) => {
    console.log('size', size)
  },
  onCurrentChange: (current: number) => {
    console.log('current', current)
  },
})

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

const rowClassName = ({ row, rowIndex }: { row: any; rowIndex: number }) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

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
            handleEdit(row)
          }}
        >
          Edit1
        </el-button>
      </>
    ),
  },
]

// ---------- 流体高度 ----------
const now = new Date()

const columns2: VTableColumnProps[] = [
  {
    prop: 'date',
    label: 'Date',
    fixed: true,
    width: 150,
  },
  {
    prop: 'name',
    label: 'Name',
    width: 120,
  },
  {
    prop: 'state',
    label: 'State',
    width: 120,
  },
  {
    prop: 'city',
    label: 'City',
    width: 120,
  },
  {
    prop: 'address',
    label: 'Address',
    // width: 600,
    width: 1200,
  },
  {
    prop: 'zip',
    label: 'Zip',
    width: 120,
  },
]

const tableData2 = ref<any[]>([
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
])

const columns2WithSlots: VTableColumnProps[] = [
  ...columns2,
  {
    prop: '',
    label: 'Operations',
    fixed: 'right',
    width: 120,
    defaultSlot: ({ row, $index }: { row: any; $index: number }) => (
      <>
        <el-button
          link
          type="primary"
          size="small"
          onClick={(e: MouseEvent) => {
            e.preventDefault()
            deleteRow($index)
          }}
        >
          Remove
        </el-button>
      </>
    ),
  },
]

const deleteRow = (index: number) => {
  tableData2.value.splice(index, 1)
}

const onAddItem = () => {
  now.setDate(now.getDate() + 1)
  tableData2.value.push({
    date: dayjs(now).format('YYYY-MM-DD'),
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  })
}

// ---------- 多级表头：JSON配置法 ----------
const columns2Nested: VTableColumnProps[] = [
  {
    prop: 'date',
    label: 'Date',
    fixed: true,
    width: 150,
  },
  {
    prop: '',
    label: 'Delivery Info',
    children: [
      {
        prop: 'name',
        label: 'Name',
        width: 120,
      },
      {
        prop: '',
        label: 'Address Info',
        children: [
          {
            prop: 'state',
            label: 'State',
            width: 120,
          },
          {
            prop: 'city',
            label: 'City',
            width: 120,
          },
          {
            prop: 'address',
            label: 'Address',
            // width: 600,
            // width: 1200,
          },
          {
            prop: 'zip',
            label: 'Zip',
            width: 120,
          },
        ],
      },
    ],
  },
]
</script>

<style scoped lang="less">
:deep(.el-table) {
  .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
  }
  .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
  }
}
</style>
