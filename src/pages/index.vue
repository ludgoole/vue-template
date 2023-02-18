<route lang="yaml">
meta:
  title: 育知道训练营
  rightText: 我的打卡
</route>

<script lang="ts" setup>
import type { Emitter } from 'mitt'
const emitter = inject('emitter') as Emitter<{ 'on-click-right': unknown }>
// import { getPicture, readFile, writeFile } from '@/utils'
// import { useLoginStore } from '@/stores/counter'
// const { token } = toRefs(useLoginStore())

// import { getMockData, getTestData } from '@/apis/test'
// import TEST from '@/mock/test'
// console.log('🚀 ~ file: index.vue ~ line 11 ~ TEST', TEST)
const router = useRouter()
const list = [
  {
    text: '记忆法入门',
    path: '/introduction',
  },
  {
    text: '记忆法千桩训练',
    path: '/introduction',
  },
  {
    text: '记忆法编码练习',
    path: '/introduction',
  },
  {
    text: '记忆法导图入门',
    path: '/introduction',
  },
  {
    text: '记忆法导图训练',
    path: '/introduction',
  },
]

// method
const toRecord = () => router.push({
  path: '/record',
})

// mounted
onMounted(() => {
  emitter.on('on-click-right', toRecord)
})

// destroyed
onUnmounted(() => {
  emitter.off('on-click-right', toRecord)
})

// writeFile('fs://test.json', [{ a: 1 }]).then((res) => {
//   console.log('writeFile', res)
// })
// readFile('fs://test.json').then((res) => {
//   console.log('readFile', res)
// })
// getPicture().then((res) => {
//   console.log('getPicture', res)
// })

// getTestData({ id: 1 }).then((data) => {
//   console.log('🚀 ~ file: index.vue ~ line 24 ~ getTestData ~ data', data)
// })

// getMockData({ id: 1 }).then((data) => {
//   console.log('🚀 ~ file: index.vue ~ line 17 ~ getTestData ~ data', data)
// })
</script>

<template>
  <div class="Home" px-6>
    <ul mt-8>
      <li v-for="item in list" :key="item.text" flex-center rounded-5 border-base border-pramiry p-4 my-4>
        <p>{{ item.text }}</p>
        <p color-pramiry font-800 @click="router.push({ path: item.path, query: { title: item.text } })">
          训练
        </p>
      </li>
    </ul>
  </div>
</template>
