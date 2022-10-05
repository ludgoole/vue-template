<route lang="yaml">
meta:
  title: 桩子
  leftArrow: true
  rightText: 保存
</route>

<script lang="ts" setup>
import type { Emitter } from 'mitt'
import { readFile, writeFile } from '@/utils'
import { useHeaderStore } from '@/stores/header'
const route = useRoute()
const emitter = inject('emitter') as Emitter<{ 'on-click-right': unknown }>
const { title } = toRefs(useHeaderStore())
const image = JSON.parse(route.query.image as any as string) as any as MOCK.IMAGE
const piles = image.piles.filter((pile) => pile.sentence)
const key = piles[0].id.slice(0, -2)
let memory: STROE.MEMORY = {}

console.log('🚀 ~ file: pile.vue ~ line 17 ~ piles', piles)

// mounted
onMounted(async () => {
  title.value = image.name
  emitter.on('on-click-right', onClickRight)
  memory = await getMemory()
  memory[key] && piles.forEach((pile, i) => {
    pile.note = memory[key][i]
  })
})

// destroyed
onUnmounted(() => {
  emitter.off('on-click-right', onClickRight)
})

// method
function getMemory() {
  let memory = {}
  readFile<STROE.MEMORY>('fs://memory.json').then((res) => {
    console.log('writeFile', res)
    memory = res
  })

  return memory
}
function onClickRight() {
  const notes = piles.map((v) => v.note)
  memory[key] = notes
  console.log('🚀 ~ file: pile.vue ~ line 49 ~ onClickRight ~ memory', memory)

  writeFile<STROE.MEMORY>('fs://test.json', memory).then((res) => {
    console.log('writeFile', res)
  })
}
</script>

<template>
  <div class="Pile" text-left>
    <VanSticky>
      <VanImage :src="image.path" />
    </vansticky>
    <VanCellGroup>
      <VanCell v-for="pile in piles" :key="pile.id" :title="`${pile.name} ${pile.sentence}`">
        <template #label>
          <input v-model="pile.note" :placeholder="key" w-full />
        </template>
      </VanCell>
    </VanCellGroup>
  </div>
</template>
