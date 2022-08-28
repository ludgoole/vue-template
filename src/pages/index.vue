<route lang="yaml">
meta:
  title: 首页
</route>

<script lang="ts" setup>
import { getPicture, readFile, writeFile } from '@/utils'
writeFile('fs://test1.json', [{ a: 1 }]).then((res) => {
  console.log('writeFile', res)
})
readFile('fs://test1.json').then((res) => {
  console.log('readFile', res)
})
getPicture().then((res) => {
  console.log('getPicture', res)
})
</script>

<template>
  <div class="Home">
    this is home page
  </div>
</template>
