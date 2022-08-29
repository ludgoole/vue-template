<route lang="yaml">
meta:
  title: 首页
</route>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'
import { getPicture, readFile, writeFile } from '@/utils'

const { count } = storeToRefs(useCounterStore())

writeFile('fs://test.json', [{ a: 1 }]).then((res) => {
  console.log('writeFile', res)
})
readFile('fs://test.json').then((res) => {
  console.log('readFile', res)
})
getPicture().then((res) => {
  console.log('getPicture', res)
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
