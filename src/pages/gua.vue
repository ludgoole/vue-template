<route lang="yaml">
meta:
  title: 乾
  leftArrow: true
  rightText: 保存
</route>

<script lang="ts" setup>
// import localforage from 'localforage'
import BaseGua from '@/components/BaseGua.vue'
import ZHOUYI from '@/mock/zhouyi'
const zhouyi: MOCK.ZHOUYI = ZHOUYI
const emitter = inject('emitter')
const onChangeTitle = inject('onChangeTitle')
const route = useRoute()
const gua = ref(null)
const dangerousList = ref([])

emitter.on('on-click-right', onClickRight)

onChange(route.query.search)

// method
function onChange(val) {
  gua.value = zhouyi.find((v) => isNaN(val) ? v.guaMing === val : v.guaXiang === val) || zhouyi[0]
  onChangeTitle(gua.value.guaMing)
}

function onClickRight(val) {
  console.log('onClickRight-1', val)
}
</script>

<template>
  <div class="Gua px-5 pb-4" @on-click-right="onClickRight">
    <div class="Gua-daXiang mt-4">
      <p>{{ gua.daXiang }}</p>
      <p class="text-size-10px">
        {{ gua.yiXiang }}
      </p>
    </div>
    <div
      class="mt-4 flex justify-center"
    >
      <BaseGua
        :gua-xiang="gua.guaXiang"
        :na-jia="gua.naJia"
        :shi-ying="gua.shiYing"
        :size="160"
        @change="onChange"
      />
    </div>
    <div class="mt-4 text-size-10px text-red-400">
      {{ gua.leiXiang }}
    </div>
    <div class="mt-4">
      {{ gua.guaCi }}
    </div>
    <div class="mt-4">
      <ul>
        <li v-for="(item, index) in gua.yaoCi" :key="index" class="mt-4">
          <p class="Gua-yaoCi text-bold">
            {{ item }}
          </p>
          <p class="Gua-yaoXiang text-size-12px text-gray-500">
            按：{{ gua.yaoXiang[index] }}
          </p>
          <p class="Gua-yaoXiang text-size-12px text-gray-500">
            析：{{ gua.yiLi[index].how }}
          </p>
          <p class="Gua-fengxian ml--4">
            <VanField
              v-model="dangerousList[index]"
              rows="1"
              autosize
              clearable
              label="卦例"
              label-width="28"
              type="textarea"
              placeholder="请输入危险源"
            />
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
