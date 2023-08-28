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
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { viteSingleFile } from 'vite-plugin-singlefile'
import getBuild from './vite.build'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_AppUrl, VITE_APP_BASE_URL, VITE_APP_DIST } = env

  return defineConfig({
    base: VITE_APP_BASE_URL,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
        'Mock': resolve(__dirname, 'src/mock'),
        'Utils': resolve(__dirname, 'src/utils'),
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
      // https://www.npmjs.com/package/vite-copy-plugin
      vue(),
      pages(),
      unocss(),
      VITE_APP_DIST === 'SSF' && viteSingleFile(),
    ],
    build: getBuild(VITE_APP_DIST),
    server: {
      proxy: {
        '/1.1/classes': VITE_APP_AppUrl,
      },
    },
  })
}
