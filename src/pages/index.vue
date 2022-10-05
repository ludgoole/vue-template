<route lang="yaml">
meta:
  title: 首页
</route>

<script lang="ts" setup>
import ZY from '@/mock/zhouyi'
import DDJ from '@/mock/daodejing'
const router = useRouter()

const zhouyi = ZY as MOCK.BOOK
const daodejing = DDJ as MOCK.BOOK
const books = [zhouyi, daodejing]

// method
function onClick(book: MOCK.BOOK) {
  console.log(book)
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
    <VanGrid :border="false" :column-num="3">
      <VanGridItem v-for="book in books" :key="book.book" @click="onClick(book)">
        <i class="i-material-symbols:book" text-size-20 color-yellow-5></i>
        {{ book.book }}
      </VanGridItem>
    </VanGrid>
  </div>
</template>
