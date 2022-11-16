<route lang="yaml">
meta:
  title: 首页
</route>

<script lang="ts" setup>
import { downloadFile } from '@/utils'
import { useCounterStore } from '@/stores/counter'
import { getTestData } from '@/apis/test'
const { count } = toRefs(useCounterStore())
const router = useRouter()

getTestData({ id: 1 }).then((data) => {
  console.log('🚀 ~ file: index.vue ~ line 24 ~ getTestData ~ data', data, downloadFile)
  // downloadFile(data, 'text.json')
})

window.onmessage = ({ data }) => {
  console.log('🚀 ~ file: index.vue ~ line 19 ~ msg', data)
}

window.channel = new MessageChannel()
const { port1, port2 } = window.channel
port1.onmessage = ({ data = {} }) => {
  console.log('🚀 ~ file: index.vue ~ line 24 ~ port1', data)
}
port2.onmessage = ({ data = {} }) => {
  console.log('🚀 ~ file: index.vue ~ line 27 ~ port2', data)
}

function onClick() {
  count.value++
  const otherUrl = router.resolve({
    path: '/other',
    query: {
      id: count.value,
    },
  })

  const otherWin = window.open(otherUrl.href, 'newWindow')

  otherWin?.location.reload()
  window.name = '123'
  otherWin?.postMessage('window')
  port1.postMessage('port1')
  port2.postMessage('port2')

  console.log('🚀 ~ file: index.vue ~ line 26 ~ otherWin', otherWin)
}
</script>

<template>
  <div class="Home">
    <p>this is home page</p>
    <ElButton @click="onClick">
      count is: {{ count }}
    </ElButton>
  </div>
</template>
