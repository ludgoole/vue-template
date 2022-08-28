// 如果编辑器提示 path 模块找不到，安装一下 @types/node
// npm i @types/node -D
import { resolve } from 'path'
import { defineConfig } from 'vite'
import autoImport from 'unplugin-auto-import/vite'
import unocss from 'unocss/vite'
import pages from 'vite-plugin-pages'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { viteSingleFile } from 'vite-plugin-singlefile'
import build from './vite.build'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
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
    vue(),
    pages(),
    unocss(),
    viteSingleFile(),
  ],
  build,
})
