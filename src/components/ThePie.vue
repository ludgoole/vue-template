<script lang="ts" setup>
import * as echarts from 'echarts'

interface Prop {
  data: [string, number][] | undefined
}

const props = withDefaults(defineProps<Prop>(), {
  // data: [['红', 1]],
})

// 基于准备好的dom，初始化echarts实例
const PieRef = ref<HTMLElement | null>(null)

watchEffect(() => {
  if (!PieRef.value) return
  if (!toRefs(props).data.value) return

  const myChart = echarts.init(PieRef.value)
  const { data } = toRefs(props)

  // 绘制图表
  myChart.setOption({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: data.value?.map(([name, value]) => ({
          value,
          name,
        })),
      },
    ],
  })
})
</script>

<template>
  <div ref="PieRef" w-100 h-80></div>
</template>
