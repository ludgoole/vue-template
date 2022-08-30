import '@unocss/reset/tailwind.css'
import 'uno.css'
import '/src/styles/main.css'
import '/src/styles/element.css'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createRouter, createWebHashHistory } from 'vue-router'
import mitt from 'mitt'
import { store } from './stores'
import App from './App.vue'
import routes from '~pages'

const head = createHead()

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const emitter = mitt()

createApp(App)
  .use(head)
  .use(router)
  .use(store)
  .provide('emitter', emitter)
  .mount('#app')
