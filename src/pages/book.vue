<route lang="yaml">
meta:
  title: 书本
  leftArrow: true
</route>

<script lang="ts" setup>
import { useHeaderStore } from '@/stores/header'
const route = useRoute()
const router = useRouter()
const { title } = toRefs(useHeaderStore())
const book = JSON.parse(route.query.book as any as string) as any as MOCK.BOOK
const images = book.images

// created
title.value = book.book

// method
function onClick(image: MOCK.IMAGE) {
  router.push({
    path: '/pile',
    query: {
      image: JSON.stringify(image),
    },
  })
}
</script>

<template>
  <div class="Book" text-size-2>
    <VanGrid :border="false" square>
      <VanGridItem v-for="image in images" :key="image.name" @click="onClick(image)">
        <img :src="image.path" />
        {{ image.name }}
      </VanGridItem>
    </VanGrid>
  </div>
</template>
