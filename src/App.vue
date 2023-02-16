<script lang="ts" setup>
const route = useRoute()
const isShowHeader = ref(true)
const isShowFooter = ref(false)

watch(() => route.meta, (meta) => {
  isShowHeader.value = !meta.hideHeader as boolean
  // isShowFooter.value = !meta.hideFooter as boolean
})
</script>

<template>
  <div flex="~ col" justify-between pt-6 h-100vh>
    <AppHeader v-if="isShowHeader" />
    <RouterView flex-1 overflow-auto />
    <AppFooter v-if="isShowFooter" />
  </div>
</template>
