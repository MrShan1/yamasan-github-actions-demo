<template>
  <el-table-column v-bind="$attrs">
    <template #default="scope">
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

defineProps<VTableColumnPropsBase<T>>()

const slots = defineSlots<VTableColumnSlots<T>>()

const ChildColumn = RawColumn as unknown as VTableColumnType<T> // 使用RawColumn作为子列组件，避免循环导入
</script>
