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
import Markdown from 'vite-plugin-vue-markdown'
import vitePrerender from 'vite-plugin-prerender'
import CopyPlugin from 'vite-copy-plugin'
import viteMock from 'vite-plugin-easy-mock'
import getBuild from './vite.build'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_BASE_URL, VITE_APP_DIST } = env

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
        resolvers: [ElementPlusResolver()],
      }),
      // https://www.npmjs.com/package/vite-copy-plugin
      CopyPlugin([
        // mock里面的文件 =>dist/mock文件夹
        { from: 'mock', to: 'dist/mock' },
      ]),
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      pages(),
      unocss(),
      VITE_APP_DIST === 'SSF' && viteSingleFile(),
      VITE_APP_DIST === 'SSG' && vitePrerender({
        staticDir: resolve(__dirname, 'dist'),
        routes: ['/', '/gua'],
      }),
      viteMock(),
      Markdown(),
    ],
    build: getBuild(VITE_APP_DIST),
    server: {
      proxy: {
        '/1.1/classes': 'https://njr7h2zt.lc-cn-n1-shared.com',
      },
    },
  })
}
