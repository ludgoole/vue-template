<script lang="ts" setup>
const route = useRoute()
const title = ref('')

useHead({ title })

provide('onChangeTitle', onChangeTitle)

watch(() => route.meta, (meta) => {
  onChangeTitle(meta.title)
})

function onChangeTitle(val) {
  route.meta.title = val
  title.value = val
}
</script>

<template>
  <div class="flex flex-col justify-between pt-6 h-100vh">
    <AppHeader />
    <RouterView class="flex-1 overflow-auto text-center" />
    <AppFooter />
  </div>
</template>
