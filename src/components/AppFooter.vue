<script lang="ts" setup>
import { menus } from '@/consts'
const router = useRouter()
const active = ref(0)
const onChange = (index: number) => {
  router.push({
    path: menus[index].path,
  })
}
</script>

<template>
  <VanTabbar v-model="active" class="!static" @change="onChange">
    <VanTabbarItem
      v-for="item in menus"
      :key="item.icon"
      :icon="item.icon"
    >
      {{ item.name }}
    </VanTabbarItem>
  </VanTabbar>
</template>
