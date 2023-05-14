<route lang="yaml">
meta:
  title: 首页
  </route>

<script lang="ts" setup>
// import { books } from '@/consts'
// import yj from '@/mock/yijing'
// import ddj from '@/mock/daodejing'
import zgxw from '@/mock/zgxw'

const router = useRouter()
const route = useRoute()
const books = [zgxw]
const book = books.find((book) => book.book === route.query.book) || books[0]

// data
const imageIndex = ref(0)
const pileIndex = ref(0)

// computed
const image = computed(() => {
  return book.images.find((image) => image.id === imageIndex.value + 1) || book.images[0]
})
const pile = computed(() => {
  return image.value.piles[pileIndex.value] || book.images[0].piles[0]
})

// filter
const getFirstWord = (sentence: string[]) => sentence.map((v) => v.slice(0, 1)).join('')

// method
const toQuery = (记忆 = '') => {
  router.push({
    path: '/query',
    query: {
      记忆,
    },
  })
}
</script>

<template>
  <div class="Book flex mt-4">
    <section class="poem flex-1">
      <h3 font-600>
        {{ book.poem }}
      </h3>
      <p text-sm color-gray>
        {{ book.author }}
      </p>
      <p whitespace-pre>
        {{ book.words }}
      </p>
    </section>
    <section class="palace flex-1">
      <ElCarousel indicator-position="none" :autoplay="false" @change="index => imageIndex = index">
        <ElCarouselItem v-for="_image in book.images" :key="_image.id">
          <img :src="image.path" :alt="_image.name" />
        </ElCarouselItem>
      </ElCarousel>

      <ul flex justify-between mt-4>
        <li v-for="(_pile, index) in image.piles" :key="_pile.name" cursor-pointer @click="pileIndex = index">
          <p :class="{ 'color-primary': pile.id === _pile.id }">
            {{ _pile.name }}
          </p>
        </li>
      </ul>
    </section>
    <section class="sentence flex-1">
      <h3 font-600 cursor-pointer @click="toQuery(getFirstWord(pile.sentence))">
        {{ getFirstWord(pile.sentence) }}
      </h3>
      <p mt-2 whitespace-pre>
        {{ pile.sentence.join('\n') }}
      </p>
    </section>
  </div>
</template>
