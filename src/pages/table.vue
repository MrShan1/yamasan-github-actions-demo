<template>
  <div class="p-4">
    <p>固定列2：使用table-column插槽</p>
    <VTable :columns="columnsWithSlots" :data="tableData"></VTable>
    <p>固定列1：使用table插槽</p>
    <VTable :columns="columns" :data="tableData">
      <template #default>
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default="{ row, column, $index }">
            <el-button link type="primary" size="small" @click="handleClick(row)">Detail</el-button>
            <el-button link type="primary" size="small" @click="handleEdit(row)">Edit</el-button>
          </template>
        </el-table-column>
      </template>
      <template #append>
        <el-button type="primary" size="small" class="m-2">添加行</el-button>
      </template>
    </VTable>
    <p>固定表头</p>
    <VTable :columns="columns" :data="[...tableData, ...tableData]" height="200"></VTable>
    <p>显示溢出工具提示的表格</p>
    <VTable :columns="columns" :data="tableData">
      <el-table-column
        prop="address"
        label="测试溢出工具提示"
        show-overflow-tooltip
        width="200"
        className="text-red-500 font-bold"
      ></el-table-column>
    </VTable>
    <p>带状态表格</p>
    <VTable :columns="columns" :data="tableData" :row-class-name="rowClassName" />
    <p>带边框表格</p>
    <VTable :columns="columns" :data="tableData" border />
    <p>带斑马纹表格</p>
    <VTable :columns="columns" :data="tableData" stripe />
    <p>基础表格</p>
    <VTable :columns="columns" :data="tableData" />
  </div>
</template>

<script setup lang="tsx">
import { VTable } from '@/components'
import type { TableColumnType } from '@/components/Table/types'

const columns = [
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
] as TableColumnType[]

const tableData = [
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

const columnsWithSlots = [
  ...columns,
  {
    prop: '',
    label: 'Operations',
    fixed: 'right',
    width: 120,
    defaultSlot: ({ row }: { row: any }) => (
      <>
        <el-button link type="primary" size="small" onClick={() => handleClick(row)}>
          Detail
        </el-button>
        <el-button link type="primary" size="small" onClick={() => handleEdit(row)}>
          Edit
        </el-button>
      </>
    ),
  },
] as TableColumnType[]
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
