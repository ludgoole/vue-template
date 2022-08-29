<script lang="ts" setup>
import type { Emitter } from 'mitt'
import { useHeaderStore } from '@/stores/header'

const { title } = toRefs(useHeaderStore())
const router = useRouter()
const route = useRoute()
const emitter = inject('emitter') as Emitter<{ 'on-click-right': unknown }>
const { leftArrow, rightText } = route.meta as { leftArrow: boolean; rightText: string }

useHead({ title })

watch(() => route.meta, (meta) => {
  title.value = meta.title as string
})

function onClickRight() {
  emitter.emit('on-click-right')
}
</script>

<template>
  <VanNavBar
    :title="title"
    :left-arrow="leftArrow"
    :right-text="rightText"
    @click-right="onClickRight"
    @click-left="router.go(-1)"
  />
</template>
