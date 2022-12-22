<route lang="yaml">
meta:
  title: 备忘
</route>

<script lang="ts" setup>
import { getItem } from '@/utils'
const notes = ref<string[]>([])

// mounted
onMounted(async () => {
  const memory = await getMemory() as STROE.MEMORY
  notes.value = Object.values(memory).join(',').split(',')
  console.log('🚀 ~ file: note.vue ~ line 17 ~ onMounted ~ memory', notes.value)
})

// method
function getMemory() {
  return getItem('MEMORY')
    .catch(() => {
      return {
        1: Array(20).fill(1).map((v, i) => `1_${i + 1}`),
        2: Array(20).fill(1).map((v, i) => `1_${i + 21}`),
      }
    })
}
</script>

<template>
  <div class="Note px-4 pt-4">
    <ul>
      <li v-for="item in notes" :key="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
