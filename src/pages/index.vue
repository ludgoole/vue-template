<route lang="yaml">
meta:
  title: 首页
  roles: [ADMIN]
</route>

<script lang="ts" setup>
import bookList from '@/mock/books'
import { useHeaderStore } from '@/stores/header'
const { title } = toRefs(useHeaderStore())
const router = useRouter()
const active = ref(0)
const trimAll = (str: string) => str.replaceAll(' ', '')

const toPalace = (image = bookList[0].images[0]) => {
  router.push({
    path: '/palace',
    query: {
      image: JSON.stringify(image),
    },
  })
}

onMounted(() => {
  title.value = bookList[0].poem
})
</script>

<template>
  <div class="Home">
    <VanTabs v-model:active="active">
      <VanTab v-for="book in bookList" :key="book.book" :title="book.book">
        <ul px-2 flex flex-wrap>
          <li
            v-for="(word, i) in trimAll(book.words)" :key="i"
            class="basis-1\/5 aspect-square p-2"
            @click="toPalace(book.images[i])"
          >
            <p class="word" w-full h-full flex-center text-3xl>
              {{ word }}
            </p>
          </li>
        </ul>
      </VanTab>
    </VanTabs>
  </div>
</template>

<style lang="less" scoped>
 .word {
    background: url('https://www.cidianwang.com/images/z_100.gif') center center no-repeat;
    border: 1px solid sandybrown;
  }
</style>
/src/mock/books
