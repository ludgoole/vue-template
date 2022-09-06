<script lang="ts" setup>
import * as echarts from 'echarts'

interface Prop {
  title: string
  data: [string, number][] | undefined
  color: string
}

const props = withDefaults(defineProps<Prop>(), {
  title: '厂商',
  // data: [['红', 1]],
  color: 'red',
})

// 基于准备好的dom，初始化echarts实例
const barRef = ref<HTMLElement | null>(null)

watchEffect(() => {
  if (!barRef.value) return
  if (!toRefs(props).data.value) return

  const myChart = echarts.init(barRef.value)
  const { title, data, color } = toRefs(props)

  const xData = computed(() => data.value?.map((v) => v[0]))
  const sData = computed(() => data.value?.map((v) => v[1]))

  // 绘制图表
  myChart.setOption({
    title: {
      text: title.value,
    },
    tooltip: {},
    xAxis: {
      data: xData.value,
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        barWidth: 40,
        color: color.value,
        data: sData.value,
      },
    ],
  })
})
</script>

<template>
  <div ref="barRef" w-100 h-80></div>
</template>
