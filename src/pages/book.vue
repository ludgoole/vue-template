<route lang="yaml">
meta:
  title: 书本
  leftArrow: true
</route>

<script lang="ts" setup>
import { useHeaderStore } from '@/stores/header'
import { downloadFile, getItem, setItem } from '@/utils'
const route = useRoute()
const { title } = toRefs(useHeaderStore())
const book = JSON.parse(route.query.book as any as string) as any as MOCK.BOOK
const images = book.images
const curImage = ref(images[0])
const noteInfo: MOCK.NOTE = {}

// created
updateTitle()
updateNote()

// method
function updateTitle() {
  title.value = book.book
}

async function updateNote() {
  const noteInfo = await getItem<MOCK.NOTE>('MEMORY')
  noteInfo && curImage.value.piles.forEach((pile) => {
    pile.note = noteInfo[pile.id]
  })
}

function onClick(image: MOCK.IMAGE) {
  curImage.value = image
  updateNote()
}

function onChange(id: string, note: string) {
  noteInfo[id] = note
  console.log(noteInfo)

  setItem<MOCK.NOTE>('MEMORY', noteInfo)
}

async function onDownload() {
  const noteInfo = await getItem<MOCK.NOTE>('MEMORY')
  noteInfo && downloadFile<MOCK.NOTE>(noteInfo, 'note.json')
}
</script>

<template>
  <div class="Book" flex px-4 text-left text-size-2>
    <ul h-full overflow-auto cursor-pointer w-100px>
      <li v-for="image in images" :key="image.name" p-2 rounded-1 hover="bg-blue-200" @click="onClick(image)">
        {{ image.name }}
      </li>
    </ul>
    <div flex="~ 1" pl-2>
      <img :src="curImage.path" pt-2 @click="onDownload" />
      <ul flex-1>
        <li v-for="pile in curImage.piles" :key="pile.id" ml-8 my-2>
          <p text-size-14px>
            {{ `${pile.order}.${pile.sentence}` }}
          </p>
          <ElInput
            v-model="pile.note"
            class="!p-0 !text-size-12px"
            autosize
            label=""
            type="textarea"
            placeholder="请输入笔记"
            @change="onChange(pile.id, pile.note)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
