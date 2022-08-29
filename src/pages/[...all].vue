<route lang="yaml">
meta:
  title: Page Not Found
  leftArrow: true
  rightText: 刷新
</route>

<script setup lang="ts">
import { Toast } from 'vant'
import type { Emitter } from 'mitt'
import { useHeaderStore } from '@/stores/header'
const emitter = inject('emitter') as Emitter<{ 'on-click-right': unknown }>

const { title } = toRefs(useHeaderStore())
const router = useRouter()

// created
title.value = '404'
emitter.on('on-click-right', onClickRight)

// method
function onClickRight() {
  Toast({
    message: '刷新',
  })
}
</script>

<template>
  <div absolute min-w-full min-h-full bg-base flex justify-center items-center select-none>
    <div px-5 py-10 flex="~ col gap-4" justify-center items-center>
      <i text-8xl i-twemoji-crying-face></i>
      <span text-4xl>Page Not Found</span>

      <button btn="~ base" @click="router.replace({ path: '/' })">
        Back
      </button>
    </div>
  </div>
</template>
