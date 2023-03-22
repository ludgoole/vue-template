<route lang="yaml">
meta:
  title: 首页
  roles: [ADMIN]
</route>

<script lang="ts" setup>
import contacts from '/src/indexdb/functions/contacts'
import { useCounterStore } from '@/stores/counter'
import { getTestData } from '@/apis/test'
import TEST from '@/mock/test'
console.log('🚀 ~ file: index.vue ~ line 11 ~ TEST', TEST)

console.log('🚀 ~ file: index.vue:11 ~ db:', contacts)

const { count } = toRefs(useCounterStore())

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
