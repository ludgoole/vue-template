<route lang="yaml">
meta:
  title: 宫殿
  roles: [ADMIN]
  leftArrow: true
</route>

<script lang="ts" setup>
import { useHeaderStore } from '@/stores/header'
const { title } = toRefs(useHeaderStore())

const route = useRoute()
const image = JSON.parse(route.query.image as string)
const activeName = ref('')

onMounted(() => {
  title.value = image.name
})
</script>

<template>
  <div class="Palace" flex flex-col>
    <img :src="image.path" alt="" />
    <section flex-1 overflow-auto text-left>
      <VanCollapse v-model="activeName" accordion>
        <VanCollapseItem
          v-for="(pile, i) in image.piles" :key="i" :title="`${i + 1}.${pile.name}`"
        >
          代码是写出来给人看的，附带能在机器上运行。
        </VanCollapseItem>
      </VanCollapse>
    </section>
  </div>
</template>
