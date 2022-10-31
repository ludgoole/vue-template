<script lang="ts" setup>
import { menus } from '@/consts'
import { useHeaderStore } from '@/stores/header'

const { title } = toRefs(useHeaderStore())
const router = useRouter()
const route = useRoute()

useHead({ title })

watch(() => route.meta, (meta) => {
  title.value = meta.title as string
})

const activeIndex = ref('/')
const handleSelect = (path: string) => {
  router.push(path)
}
</script>

<template>
  <ElMenu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <ElMenuItem pointer-events-none index="0">
      <i mr-1 text-xl i-icon-park-outline:palace></i>
      <p>记忆宫殿</p>
    </ElMenuItem>

    <ElMenuItem
      v-for="item in menus"
      :key="item.icon"
      :index="item.path"
    >
      <i :class="item.icon"></i>
      {{ item.name }}
    </ElMenuItem>
  </ElMenu>
</template>
