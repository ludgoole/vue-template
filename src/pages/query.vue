<route lang="yaml">
meta:
  title: 查询
  rightText: 刷新
</route>

<script lang="ts" setup>
import type { Emitter } from 'mitt'
import PY from '@/mock/pinyin'
const emitter = inject('emitter') as Emitter<{ 'on-click-right': unknown }>
const pinyin = PY as MOCK.PINYIN
const search = ref<string | number>('')
const imgSrc = ref('')

// mounted
onMounted(() => {
  emitter.on('on-click-right', onClickRight)
})

// destroyed
onUnmounted(() => {
  emitter.off('on-click-right', onClickRight)
})

// method
function onSearch() {
  imgSrc.value = pinyin[search.value]
}

function onClick(key: string | number) {
  search.value = key
  onSearch()
}

function onClickRight() {
  search.value = ''
  onSearch()
}
</script>

<template>
  <div class="Query">
    <VanField
      v-model="search"
      right-icon="search"
      placeholder="a an ang"
      @click-right-icon="onSearch"
    />
    <VanImage v-if="imgSrc" :src="imgSrc" />
    <VanGrid v-else :border="false" :column-num="10">
      <VanGridItem v-for="(image, key) in pinyin" :key="image" @click="onClick(key)">
        <VanImage :src="image" />
      </VanGridItem>
    </VanGrid>
  </div>
</template>
