<script lang="ts" setup>
import type { Emitter } from 'mitt'
import { useHeaderStore } from '@/stores/header'

const { title } = toRefs(useHeaderStore())
const router = useRouter()
const route = useRoute()
const emitter = inject('emitter') as Emitter<{ 'on-click-right': unknown }>
const toPath = ref('')
const leftArrow = ref(false)
const rightText = ref('')
const isSlot = ref(false)

useHead({ title })

watch(() => route.meta, (meta) => {
  toPath.value = meta.toPath as string
  title.value = meta.title as string
  leftArrow.value = meta.leftArrow as boolean
  rightText.value = meta.rightText as string
  isSlot.value = meta.isPlain as boolean
}, { immediate: true })

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
    @click-left="toPath ? router.push(toPath) : router.go(-1)"
  >
    <template v-if="isSlot" #right>
      <p w-4em rounded-full border-base border-pramiry p-2 text-sm scale-75>
        {{ rightText }}
      </p>
    </template>
  </VanNavBar>
</template>
