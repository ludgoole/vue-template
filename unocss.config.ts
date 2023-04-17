import { defineConfig, presetAttributify, presetIcons, presetWind, transformerDirectives, transformerVariantGroup } from 'unocss'
import { parseColor } from '@unocss/preset-mini/utils'

const buttonUnsupportedColors = ['vue', 'black', 'dark', 'white', 'light']
function resolveColor(name: string, no: number, prefix?: string) {
  const temp = [prefix, name]

  if (!buttonUnsupportedColors.includes(name))
    temp.push(String(no))

  return temp.filter(Boolean).join('-')
}

export default defineConfig({
  theme: {
    colors: {
      vue: '#42b983',
    },
  },
  shortcuts: [
    // layer
    ['flex-justify', 'flex justify-between'],
    ['flex-center', 'flex justify-center items-center'],

    // base
    ['border-base', 'border-solid border-1 border-gray-200'],
    ['bg-base', 'p-4 bg-orange-1 border-rounded-2 color-gray-4'],
    ['ellipsis', 'text-ellipsis overflow-hidden whitespace-nowrap'],

    // button
    ['btn', 'px-4 py-1 rounded transition duration-100 cursor-pointer select-none outline-none disabled:cursor-default disabled:pointer-events-none'],
    ['btn-group', 'flex flex-wrap justify-center items-center'],
    ['btn-iconify', '!p-0 btn-true-gray-50'],
    ['btn-base', 'btn-teal'],
    [
      /^btn-(.+)$/, ([match, c], { theme }) => {
        const { color, no, opacity } = parseColor(c, theme)!
        const themeColor = match.replace(/^btn-(.+)$/, '$1').replace(/([-:/]\d+)+$/, '')
        const themeColorRank = no === 'DEFAULT' ? 400 : Number(no)

        if (!color || color === c) return // invalid color
        if (buttonUnsupportedColors.includes(themeColor)) return // unsupported

        const colorRank = themeColorRank >= 700
          ? { background: 700, hover: 800, active: 900, text: 200 }
          : themeColorRank <= 200
            ? { background: 400, hover: 500, active: 600, text: 100 }
            : { background: 600, hover: 700, active: 800, text: 50 }

        const applies = ['disabled:opacity-50']
        applies.push(resolveColor(themeColor, colorRank.text, 'text'))
        applies.push(resolveColor(themeColor, colorRank.background, 'bg'))
        applies.push(resolveColor(themeColor, colorRank.hover, 'hover:bg'))
        applies.push(resolveColor(themeColor, colorRank.active, 'active:bg'))

        if (opacity) {
          applies.push(`text-opacity-${opacity}`)
          applies.push(`bg-opacity-${opacity}`)
        }

        return applies.join(' ')
      },
    ],
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
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: [],
})
