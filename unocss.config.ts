import { defineConfig, presetAttributify, presetIcons, presetWind, transformerDirectives } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: '#DB6213',
    },
  },
  shortcuts: [
    // layer
    ['flex-justify', 'flex justify-between'],
    ['flex-center', 'flex justify-center items-center'],

    // base
    ['border-base', 'border-solid border-1 border-gray-200'],
    ['bg-base', 'p-4 bg-orange-1 border-rounded-2 color-gray-4'],
  ],
  presets: [
    presetAttributify(),
    // https://icones.js.org/
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'width': '1.2em',
        'height': '1.2em',
        'vertical-align': 'middle',
      },
    }),
    presetWind(),
  ],
  transformers: [transformerDirectives()],
  safelist: [],
})
