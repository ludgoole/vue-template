<route lang="yaml">
meta:
  title: 我的成绩
  leftArrow: true
</route>

<script lang="ts" setup>
const route = useRoute()
const title = route.query.title

// data
const list = [
  '什么是编码？',
  '什么是串联？',
  '什么是地点桩？',
]
</script>

<template>
  <div class="Introduction">
    <section mt-8 px-6>
      <header font-800>
        {{ title }}
      </header>
      <ul mt-4>
        <li flex>
          <p flex-1>
            课程
          </p>
          <p>总分</p>
          <p ml-4>
            答题分数
          </p>
        </li>
        <li v-for="(item, i) in list" :key="item" flex my-2>
          <p class="flex-1 van-ellipsis">
            {{ `第${i + 1}课 ${item}` }}
          </p>
          <p>10分</p>
          <p w-20 text-center>
            9分
          </p>
        </li>
      </ul>
    </section>
  </div>
</template>
