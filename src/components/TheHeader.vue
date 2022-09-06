<script lang="ts" setup>
import { menus } from '@/consts'
import { useHeaderStore } from '@/stores/header'

const { title } = toRefs(useHeaderStore())
const router = useRouter()
const route = useRoute()
const activeIndex = ref(route.path)

useHead({ title })

watch(route, ({ meta, path }) => {
  title.value = meta.title as string
  activeIndex.value = path as string
})

// method
function onSelect(path: string) {
  router.push(path)
}
</script>

<template>
  <ElMenu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="onSelect"
  >
    <ElMenuItem pointer-events-none index="0">
      <i text-2xl i-mdi:shoe-ballet></i>
      <p>老北京布鞋</p>
    </ElMenuItem>

    <!-- <div flex-grow></div> -->
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
