<script setup lang="ts">
// props
const props = withDefaults(defineProps<{
  size?: number
  guaxiang: number[]
}>(), {
  size: 120,
  guaxiang: () => [0, 1, 0, 1, 0, 1],
})

// emit
const emit = defineEmits(['on-change'])

// data

// style
const width = computed(() => `${props.size}px`)
const height = computed(() => `${props.size / 6}px`)
</script>

<template>
  <div class="BaseGua flex flex-col-reverse">
    <div
      v-for="(yao, index) in guaxiang" :key="index"
      class="BaseGua-yao" :class="[yao % 2 === 0 ? 'yin' : 'yang']"
      my-1 cursor="pointer"
      @click="emit('on-change', index)"
    ></div>
  </div>
</template>

<style scoped>
.BaseGua-yao {
  width:  v-bind(width);
  height: v-bind(height);
}
.BaseGua-yao.yin {
  background: linear-gradient(90deg, black 40%, transparent 40%, transparent 60%, black 60%);
}
.BaseGua-yao.yang {
  background: darkred;
}
</style>
