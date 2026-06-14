<template>
  <div>
    <el-table v-bind="$attrs" ref="tableRef">
      <VTableColumn v-for="column in columns" :key="column.prop" v-bind="column" />
      <slot />
      <template #append>
        <slot name="append" />
      </template>
      <template #empty>
        <slot name="empty" />
      </template>
    </el-table>
    <div v-if="pagination" :class="['p-2 flex', paginationClass]">
      <el-pagination v-bind="paginationProps" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { VTablePropsBase } from './types'
import { VTableColumn } from '@/components'
import type { TableInstance } from 'element-plus'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<VTablePropsBase>(), {
  // pagination: () => ({
  //   align: 'right',
  //   layout: 'total, sizes, prev, pager, next, jumper',
  //   total: 0,
  //   pageSizes: [10, 20, 30, 40, 50, 100],
  //   defaultPageSize: 10,
  //   defaultCurrentPage: 1,
  // }),
})

const paginationClass = computed(() => {
  if (props.pagination) {
    if (props.pagination.align === 'left') {
      return 'justify-start'
    } else if (props.pagination.align === 'center') {
      return 'justify-center'
    } else if (props.pagination.align === 'right') {
      return 'justify-end'
    }
  }
  return 'justify-end'
})

const paginationProps = computed(() => {
  const { align, ...restProps } = props.pagination || {}
  return restProps
})

const tableRef = ref<TableInstance>()

defineExpose({
  table: tableRef,
})
</script>
