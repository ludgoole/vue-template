import '@unocss/reset/tailwind.css'
import 'uno.css'
import '/src/styles/main.css'
import '/src/styles/vant.less'
import '/src/styles/vant.component'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import mitt from 'mitt'
import { store } from './stores'
import { router } from './router'
import App from './App.vue'

const head = createHead()

const emitter = mitt()

createApp(App)
  .use(head)
  .use(router)
  .use(store)
  .provide('emitter', emitter)
  .mount('#app')

// const vConsole = new VConsole()
