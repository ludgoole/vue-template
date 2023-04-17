<route lang="yaml">
meta:
  title: 周易
</route>

<script lang="ts" setup>
import zhouyiDb from '@/indexdb/functions/zhouyi'
const router = useRouter()
const 周易 = ref<DATABASE.Zhouyi[]>([])
const 本卦 = ref<DATABASE.Zhouyi>()
const 互卦 = ref<DATABASE.Zhouyi>()
const 变卦 = ref<DATABASE.Zhouyi>()
const 综卦 = ref<DATABASE.Zhouyi>()
const 交卦 = ref<DATABASE.Zhouyi>()
const 错卦 = ref<DATABASE.Zhouyi>()

// watch
watchEffect(() => {
  const 互卦_卦象 = 本卦.value?.卦象.slice(1, 4).concat(本卦.value?.卦象.slice(2, 5))
  const 综卦_卦象 = [...(本卦.value?.卦象 || [])].reverse()
  const 交卦_卦象 = 本卦.value?.卦象.slice(3).concat(本卦.value?.卦象.slice(0, 3))
  const 错卦_卦象 = 本卦.value?.卦象.map((v) => v === 0 ? 1 : 0)
  const getGua = (卦象: number[] | undefined) => 周易.value.find((v) => v.卦象.toString() === 卦象?.toString())

  互卦.value = getGua(互卦_卦象)
  变卦.value = getGua(本卦.value?.卦象)
  综卦.value = getGua(综卦_卦象)
  交卦.value = getGua(交卦_卦象)
  错卦.value = getGua(错卦_卦象)
})

// method
const changeYaoHandler = async (index: number, i = 0) => {
  if (!本卦.value || i !== 0) return

  const 卦象 = 本卦.value.卦象.map((v, i) => i === index ? v === 0 ? 1 : 0 : v)
  const data = await zhouyiDb.query({ 卦象 })
  变卦.value = data[0]
}

const changeGuaHandler = async (卦名: string, i: number) => {
  console.log('🚀 ~ file: book.vue:33 ~ changeGuaHandler ~ i:', i)
  const data = await zhouyiDb.query({ 卦名 })

  本卦.value = data[0]
  changeYaoHandler(0)
}

const toQuery = (记忆 = '', i: number) => {
  console.log('🚀 ~ file: zhouyi.vue:50 ~ toQuery ~ i:', i)
  router.push({
    path: '/query',
    query: {
      记忆,
    },
  })
}
console.log(window.cnchar.spell('血', 'low', 'tone', 'poly'))

// created
onMounted(() => {
  zhouyiDb.get().then((res) => {
    console.log('🚀 ~ file: book.vue:22 ~ zhouyiDb.get ~ res:', res)
    周易.value = res
    本卦.value = res[0]
    changeYaoHandler(0)
  })
})
</script>

<template>
  <div v-if="本卦 && 互卦 && 变卦 && 综卦 && 交卦 && 错卦" class="Book" flex flex-col>
    <ElBreadcrumb my-4 ml-4>
      <ElBreadcrumbItem :to="{ path: '/' }">
        首页
      </ElBreadcrumbItem>
      <ElBreadcrumbItem>易经</ElBreadcrumbItem>
    </ElBreadcrumb>
    <div class="Book-container" flex flex-1 overflow-hidden px-4 text-left>
      <section>
        <ul h-full overflow-auto cursor-pointer w-100px text-size-2>
          <li
            v-for="(卦, i) in 周易"
            :key="卦.卦名"
            p-2 rounded-1 hover="color-blue"
            :class="{ 'bg-blue-200': 卦.卦名 === 本卦.卦名 }"
            @click="changeGuaHandler(卦.卦名, i)"
          >
            {{ 卦.卦名 }}
          </li>
        </ul>
      </section>
      <section flex flex-1 overscroll-auto>
        <div v-for="(卦, i) in [本卦, 互卦, 变卦, 综卦, 交卦, 错卦]" :key="`${卦.卦名}_${i}`" ml-8 pl-2 w-200px>
          <p font-bold text-xl text-center @click="toQuery(卦.记忆, i)">
            {{ 卦.卦名 }}
          </p>
          <p ellipsis font-bold mt-2 :title="卦.卦辞">
            {{ 卦.卦辞 }}
          </p>
          <p text-gray ellipsis mt-2 :title="卦.大象">
            {{ 卦.大象 }}
          </p>
          <BaseGua ml-8 my-6 :guaxiang="卦.卦象" @on-change="index => changeYaoHandler(index, i)" />
          <ul flex-1>
            <li v-for="爻辞 in 卦.爻辞" :key="爻辞" my-2>
              <p ellipsis :title="爻辞">
                {{ 爻辞 }}
              </p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
