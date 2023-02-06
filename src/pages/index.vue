<route lang="yaml">
meta:
  title: 首页
</route>

<script lang="ts" setup>
import moment from 'moment'
import { downloadFile } from '@/utils'
import { useCounterStore } from '@/stores/counter'
import { getTestData } from '@/apis/test'
import ZSBY from '../../book/zsby'
const router = useRouter()
const { count } = toRefs(useCounterStore())
const file = ref()
const time = ref(moment().format('YYYY-MM-DD hh:mm:ss'))

// created
getTestData({ id: 1 }).then((data) => {
  console.log('🚀 ~ file: index.vue ~ line 17 ~ getTestData ~ data', data)
  file.value = data
})

setInterval(() => {
  time.value = moment().format('YYYY-MM-DD hh:mm:ss')
}, 1000)

// method
const download = () => downloadFile(file, 'text.json')
const toGua = (卦: MOCK.BUGUA, i:number) => {
  router.push({
    path: '/gua',
    query: {
      ...卦
    }
  })
}
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
    <ul>
      <li my-4 v-for="(卦, i) in ZSBY" :key="卦.占问 + i" @click="toGua(卦, i)" :title="卦.占问">
        {{ 卦.占问 }}
      </li>
    </ul>
  </div>
</template>
