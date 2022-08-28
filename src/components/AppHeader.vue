<script lang="ts" setup>
const router = useRouter()
const route = useRoute()
const emitter = inject('emitter')

function onClickRight() {
  emitter.emit('on-click-right')
}
</script>

<template>
  <VanNavBar
    v-bind="$attrs"
    :left-arrow="route.meta.leftArrow"
    :right-text="route.meta.rightText"
    @click-right="onClickRight"
    @click-left="router.go(-1)"
  />
</template>
