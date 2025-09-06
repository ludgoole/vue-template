<script lang="ts" setup>
import localforage from 'localforage'
const route = useRoute()
const imageStr = route.query.image as string
const image = JSON.parse(imageStr) as MOCK.IMAGE
const notes = ref<string[]>([])
const getGuaName = (guaxiang: number[]) => {
  const bagua = {
    '111': '天',
    '011': '泽',
    '101': '火',
    '001': '雷',
    '110': '风',
    '010': '水',
    '100': '山',
    '000': '土',
  }
  const key = guaxiang.reverse().join('') as keyof typeof bagua
  return bagua[key]
}
// 初始化
const init = async () => {
  const data = (await localforage.getItem(image.book) || {}) as { [key: string]: string[] }

  notes.value = data[image.name] || []
}

const onchange = async () => {
  const data = (await localforage.getItem(image.book) || {}) as { [key: string]: string[] }
  data[image.name] = JSON.parse(JSON.stringify(notes.value))

  localforage.setItem(image.book, data)
}

init()
</script>

<template>
  <div flex m-4>
    <img object-fit="cover" :src="image.path" />
    <div ml-16>
      <h1 text-2xl>
        {{ image.name }}
      </h1>
      <ul mt-4>
        <li v-for="(pile, i) in image.piles" :key="pile.id" text-left mb-4>
          <template v-if="Array.isArray(pile.info)">
            <p flex items-center>
              {{ i + 1 }}.
              {{ getGuaName(pile.info.slice(0, 3)) }}{{ getGuaName(pile.info.slice(-3)) }}
              <BaseGua ml-2 :guaxiang="pile.info" :size="24" />
            </p>
          </template>
          <template v-else>
            {{ i + 1 }}. {{ pile.info }}
          </template>
          <ElInput v-model="notes[i]" placeholder="笔记" clearable @change="onchange" />
        </li>
      </ul>
    </div>
  </div>
</template>
