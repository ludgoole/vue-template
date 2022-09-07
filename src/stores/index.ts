import type { Plugin } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import localforage from 'localforage'

export const store: Plugin = (app) => {
  const pinia = createPinia()
  pinia.use(
    createPersistedStatePlugin({
      persist: false,
      storage: {
        getItem: async (key) => {
          return await localforage.getItem(key)
        },
        setItem: async (key, value) => {
          return await localforage.setItem(key, value)
        },
        removeItem: async (key) => {
          return await localforage.removeItem(key)
        },
      },
    }),
  )
  app.use(pinia)
}
