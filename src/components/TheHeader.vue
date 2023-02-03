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
  console.log("🚀 ~ file: TheHeader.vue:17 ~ handleSelect ~ path", path)
  activeIndex.value = path
  router.push(path)
}
</script>

<template>
  <header class="TheHeader">
    <ElMenu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <ElMenuItem pointer-events-none index="0">
        <i text-2xl i-carbon:sun></i>
        <p ml-2>
          Ludgoole
        </p>
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
  </header>
</template>
