<script lang="ts" setup>
import localforage from 'localforage'
const route = useRoute()
const router = useRouter()
const imageStr = route.query.image as string
const image = JSON.parse(imageStr) as MOCK.IMAGE
const notes = ref<string[]>([])
const imageSrc = ref('')
const objects = ref([])
const getGuaName = (guaxiang: number[]) => {
  const bagua = {
    '111': '天',
    '110': '泽',
    '101': '火',
    '100': '雷',
    '011': '风',
    '010': '水',
    '001': '山',
    '000': '地',
  }
  const key = guaxiang.reverse().join('') as keyof typeof bagua
  return bagua[key]
}

const getData = async () => {
  const data: any = (await localforage.getItem(image.book) || {})
  if (!data[image.name])
    data[image.name] = {}

  return data
}

// 初始化
const init = async () => {
  const data = await getData()

  console.log(data)

  notes.value = data[image.name].notes || []
  imageSrc.value = data[image.name].imageSrc
  objects.value = data[image.name].objects
}

const onchange = async () => {
  const data = await getData()

  data[image.name].notes = JSON.parse(JSON.stringify(notes.value))
  localforage.setItem(image.book, data)
}

const save = async (objects: any[]) => {
  const data = await getData()
  data[image.name].objects = objects
  localforage.setItem(image.book, data)
}

const redraw = () => {
  imageSrc.value = ''
  objects.value = []
}

const toQuery = (info: string) => {
  router.push({
    path: '/query',
    query: {
      search: info,
    },
  })
}

init()
</script>

<template>
  <div flex m-4 overflow-hidden>
    <BaseMark
      :key="imageSrc"
      :width="image.width"
      :height="image.height"
      :image-src="imageSrc"
      :origin-src="image.path"
      :objects="objects"
      @save="save"
      @redraw="redraw"
    />
    <div flex-1 ml-16 overflow-y-auto>
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
            <p @click="toQuery(pile.info)">
              {{ i + 1 }}. {{ pile.info }}
            </p>
          </template>
          <ElInput v-model="notes[i]" type="textarea" :rows="1" autosize placeholder="笔记" clearable @change="onchange" />
        </li>
      </ul>
    </div>
  </div>
</template>
