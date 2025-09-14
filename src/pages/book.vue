<route lang="yaml">
meta:
  title: 周易
</route>

<script lang="ts" setup>
const router = useRouter()
const route = useRoute()
const bookStr = route.query.book as string
const book = JSON.parse(bookStr) as MOCK.BOOK

route.meta.title = book.name
const switchTo = (image: MOCK.IMAGE) => {
  console.log('🚀 ~ file: zhouyi.vue:12 ~ switchTo ~ image:', image)

  router.push({
    path: '/palace',
    query: {
      image: JSON.stringify(image),
    },
  })
}
</script>

<template>
  <ul grid gap-4 mt-4 grid-cols-8 :style="{ 'grid-template-columns': `repeat(${book.col}, minmax(0, 1fr))` }">
    <li
      v-for="image in book.images" :key="image.id"
      cursor-pointer hover:transform="scale-110" transition="duration-200"
      @click="switchTo(image)"
    >
      <img object-fit="cover" :src="image.path" />
    </li>
  </ul>
</template>
