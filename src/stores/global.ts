import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global-store', () => {
  const g_data = ref<MOCK.STOCk>([])

  return {
    g_data,
  }
})
