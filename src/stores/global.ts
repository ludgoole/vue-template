import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global-store', () => {
  const g_stock = ref<MOCK.STOCk>([])
  const g_account = ref<MOCK.STOCk>([])

  return {
    g_stock,
    g_account,
  }
})
