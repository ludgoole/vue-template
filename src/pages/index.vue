<route lang="yaml">
meta:
  title: 首页
  roles: [ADMIN]
</route>

<script lang="ts" setup>
import { useCounterStore } from '@/stores/counter'
import { getTestData } from '@/apis/test'
import TEST from '@/mock/test'
console.log('🚀 ~ file: index.vue ~ line 11 ~ TEST', TEST)

const { count } = toRefs(useCounterStore())

getTestData({ id: 1 }).then((data) => {
  console.log('🚀 ~ file: index.vue ~ line 24 ~ getTestData ~ data', data)
})
</script>

<template>
  <div class="Home">
    <p>this is home page</p>
    <VanButton type="primary" @click="count++">
      count is: {{ count }}
    </VanButton>
  </div>
</template>
