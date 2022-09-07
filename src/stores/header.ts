import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header-store', () => {
  const title = ref('首页')

  return {
    title,
  }
}, {
  persistedState: {
    persist: true,
    storage: sessionStorage,
  },
})
