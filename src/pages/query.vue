<route lang="yaml">
meta:
  title: 查询
</route>

<script lang="ts" setup>
import PINYIN from '@/mock/pinyin'
const route = useRoute()
const imgList = ref<string[]>(Object.values(PINYIN))
const search = ref<string>('')

// method
const onSearch = () => {
  if (search.value) {
    let arr = []
    if (/[a-z]/.test(search.value))
      arr = search.value.split(' ')
    else
      arr = window.cnchar.spell(search.value.split('').join(' '), 'low').split(' ')

    imgList.value = arr.reduce((a: string[], key = '') => {
      PINYIN[key] && a.push(PINYIN[key])
      return a
    }, [])
  }
  else {
    imgList.value = Object.values(PINYIN)
  }
}

// mounted
onMounted(() => {
  search.value = route.query.记忆 as string
  onSearch()
})
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
    <ul flex="~ 1 wrap" overflow="auto">
      <li v-for="(image) in imgList" :key="image" class="w-10%">
        <img :src="image" />
      </li>
    </ul>
  </div>
</template>
