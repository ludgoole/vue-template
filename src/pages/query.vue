<route lang="yaml">
meta:
  title: 查询
  leftArrow: true
  rightText: 保存
</route>

<script lang="ts" setup>
import ZHOUYI from '@/mock/zhouyi'
const zhouyi: MOCK.ZHOUYI = ZHOUYI
const search: string = ref('')
const router = useRouter()

console.log('ZHOUYI', zhouyi)

function clearSearch() {
  search.value = ''
}
function switchTo(val) {
  const gua = zhouyi.find((v) => isNaN(val) ? v.guaMing === val : v.guaXiang === val) || zhouyi[0]
  console.log(val, gua)
  router.push({
    path: '/gua',
    query: {
      gua: JSON.stringify(gua),
      search: val,
    },
  })
}

function onSearch(val) {
  clearSearch()
  switchTo(val)
}
</script>

<template>
  <div class="Query">
    <VanSearch
      v-model="search"
      placeholder="111111 | 111 | 乾 | 1 | 乾宫一世"
      @search="onSearch"
    />

    <VanGrid :column-num="4">
      <VanGridItem
        v-for="gua in zhouyi"
        :key="gua.order"
        @click="onSearch(gua.guaMing)"
      >
        <div class="text-center">
          <BaseGua :gua-xiang="gua.guaXiang" :size="56" />
          <p class="Query-guaming">
            {{ gua.guaMing }}
          </p>
        </div>
      </VanGridItem>
    </VanGrid>
  </div>
</template>
