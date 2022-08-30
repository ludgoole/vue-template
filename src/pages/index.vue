<route lang="yaml">
meta:
  title: 首页
</route>

<script lang="ts" setup>
import { downloadFile } from '@/utils'
import { useCounterStore } from '@/stores/counter'
import { getTestData } from '@/apis/test'
const { count } = toRefs(useCounterStore())

getTestData({ id: 1 }).then((data) => {
  console.log('🚀 ~ file: index.vue ~ line 24 ~ getTestData ~ data', data, downloadFile)
  // downloadFile(data, 'text.json')
})
</script>

<template>
  <div class="Home">
    <p>this is home page</p>
    <ElButton @click="count++">
      count is: {{ count }}
    </ElButton>
  </div>
</template>
