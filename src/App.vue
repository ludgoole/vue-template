<script lang="ts" setup>
import { getAccountData, getStockData } from '@/apis/mock'
import { useGlobalStore } from '@/stores/global'

const { g_stock, g_account } = toRefs(useGlobalStore())

// init
g_stock.value.length === 0 && getStockData().then((data) => {
  g_stock.value = data
})

g_account.value.length === 0 && getAccountData().then((data) => {
  g_account.value = data
})
</script>

<template>
  <div flex="~ col" h-100vh>
    <TheHeader />
    <RouterView flex-1 overflow-auto p-4 />
  </div>
</template>
