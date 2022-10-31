<route lang="yaml">
meta:
  title: 桩子
  leftArrow: true
  rightText: 保存
</route>

<script lang="ts" setup>
import type { Emitter } from 'mitt'
import { getItem, setItem } from '@/utils'
import { useHeaderStore } from '@/stores/header'
const route = useRoute()
const emitter = inject('emitter') as Emitter<{ 'on-click-right': unknown }>
const { title } = toRefs(useHeaderStore())
const image = JSON.parse(route.query.image as any as string) as any as MOCK.IMAGE
const piles = ref(image.piles.filter((pile) => pile.sentence))
const key = piles.value[0].id.slice(0, -2)
let memory: STROE.MEMORY = {}

// mounted
onMounted(async () => {
  title.value = image.name
  emitter.on('on-click-right', onClickRight)
  memory = await getMemory()
  memory[key] && piles.value.forEach((pile, i) => {
    pile.note = memory[key][i]
  })
})

// destroyed
onUnmounted(() => {
  emitter.off('on-click-right', onClickRight)
})

// method
async function getMemory() {
  return await getItem('ZHOUYI') as STROE.MEMORY
}

function onClickRight() {
  const notes = piles.value.map((v) => v.note)
  memory[key] = notes
  console.log('🚀 ~ file: pile.vue ~ line 49 ~ onClickRight ~ memory', memory)
  setItem<STROE.MEMORY>('ZHOUYI', memory)
}
</script>

<template>
  <div class="Pile" flex text-left px-4 pt-4>
    <ElCarousel :autoplay="false" indicator-position="none" height="450px" class="w-600px">
      <ElCarouselItem v-for="item in 6" :key="item">
        <img :src="image.path" />
      </ElCarouselItem>
    </ElCarousel>
    <ul>
      <li v-for="pile in piles" :key="pile.id" ml-8 mb-4>
        {{ `${pile.name} ${pile.sentence}` }}
        <ElInput
          v-model="pile.note"
          class="!p-0 !text-size-12px"
          rows="2"
          autosize
          label=""
          type="textarea"
          maxlength="100"
          placeholder="请输入笔记"
        />
      </li>
    </ul>
  </div>
</template>
