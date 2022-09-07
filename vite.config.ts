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
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteSingleFile } from 'vite-plugin-singlefile'
import CopyPlugin from 'vite-copy-plugin'
import viteMock from 'vite-plugin-easy-mock'
import build from './vite.build'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => defineConfig({
  base: loadEnv(mode, process.cwd()).VITE_APP_BASE_URL,
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
      resolvers: [ElementPlusResolver()],
    }),
    // https://www.npmjs.com/package/vite-copy-plugin
    CopyPlugin([
      // mock里面的文件 =>dist/mock文件夹
      { from: 'mock', to: 'dist/mock' },
      { from: 'server.js', to: 'dist/app.js' },
    ]),
    vue(),
    pages(),
    unocss(),
    viteSingleFile(),
    viteMock(),
  ],
  build,
})
