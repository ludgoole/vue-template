<script lang="ts" setup>
const route = useRoute()
const isShowHeader = ref(true)
const isShowFooter = ref(true)

watch(() => route.meta, (meta) => {
  isShowHeader.value = !meta.hideHeader as boolean
  isShowFooter.value = !meta.hideFooter as boolean
})
</script>

<template>
  <div flex="~ col" justify-between h-100vh>
    <AppHeader v-if="isShowHeader" />
    <RouterView flex-1 overflow-auto text-center />
    <AppFooter v-if="isShowFooter" />
  </div>
</template>
