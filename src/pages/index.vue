<route lang="yaml">
meta:
  title: 首页
</route>

<script lang="ts" setup>
import { books } from '@/consts'
const router = useRouter()
</script>

<template>
  <div class="Home">
    <ul flex mt-4>
      <li v-for="book in books" :key="book.name" @click="router.push(book.path)">
        <i class="i-material-symbols:book" text-size-20 color-yellow-5></i>
        <p>{{ book.name }}</p>
      </li>
    </ul>
  </div>
</template>
