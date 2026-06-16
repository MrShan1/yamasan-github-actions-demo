import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const roles = ref<string[]>(['user'])
  return { roles }
})
