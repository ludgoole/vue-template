<script lang="ts" setup>
interface Props {
  size: number
  guaXiang: string
  naJia?: string[]
  shiYing?: object
  dongYaoOrder?: number
}
const props = withDefaults(defineProps<Props>(), {
  size: 100,
  guaXiang: '111111',
  dongYaoOrder: -1,
})
const emit = defineEmits(['update:guaXiang', 'change'])

const style = computed(() => {
  return {
    width: `${props.size}px`,
    height: `${props.size / 10}px`,
    margin: `${props.size / 20}px`,
  }
})

function onChange(yao: number, index: number) {
  const guaXiang = props.guaXiang.replaceAll(yao, (a, b) => {
    return b === index
      ? a === '0' ? '1' : '0'
      : a
  })

  emit('change', guaXiang)
}
</script>

<template>
  <div class="BaseGua">
    <ul>
      <li
        v-for="(yao, index) in guaXiang"
        :key="index "
        class="flex items-center"
        @click="onChange(yao, index)"
      >
        <p v-if="naJia" class="text-size-10px">
          {{ naJia[index] }}
        </p>
        <p
          :style="style"
          :class="{
            'bg-gray-500': dongYaoOrder && index === 6 - dongYaoOrder,
            'bg-black': yao === '0',
            'bg-red-600': yao === '1',
          }"
        >
        </p>
        <p
          v-if="shiYing"
          class="text-size-10px"
        >
          {{ shiYing[6 - index] }}
        </p>
      </li>
    </ul>
  </div>
</template>
