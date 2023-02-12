<route lang="yaml">
meta:
  title: 首页
</route>

<script lang="ts" setup>
import moment from 'moment'
import { downloadFile } from '@/utils'
import { useCounterStore } from '@/stores/counter'
import { getMockData, getTestData } from '@/apis/test'
const { count } = toRefs(useCounterStore())
const file = ref()
const time = ref(moment().format('YYYY-MM-DD hh:mm:ss'))

// created
getTestData({ id: 1 }).then((data) => {
  console.log('🚀 ~ file: index.vue ~ line 17 ~ getTestData ~ data', data)
  file.value = data
})

getMockData({ id: 1 }).then((data) => {
  console.log('🚀 ~ file: index.vue ~ line 17 ~ getTestData ~ data', data)
})

setInterval(() => {
  time.value = moment().format('YYYY-MM-DD hh:mm:ss')
}, 1000)

// method
const download = () => downloadFile(file, 'text.json')
</script>

<template>
  <div class="Home" pt-4>
    <p>this is home page</p>
    <p mt-1>
      {{ time }}
    </p>
    <p mt-4>
      <ElButton @click="count++">
        count is: {{ count }}
      </ElButton>
      <ElButton @click="download">
        下载
      </ElButton>
    </p>
  </div>
</template>
