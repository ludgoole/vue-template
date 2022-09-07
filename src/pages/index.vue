<route lang="yaml">
meta:
  title: 首页
</route>

<script lang="ts" setup>
import moment from 'moment'
import { useGlobalStore } from '@/stores/global'
import useShoe from '/src/todos/common/use-shoe'

const themes = [
  '#c23531',
  '#2f4554',
  '#61a0a8',
  '#d48265',
  '#91c7ae',
  '#749f83',
  '#ca8622',
  '#bda29a',
  '#6e7074',
  '#546570',
  '#c4ccd3',
]
const { g_account } = toRefs(useGlobalStore())
const { countBy } = useShoe()
const account = ref<MOCK.STOCk>([])
const names = ref<[string, number][]>()
const colors = ref<[string, number][]>()
const sizes = ref<[string, number][]>()
const prices = ref<[string, number][]>()
const date = ref([new Date(), new Date()])

const totalPrice = computed(() => {
  return account.value.reduce((a, c) => a + Number(c.price), 0)
})

watchEffect(() => {
  onChange(date.value)

  names.value = countBy(account.value, 'name')
  colors.value = countBy(account.value, 'color')
  sizes.value = countBy(account.value, 'size')
  prices.value = countBy(account.value, 'price')
})

// method
function onChange(data: Date[]) {
  const [start, end] = data as any as Date[]
  account.value = g_account.value
    .filter((item) => moment(item.time).format('YYYYMMDD') >= moment(start).format('YYYYMMDD'))
    .filter((item) => moment(item.time).format('YYYYMMDD') <= moment(end).format('YYYYMMDD'))
}
</script>

<template>
  <div class="Home">
    <div flex mb-4 content-center text-5>
      <p font-bold>
        总量: {{ account.length }}双
      </p>
      <p font-bold ml-8>
        总价: {{ totalPrice }}元
      </p>
      <div flex-1></div>
      <ElDatePicker
        v-model="date"
        class="max-w-80"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
    </div>
    <div class="flex justify-between">
      <TheBar title="厂商" :color="themes[0]" :data="names" />
      <TheBar title="颜色" :color="themes[1]" :data="colors" />
      <TheBar title="尺码" :color="themes[2]" :data="sizes" />
      <TheBar title="价格" :color="themes[3]" :data="prices" />
    </div>
    <div class="flex justify-between mt-4">
      <ThePie title="厂商" :data="names" />
      <ThePie title="颜色" :data="colors" />
      <ThePie title="尺码" :data="sizes" />
      <ThePie title="价格" :data="prices" />
    </div>
  </div>
</template>
