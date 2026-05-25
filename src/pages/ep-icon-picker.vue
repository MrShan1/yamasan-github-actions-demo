<template>
  <div class="p-4">
    <IconPicker @confirm="handleConfirm" width="50%" />
  </div>
</template>

<script setup lang="ts">
import type { IconPickerDataType } from '../components/types'

const handleConfirm = (data: IconPickerDataType) => {
  console.log(data)
}
</script>
