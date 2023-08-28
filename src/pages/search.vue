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
    const arr = search.value.split(' ')
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
  <div class="Search px-4 flex flex-col">
    <VanField
      v-model="search"
      placeholder="a an ang"
      right-icon="search"
      clearable
      @click-right-icon="onSearch"
      @clear="onSearch"
    />
    <ul flex="~ 1 wrap" overflow="auto">
      <li v-for="(image) in imgList" :key="image" class="w-20%">
        <img :src="image" />
      </li>
    </ul>
  </div>
</template>
