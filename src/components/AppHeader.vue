<script lang="ts" setup>
import type { Emitter } from 'mitt'
import { useHeaderStore } from '@/stores/header'

const { title } = toRefs(useHeaderStore())
const router = useRouter()
const route = useRoute()
const emitter = inject('emitter') as Emitter<{ 'on-click-right': unknown }>
const leftArrow = ref(false)
const rightText = ref('')

useHead({ title })

watch(() => route.meta, (meta) => {
  title.value = meta.title as string
  leftArrow.value = meta.leftArrow as boolean
  rightText.value = meta.rightText as string
}, { immediate: true })

function onClickRight() {
  emitter.emit('on-click-right')
}
</script>

<template>
  <VanNavBar
    class="py-6px"
    :title="title"
    :left-arrow="leftArrow"
    @click-right="onClickRight"
    @click-left="router.go(-1)"
  >
    <template #right>
      <p w-4em rounded-full border-base border-pramiry p-2 text-sm scale-75>
        {{ rightText }}
      </p>
    </template>
  </VanNavBar>
</template>

<style>
.van-nav-bar__title {
  /* @apply font-800 text-lg; */
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 800;
}
</style>
