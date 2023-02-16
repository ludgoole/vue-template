<script lang="ts" setup>
const route = useRoute()
const isLogin = ref(false)

watch(() => route.path, (path) => {
  isLogin.value = path === '/login'
})
</script>

<template>
  <div flex="~ col" justify-between pt-6 h-100vh>
    <AppHeader v-if="!isLogin" />
    <RouterView flex-1 overflow-auto text-center />
    <AppFooter v-if="!isLogin" />
  </div>
</template>
