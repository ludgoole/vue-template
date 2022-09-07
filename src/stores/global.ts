import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global-store', () => {
  const g_stock = ref<MOCK.STOCk>([])
  const g_account = ref<MOCK.STOCk>([])

  return {
    g_stock,
    g_account,
  }
},
{
  persistedState: {
    persist: true,
    storage: localStorage,
  },
})
