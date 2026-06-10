<template>
  <el-table-column v-bind="$attrs">
    <template #default="scope">
      <component :is="defaultSlot" v-bind="scope" v-if="defaultSlot" />
      <template v-if="children && children.length > 0">
        <VTableColumn v-for="(child, index) in children" :key="index" v-bind="child" />
      </template>
    </template>
    <template #header="scope" v-if="headerSlot">
      <component :is="headerSlot" v-bind="scope" />
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import type { VTableColumnPropsBase } from './types'

const props = defineProps<VTableColumnPropsBase>()
</script>
