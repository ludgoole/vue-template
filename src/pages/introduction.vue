<route lang="yaml">
meta:
  title: 记忆法入门
  leftArrow: true
  rightText: 我的成绩
</route>

<script lang="ts" setup>
const list = [
  '什么是编码？',
  '什么是串联？',
  '什么是地点桩？',
]
const index = 1
const isLearning = list[index]
</script>

<template>
  <div class="Introduction">
    <section mt-8 px-6>
      <header font-800>
        你当前学习的是:
      </header>
      <p mt-4>
        {{ `第${index + 1}课 ${isLearning}` }}
      </p>
      <VanProgress mt-2 :percentage="60" :show-pivot="false" />
    </section>
    <div border-base border-8 border-gray-1 my-8></div>
    <section mt-8 px-6>
      <header font-800>
        课程目录
      </header>
      <ul>
        <li v-for="(item, i) in list" :key="item" my-4>
          <p>{{ `第${i + 1}课 ${item}` }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>
