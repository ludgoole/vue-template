<route lang="yaml">
meta:
  title: 首页
</route>

<script lang="ts" setup>
import { getPicture, readFile, writeFile } from '@/utils'
import { useCounterStore } from '@/stores/counter'
import { getTestData } from '@/apis/test'
import ZHOUYI from '@/mock/zhouyi'
console.log('🚀 ~ file: index.vue ~ line 11 ~ ZHOUYI', ZHOUYI)

const { count } = toRefs(useCounterStore())

writeFile('fs://test.json', [{ a: 1 }]).then((res) => {
  console.log('writeFile', res)
})
readFile('fs://test.json').then((res) => {
  console.log('readFile', res)
})
getPicture().then((res) => {
  console.log('getPicture', res)
})

getTestData({ id: 1 }).then((data) => {
  console.log('🚀 ~ file: index.vue ~ line 24 ~ getTestData ~ data', data)
})
</script>

<template>
  <div class="Home">
    <p>this is home page</p>
    <VanButton @click="count++">
      count is: {{ count }}
    </VanButton>
  </div>
</template>
