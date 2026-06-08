<template>
  <div>
    <el-table v-bind="$attrs" style="width: 100%">
      <el-table-column v-for="column in columns" :key="column.prop" v-bind="column" />
    </el-table>
    <div :class="['p-2 flex', paginationClass]">
      <el-pagination v-bind="paginationProps" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { VTableProps } from './types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<VTableProps>(), {
  pagination: () => ({
    align: 'right',
    layout: 'total, sizes, prev, pager, next, jumper',
    total: 0,
    pageSizes: [10, 20, 30, 40, 50, 100],
    defaultPageSize: 10,
    defaultCurrentPage: 1,
  }),
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
  const { align, ...restProps } = props.pagination
  return restProps
})
</script>
