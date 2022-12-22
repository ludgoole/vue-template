<route lang="yaml">
meta:
  title: 查询
</route>

<script lang="ts" setup>
import PY from '@/mock/pinyin'
const pinyin = PY as MOCK.PINYIN
const search = ref<string | number>('')
const imgSrc = ref('')

// method
function onSearch() {
  imgSrc.value = pinyin[search.value]
}

function onClick(key: string | number) {
  search.value = key
  onSearch()
}
</script>

<template>
  <div class="Query px-4 flex flex-col">
    <ElInput
      v-model="search"
      class="my-4"
      placeholder="a an ang"
      clearable
      @change="onSearch"
      @clear="onSearch"
    />
    <img v-if="imgSrc" :src="imgSrc" width="200" />
    <ul v-else flex="~ 1 wrap" overflow="auto">
      <li v-for="(image, key) in pinyin" :key="image" class="w-10%" @click="onClick(key)">
        <img :src="image" />
      </li>
    </ul>
  </div>
</template>
