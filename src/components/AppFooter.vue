<script lang="ts" setup>
import { Toast } from 'vant'
const router = useRouter()
const active = ref(0)
const onChange = (index: number) => {
  Toast({
    message: `标签 ${index}`,
  })
  router.push({
    path: '/query',
  })
}
</script>

<template>
  <VanTabbar v-model="active" class="!static" @change="onChange">
    <VanTabbarItem icon="question-o">
      卜卦
    </VanTabbarItem>
    <VanTabbarItem icon="gift-o">
      查卦
    </VanTabbarItem>
    <VanTabbarItem icon="medal-o">
      名卦
    </VanTabbarItem>
    <VanTabbarItem icon="user-circle-o">
      我的
    </VanTabbarItem>
  </VanTabbar>
</template>
