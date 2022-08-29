<script lang="ts" setup>
import { useHeaderStore } from '@/stores/header'

const { title } = toRefs(useHeaderStore())
const router = useRouter()
const route = useRoute()
const emitter = inject('emitter')

useHead({ title })

watch(() => route.meta, (meta) => {
  title.value = meta.title
})

function onClickRight() {
  emitter.emit('on-click-right')
}
</script>

<template>
  <VanNavBar
    :title="title"
    :left-arrow="route.meta.leftArrow"
    :right-text="route.meta.rightText"
    @click-right="onClickRight"
    @click-left="router.go(-1)"
  />
</template>
