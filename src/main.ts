import '@unocss/reset/tailwind.css'
import 'uno.css'
import '/src/styles/main.css'
import '/src/styles/vant.css'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createRouter, createWebHashHistory } from 'vue-router'
import VConsole from 'vconsole'
import mitt from 'mitt'
import App from './App.vue'
import routes from '~pages'

const head = createHead()

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const emitter = mitt()

createApp(App).use(head).use(router).provide('emitter', emitter).mount('#app')

const vConsole = new VConsole()
