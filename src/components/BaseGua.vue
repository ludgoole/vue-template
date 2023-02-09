<script lang="ts" setup>
import BAGUA from '../../mock/bagua'
import ZHOUYI from '../../mock/zhouyi'
import DIZHI from '../../mock/dizhi'
import WUXING from '../../mock/wuxing'
import TIANGAN from '../../mock/tiangan'
import LIUYAO from '../../mock/liuyao'
interface Props {
  size?: number
  日干?: MOCK.TIANGAN
  日支?: MOCK.DIZHI
  用神?: string
  主象?: number[]
  卦象: number[]
}
const props = withDefaults(defineProps<Props>(), {
  size: 200,
  日干: '甲',
  日支: '子',
  // 主象: () => [7, 7, 7, 9, 7, 7],
  卦象: () => [7, 7, 7, 6, 7, 7],
})
const emit = defineEmits(['onChange'])
const 主象 = computed(() => props.主象 ?? props.卦象)
const 主卦 = computed(() => !props.主象)
console.log('🚀 ~ file: BaseGua.vue:27 ~ 主象', 主象, 主卦)

function getDizhi(卦象: number[]) {
  const getGua = (卦象: number[]) => BAGUA.find((v) => v.卦象.toString() === 卦象.toString())
  const 上卦 = getGua(卦象.slice(3))?.地支.slice(3) || []
  const 下卦 = getGua(卦象.slice(0, 3))?.地支.slice(0, 3) || []
  return [...下卦, ...上卦]
}

function getWuxing(地支: MOCK.DIZHI[]) {
  return 地支.map((v) => DIZHI[v].五行)
}

function getSelf(卦象: number[]) {
  const 卦名 = (ZHOUYI.find((卦) => 卦.卦象.toString() === 卦象.toString()) || {}).卦名 || ''
  const 八卦 = BAGUA.find((八卦) => 八卦.八宫.includes(卦名))

  return 八卦?.五行 || ''
}

function getCHGY(卦象: number[]) {
  const 卦 = ZHOUYI.find((卦) => 卦.卦象.toString() === 卦象.toString())
  if (!卦) return ''

  const liuyao = LIUYAO[卦.卦序 - 1]
  const 冲合 = liuyao.chongHe || ''
  const 归游 = liuyao.baGongOrder % 10 > 7 ? liuyao.baGong.slice(-2) : ''
  return 冲合 || 归游
}

function getLiuqin(自己: MOCK.WUXING, 五行: MOCK.WUXING[]) {
  return 五行.map((v) => WUXING[自己][v])
}

function getLiushen(日干: MOCK.TIANGAN) {
  return TIANGAN[日干]?.六神
}

function getShiyin(卦象: number[]) {
  const trans = (世爻: number) => {
    switch (世爻) {
      case 0:
        return 6
      case 6:
        return 4
      case 7:
        return 3
      default:
        return 世爻
    }
  }
  const 卦名 = (ZHOUYI.find((卦) => 卦.卦象.toString() === 卦象.toString()) || {}).卦名 || ''
  const 八卦 = BAGUA.find((八卦) => 八卦.八宫.includes(卦名))
  const 世爻 = trans(八卦?.八宫.indexOf(卦名) ?? 6)
  const 应爻 = 世爻 > 3 ? 世爻 - 3 : 世爻 + 3

  return {
    [世爻]: '世',
    [应爻]: '应',
  }
}

function getNajia(卦象: number[], 自己: MOCK.WUXING) {
  const 地支 = getDizhi(卦象) as MOCK.DIZHI[]
  const 五行 = getWuxing(地支) as MOCK.WUXING[]
  const 六亲 = getLiuqin(自己, 五行)

  return 六亲.map((v, i) => `${v}${地支[i]}${五行[i]}`)
}

const _主象 = 主象.value.map((v) => v % 2)
const _卦象 = props.卦象.map((v) => v % 2)
const 自己 = getSelf(_主象) as MOCK.WUXING
const 纳甲 = getNajia(_卦象, 自己)
const 世应 = getShiyin(_卦象)
const 六神 = getLiushen(props.日干)
const 卦名 = (ZHOUYI.find((卦) => 卦.卦象.toString() === _卦象.toString()) || {}).卦名 || ''
const 冲合归游 = getCHGY(_卦象)

const style = computed(() => {
  return {
    width: `${props.size}px`,
    height: `${props.size / 10}px`,
    margin: `${props.size / 20}px`,
  }
})
</script>

<template>
  <div class="BaseGua" flex flex-col items-center>
    <h3 pl-16>
      {{ 卦名 }} <span v-if="冲合归游">({{ 冲合归游 }})</span>
    </h3>
    <ul flex flex-col-reverse>
      <li
        v-for="(爻, index) in 卦象"
        :key="index "
        class="flex items-center"
        @click="emit('onChange', 纳甲[index])"
      >
        <p v-if="主卦" class="text-size-10px mr-4">
          {{ 六神[index] }}
        </p>
        <p
          class="text-size-10px" :class="{
            'text-red-600 font-bold': 用神 === 纳甲[index],
          }"
        >
          {{ 纳甲[index] }}
        </p>
        <p
          :style="style"
          class="text-center color-white" :class="{
            'bg-black': 爻 % 2 === 0,
            'bg-red-600': 爻 % 2 === 1,
            '!bg-red-300': 主卦 && DIZHI[日支].六冲 === 纳甲[index].slice(2, 3),
          }"
        >
          <span v-if="爻 % 2 === 0" bg-white inline-block>111</span>
        </p>
        <p
          v-if="主卦"
          class="text-size-10px mr-2"
        >
          {{ 世应[index + 1] }}
        </p>
        <p
          v-if="主卦"
          class="text-size-10px ml--5px"
        >
          {{ 爻 === 6 ? 'X' : 爻 === 9 ? 'O' : '' }}
        </p>
      </li>
    </ul>
  </div>
</template>
