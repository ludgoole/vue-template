import type { BuildOptions } from 'vite'

const nameREG = /([_])[.]{3}([^.]+)\1(.css)?/
const replace = (template: string, value: string) => template.replace(/\[name\]/, value.replace(nameREG, '$2'))

const getBuild = (): BuildOptions => {
  const output: BuildOptions['rollupOptions']['output'] = {
    // https://rollupjs.org/guide/en/#outputassetfilenames
    assetFileNames: (info) => {
      const template = 'assets/[name].[hash][extname]'
      if (nameREG.test(info.name)) return replace(template, info.name)
      return template
    },
    // https://rollupjs.org/guide/en/#outputchunkfilenames
    chunkFileNames: (info) => {
      const template = '[name].[hash].js'
      if (nameREG.test(info.name)) return replace(template, info.name)
      return template
    },
  }

  output.manualChunks = (id) => {
    if (id.includes('vant'))
      return 'vant-vendor'
    else if (id.includes('node_modules'))
      return 'vendor'
  }

  return {
    rollupOptions: {
      output,
    },
  }
}

export default getBuild
