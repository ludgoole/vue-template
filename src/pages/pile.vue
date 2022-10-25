<route lang="yaml">
meta:
  title: 桩子
  leftArrow: true
  rightText: 保存
</route>

<script lang="ts" setup>
import type { Emitter } from 'mitt'
import { getItem, readFile, setItem, writeFile } from '@/utils'
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
  const memory = await getItem('ZHOUYI') as STROE.MEMORY
  if (memory) {
    return memory
  }
  else {
    return readFile<STROE.MEMORY>('fs://memory.json')
      .catch(() => {
        return {}
      })
  }
}

function onClickRight() {
  const notes = piles.value.map((v) => v.note)
  memory[key] = notes
  console.log('🚀 ~ file: pile.vue ~ line 49 ~ onClickRight ~ memory', memory)
  setItem('ZHOUYI', memory)
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
          <VanField
            v-model="pile.note"
            class="!p-0 !text-size-12px"
            rows="2"
            autosize
            label=""
            type="textarea"
            maxlength="100"
            placeholder="请输入笔记"
          />
        </template>
      </VanCell>
    </VanCellGroup>
  </div>
</template>
