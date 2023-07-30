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
    [/^(color|text)-base$/, () => 'text-gray-700 dark:text-light-700'],

    // button
    ['btn', 'px-4 py-1 rounded transition duration-100 cursor-pointer select-none outline-none disabled:cursor-default disabled:pointer-events-none'],
    ['btn-group', 'flex flex-wrap justify-center items-center'],
    ['btn-iconify', '!p-0 btn-true-gray-50'],
    ['btn-base', 'btn-teal'],
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
