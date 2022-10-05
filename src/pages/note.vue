<route lang="yaml">
meta:
  title: 备忘
</route>

<script lang="ts" setup>
import { readFile } from '@/utils'
const notes = ref<string[]>([])
const list = ref<string[]>([])
const loading = ref(false)
const finished = ref(false)
const page = ref(0)

// mounted
onMounted(async () => {
  const memory = await getMemory()
  notes.value = Object.values(memory).join(',').split(',')
})

// method
function getMemory() {
  return readFile<STROE.MEMORY>('fs://memory.json')
    .catch(() => {
      return {
        1: Array(20).fill(1).map((v, i) => `1_${i + 1}`),
        2: Array(20).fill(1).map((v, i) => `1_${i + 21}`),
      }
    })
}

function onLoad() {
  page.value++

  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    list.value = notes.value.slice(0, page.value * 10)

    // 加载状态结束
    loading.value = false

    // 数据全部加载完成
    if (list.value.length >= notes.value.length)
      finished.value = true
  }, 1000)
}
</script>

<template>
  <div class="Note">
    <VanList
      v-model:loading="loading"
      :finished="finished"
      finished-text=""
      @load="onLoad"
    >
      <VanCell v-for="item in list" :key="item" :title="item" />
    </VanList>
  </div>
</template>
