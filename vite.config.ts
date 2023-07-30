// 如果编辑器提示 path 模块找不到，安装一下 @types/node
// npm i @types/node -D
import { resolve } from 'path'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import autoImport from 'unplugin-auto-import/vite'
import unocss from 'unocss/vite'
import pages from 'vite-plugin-pages'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import getBuild from './vite.build'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_PROXY_URL, VITE_APP_BASE_URL } = env

  return defineConfig({
    base: VITE_APP_BASE_URL,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
      },
    },
    plugins: [
      autoImport({
        imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
        dts: './src/auto-imports.d.ts',
      }),
      Components({
        dts: './src/components.d.ts',
        resolvers: [VantResolver()],
      }),
      viteMockServe({
        logger: false,
        mockPath: './mock/',
      }),
      visualizer({
        open: true,
      }),
      vue(),
      pages(),
      unocss(),
    ],
    build: getBuild(),
    server: {
      proxy: {
        '/1.1/classes': 'https://njr7h2zt.lc-cn-n1-shared.com/',
        'api': 'http://127.0.0.1:8090/',
        'uPay': VITE_APP_PROXY_URL,
      },
    },
  })
}
