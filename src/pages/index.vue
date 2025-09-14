<route lang="yaml">
meta:
  title: 首页
  </route>

<script lang="ts" setup>
import books from '@/mock'
const router = useRouter()
const switchTo = (book: MOCK.BOOK) => {
  console.log('🚀 ~ switchTo ~ book:', book)

  router.push({
    path: '/book',
    query: {
      book: JSON.stringify(book),
    },
  })
}
</script>

<template>
  <div class="Home">
    <ul flex mt-4>
      <li v-for="book in books" :key="book.name" @click="switchTo(book.data())">
        <i class="i-material-symbols:book" text-size-20 color-yellow-5></i>
        <p>{{ book.name }}</p>
      </li>
    </ul>
  </div>
</template>
