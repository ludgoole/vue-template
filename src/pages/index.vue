<route lang="yaml">
meta:
  title: 首页
  roles: [ADMIN]
</route>

<script lang="ts" setup>
import { useCounterStore } from '@/stores/counter'
import { getMockData, getTestData } from '@/apis/test'

const { count } = toRefs(useCounterStore())

getTestData({ id: 1 }).then((data) => {
  console.log('🚀 ~ file: index.vue ~ line 24 ~ getTestData ~ data', data)
})

getMockData().then((data) => {
  console.log('🚀 ~ file: index.vue:20 ~ getMockData ~ data:', data)
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
