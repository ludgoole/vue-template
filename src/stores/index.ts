import type { Plugin } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'

export const store: Plugin = (app) => {
  const pinia = createPinia()
  pinia.use(
    createPersistedStatePlugin({
      persist: true,
      storage: localStorage,
    }),
  )
  app.use(pinia)
}
