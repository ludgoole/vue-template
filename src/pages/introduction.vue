<route lang="yaml">
meta:
  title: 记忆法入门
  leftArrow: true
  rightText: 我的成绩
  toPath: /
</route>

<script lang="ts" setup>
import type { Emitter } from 'mitt'
import { useHeaderStore } from '@/stores/header'
const route = useRoute()
const router = useRouter()
const emitter = inject('emitter') as Emitter<{ 'on-click-right': unknown }>
const { title } = toRefs(useHeaderStore())

// data
const list = [
  '什么是编码？',
  '什么是串联？',
  '什么是地点桩？',
]
const index = 1
const isLearning = list[index]

// method
const toResult = () => router.push({
  path: '/result',
  query: {
    title: title.value,
  },
})
const toCourse = (title: string) => router.push({
  path: '/course',
  query: {
    title,
  },
})

// mounted
onMounted(() => {
  title.value = route.query.title as string
  emitter.on('on-click-right', toResult)
})

// destroyed
onUnmounted(() => {
  emitter.off('on-click-right', toResult)
})
</script>

<template>
  <div class="Introduction">
    <section mt-8 px-6>
      <header font-800>
        你当前学习的是:
      </header>
      <p mt-4 @click="toCourse(`第${index + 1}课 ${isLearning}`)">
        {{ `第${index + 1}课 ${isLearning}` }}
      </p>
      <VanProgress mt-2 :percentage="60" :show-pivot="false" />
    </section>
    <div gap my-8></div>
    <section mt-8 px-6>
      <header font-800>
        课程目录
      </header>
      <ul>
        <li v-for="(item, i) in list" :key="item" my-4 @click="toCourse(`第${i + 1}课 ${item}`)">
          <p :class="{ 'color-pramiry': i === index }">
            {{ `第${i + 1}课 ${item}` }}
          </p>
        </li>
      </ul>
    </section>
  </div>
</template>
