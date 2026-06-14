<template>
  <div class="p-4">
    <p class="mb-2">State: {{ row.state }}</p>
    <p class="mb-2">City: {{ row.city }}</p>
    <p class="mb-2">Address: {{ row.address }}</p>
    <p class="mb-2">Zip: {{ row.zip }}</p>
    <h3 class="text-2xl font-bold">Family</h3>
    <VTable :columns="[]" :data="row.family" :border="childBorder">
      <VTableColumn label="Name" prop="name" />
      <VTableColumn label="State" prop="state" />
      <VTableColumn label="City" prop="city" />
      <VTableColumn label="Address" prop="address" />
      <VTableColumn label="Zip" prop="zip" />
    </VTable>
  </div>
</template>

<script setup lang="ts">
import { VTable, VTableColumn } from '@/components'

withDefaults(
  defineProps<{
    row: any
    childBorder: boolean
  }>(),
  {
    row: () => ({
      state: '',
      city: '',
      address: '',
      zip: '',
      family: [],
    }),
    childBorder: false,
  },
)
</script>
