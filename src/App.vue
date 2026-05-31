<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import type { Language } from 'element-plus/es/locale'
import { useI18n } from 'vue-i18n'
import { computed, type ComputedRef } from 'vue'

const { messages, locale } = useI18n()
const epLocale = computed(() => messages.value[locale.value]) as ComputedRef<Language>
</script>

<template>
  <div>
    <ElConfigProvider :locale="epLocale">
      <RouterView />
    </ElConfigProvider>
  </div>
</template>

<style scoped></style>
