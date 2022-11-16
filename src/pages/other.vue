<route lang="yaml">
meta:
  title: 其他
</route>

<script lang="ts" setup>
console.log('🚀 ~ file: other.vue ~ line 7 ~ window', window)
console.log('🚀 ~ file: other.vue ~ line 7 ~ oldwindow', window.opener)

window.onload = () => {
  console.log('🚀 ~ file: other.vue ~ line 10 ~ onload')
}
window.onmessage = (msg) => {
  console.log('🚀 ~ file: other.vue ~ line 14 ~ msg', msg)
  // window.location.reload()
}

const onClick = () => {
  const { port1, port2 } = window.opener.channel
  port1.postMessage('port1port1')
  port2.postMessage('port2port2')

  window.opener.postMessage({
    type: 'update',
    data: {},
  })
}
</script>

<template>
  <div class="Other">
    <p>
      this is other window page
    </p>
    <ElButton @click="onClick">
      提交
    </ElButton>
  </div>
</template>
