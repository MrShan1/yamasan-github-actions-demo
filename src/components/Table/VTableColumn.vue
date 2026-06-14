<template>
  <el-table-column v-bind="$attrs">
    <template #default="scope" v-if="hasCustomCell">
      <!-- 设置了defaultSlot属性 -->
      <component v-if="defaultSlot" :is="defaultSlot" v-bind="scope" />
      <!-- 设置了default插槽 -->
      <slot v-else-if="slots.default" name="default" v-bind="scope" />
      <!-- 设置了children属性 -->
      <template v-else-if="children && children.length > 0">
        <component v-for="child in children" :key="child.prop" :is="ChildColumn" v-bind="child" />
      </template>
    </template>
    <template #header="scope">
      <component v-if="headerSlot" :is="headerSlot" v-bind="scope" />
      <slot v-else-if="slots.header" name="header" v-bind="scope" />
    </template>
  </el-table-column>
</template>

<script setup lang="ts" generic="T = any">
import type { VTableColumnPropsBase, VTableColumnType, VTableColumnSlots } from './types'
import RawColumn from './VTableColumn.vue'
import { computed, inject, getCurrentInstance } from 'vue'
import { TABLE_INJECTION_KEY } from 'element-plus/es/components/table/src/tokens'

const props = defineProps<VTableColumnPropsBase<T>>()

const slots = defineSlots<VTableColumnSlots<T>>()

const ChildColumn = RawColumn as unknown as VTableColumnType<T> // 使用RawColumn作为子列组件，避免循环导入

const hasCustomCell = computed(
  () => !!props.defaultSlot || !!slots.default || !!props.children?.length,
)

// 注入table实例，用于获取table的store，解决instance.parent链被截断问题
//
// 问题描述：树形数据时列没有对齐
// 问题原因：instance.parent链被截断，导致无法获取table的store，导致hasTreeColumn始终为false，导致普通行的第一列缺少用于对齐的占位元素
const table = inject(TABLE_INJECTION_KEY) as { store?: unknown } | undefined
const instance = getCurrentInstance() as any
if (table?.store && instance) {
  instance.store = table.store
}
</script>
