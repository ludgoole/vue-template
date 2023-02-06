<route lang="yaml">
meta:
  title: 排盘
</route>

<script lang="ts" setup>
import moment from 'moment'
import { Lunar } from 'lunar-javascript'
import DIZHI from '../../mock/dizhi'
import WUXING from '../../mock/wuxing'

const route = useRoute()
const { query } = route
const lunar = Lunar.fromDate(new Date())

// 卜卦
const 占问 = query.占问 || '今日天气如何？'
const 占类 = query.占类 || '天气'
const 卦主 = query.卦主 || '自己'
const 卦象 = query.卦象 || '678987'

// 装卦
const 主卦 = (卦象 as string).split('').map(Number)
const 变卦 = 主卦.map(v => v === 6 ? 9 : v === 9 ? 6 : v)
const 月建 = query.月建 || lunar.getMonthZhi()
const 日辰 = query.日辰 || lunar.getDayInGanZhi()
const 旬空 = query.旬空 || lunar.getDayXunKong()
const 月支:MOCK.DIHZI = 月建
const 日支:MOCK.DIHZI = 日辰.slice(-1)
const 日干:MOCK.TIANGAN = 日辰.slice(0, 1)

// 辅助
// const 用神 = ref('')
const 元神 = ref('')
const 忌神 = ref('')
const 墓库 = ref('')
const 六冲 = ref('')
const 六合 = ref('')
const 三合 = ref('')
const onChange = (val:string) => {
  if (!val) return

  const 五行 = val.slice(-1) as MOCK.WUXING
  const 地支 = val.slice(-2, -1) as MOCK.DIHZI

  用神.value = val
  元神.value = WUXING[五行].元神
  忌神.value = WUXING[五行].忌神
  墓库.value = WUXING[五行].生 + WUXING[五行].旺 + WUXING[五行].墓 + WUXING[五行].绝

  六冲.value = DIZHI[地支].六冲
  六合.value = DIZHI[地支].六合
  三合.value = DIZHI[地支].三合
}
onMounted(() => {
  onChange(query.用神 as string)
})

// 断卦
const 用神 = ref(query.用神 as string || '')
const 吉凶 = ref(query.吉凶 as string || '')
const 应期 = ref(query.应期 as string || '')
const 启示 = ref(query.启示 as string || '')

</script>

<template>
  <div class="Gua" flex p-8  text-left>
    <section>
      <header>
        <p>
          占问：{{ 占问 }}
        </p>
        <!-- <p>
          占类：{{ 占类 }}
        </p>
        <p>
          卦主：{{ 卦主 }}
        </p> -->
        <p>
          时间：{{ moment(new Date()).format('YYYY年MM月DD日HH时mm分') }}
        </p>
        <p>
          干支：{{ 月建 }}月 {{ 日辰 }}日
          <span ml-4>(旬空：{{旬空}})</span>
        </p>
      </header>
      <section w-700px flex mt-8 justify="between">
        <BaseGua
        :卦象="主卦"
        :日干="日干"
        @on-change="onChange"
        ></BaseGua>
        <BaseGua
        :卦象="变卦"
        :主卦="false"
        ></BaseGua>
      </section>
      <footer mt-4 flex text-size-10px w-300px color-gray-4 whitespace-nowrap>
        <section>
          <p>1.选取用神</p>
          <p>2.月建日辰</p>
          <p>3.元生忌神</p>
          <p>4.暗动旬空</p>
          <p>5.六亲六神</p>
        </section>
        <section ml-8>
          <p>月建：{{月建}}</p>
          <p>六冲：{{DIZHI[月支].六冲}}</p>
          <p>六合：{{DIZHI[月支].六合}}</p>
        </section>
        <section ml-8>
          <p>日辰：{{日辰.slice(-1)}}</p>
          <p>六冲：{{DIZHI[日支].六冲}}</p>
          <p>六合：{{DIZHI[日支].六合}}</p>
        </section>
        <section ml-8>
          <p>用神：{{用神}}</p>
          <p>元神：{{元神}}</p>
          <p>忌神：{{忌神}}</p>
          <p>六冲：{{六冲}}</p>
          <p>六合：{{六合}}</p>
          <p>三合：{{三合}}</p>
          <p>墓库：{{墓库}}</p>
        </section>
      </footer>
    </section>
    <article flex-1 ml-8>
      <section>
        <h2 font-900>用神</h2>
        <el-input v-model="用神" @change="onChange"/>
      </section>
      <section mt-4>
        <h2 font-900>吉凶</h2>
        <el-input
          v-model.trim="吉凶"
          :autosize="{ minRows: 2, maxRows: 5 }"
          type="textarea"
        />
      </section>
      <section mt-4>
        <h2 font-900>应期</h2>
        <el-input
          v-model.trim="应期"
          :autosize="{ minRows: 2, maxRows: 5 }"
          type="textarea"
        />
      </section>
      <section mt-4>
        <h2 font-900>启示</h2>
        <el-input
          v-model="启示"
          :autosize="{ minRows: 2, maxRows: 5 }"
          type="textarea"
        />
      </section>
    </article>
  </div>
</template>
