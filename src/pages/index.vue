<route lang="yaml">
meta:
  title: 卜卦
  leftArrow: false
</route>

<script lang="ts" setup>
import moment from 'moment'
import _ from 'lodash'
import cnchar from 'cnchar'
import { Toast } from 'vant'
import { tags } from '@/const'
interface Item {
  type: string
  text: string
  icon: string
  ext: string
}

const router = useRouter()
const list: Item[] = [
  {
    type: 'random',
    text: '随机',
    icon: 'like-o',
    ext: '随机数',
  },
  {
    type: 'time',
    text: '时间',
    icon: 'clock-o',
    ext: '当前时间',
  },
  {
    type: 'number',
    text: '数字',
    icon: 'info-o',
    ext: '13 14 520 2020-02-02 20:20:20',
  },
  {
    type: 'character',
    text: '汉字',
    icon: 'comment-circle-o',
    ext: '一帆风顺',
  },
  {
    type: 'phone',
    text: '电话',
    icon: 'phone-circle-o',
    ext: '18672793439',
  },
  {
    type: 'car',
    text: '车牌',
    icon: 'logistics',
    ext: '鄂A8W888',
  },
  {
    type: 'id',
    text: '工号',
    icon: 'label-o',
    ext: '2018009',
  },
  {
    type: 'birthday',
    text: '生日',
    icon: 'birthday-cake-o',
    ext: '12-19',
  },
  {
    type: 'home',
    text: '房号',
    icon: 'wap-home-o',
    ext: '1-1-1101',
  },
]

const currItem = ref(list[0])
const question = ref('')
const text = ref('')

const tag = ref('')
const showPicker = ref(false)

// method
function onClick(item: Item) {
  currItem.value = item
  tag.value = ''
  text.value = ''
}

function onConfirm(value) {
  tag.value = value
  showPicker.value = false
}

function onSubmit({ question, text }) {
  const query = {
    timestamp: Date.now(),
    type: currItem.value.text,
    question: question || '今日动静如何',
    tag: tag.value || '其他',
  }

  switch (currItem.value.type) {
    case 'random':
      query.shangGuaCount = _.random(0, 99)
      query.xiaGuaCount = _.random(0, 99)
      break
    case 'time':
      query.shangGuaCount = moment(Date.now()).format('hh') * 1
      query.xiaGuaCount = moment(Date.now()).format('mm') * 1
      query.dongYaoCount = query.shangGuaCount + query.xiaGuaCount
      break
    case 'number':
      if (text.split(' ').length === 1) {
        query.shangGuaCount = Math.floor(text / 2)
        query.xiaGuaCount = Math.ceil(text / 2)
      }
      else if (text.split(' ').length === 2) {
        const [first, second] = text.split(' ')
        query.shangGuaCount = first * 1
        query.xiaGuaCount = second * 1
      }
      else if (text.split(' ').length === 3) {
        const [first, second, third] = text.split(' ')
        query.shangGuaCount = first * 1
        query.xiaGuaCount = second * 1
        query.dongYaoCount = third
      }
      else {
        const [first, second, third, time, hour] = text.split(' ')
        query.shangGuaCount = first * 1
        query.xiaGuaCount = second * 1
        query.dongYaoCount = third
        query.timestamp = +new Date(`${time} ${hour}`)
      }
      break
    case 'character':
      if (!text.match(/^[\u4e00-\u9fa5]+$/))
        return Toast({ msg: '必须为汉字', location: 'middle' })
      if (text.length === 1) {
        const bh = cnchar.stroke(text)
        query.shangGuaCount = Math.floor(bh / 2)
        query.xiaGuaCount = Math.ceil(bh / 2)
      }
      else {
        const len = text.length
        const half = Math.floor(len / 2)
        query.shangGuaCount = text.slice(0, half)
        query.xiaGuaCount = text.slice(half)
      }
      break
    case 'phone':
    case 'id':
      query.shangGuaCount = text.slice(-4, -2)
      query.xiaGuaCount = text.slice(-2)
      break
    case 'car':
      text = text.split('').map((c) => {
        return c.charCodeAt() > 57
          ? c.toUpperCase().charCodeAt() - 55
          : c * 1
      })
      query.shangGuaCount = text.slice(-4, -2).reduce((a, c) => c + a)
      query.xiaGuaCount = text.slice(-2).reduce((a, c) => c + a)
      break
    case 'birthday':
    case 'home':
      query.shangGuaCount = text.split(/[-_]/g).join('').slice(-2, -1)
      query.xiaGuaCount = text.split(/[-_]/g).join('').slice(-1)
      break
        // default:
  }

  Object.entries(query).forEach(([key, value]) => {
    if (key.includes('Count')) {
      value = Number(value)
      query[key] = Number.isNaN(value) ? _.random(0, 99) : value
    }
  })

  router.push({
    path: '/answer',
    query,
  })
  console.log('query', query)
}
</script>

<template>
  <div class="Question">
    <VanGrid :column-num="3">
      <VanGridItem
        v-for="item in list"
        :key="item.type"
        :icon="item.icon"
        :text="item.text"
        :class="{ 'text-red-400': item.type === currItem.type }"
        @click="onClick(item)"
      />
    </VanGrid>

    <VanForm class="mt-8" @submit="onSubmit">
      <VanField
        v-model="tag"
        is-link
        readonly
        name="picker"
        label="分类"
        placeholder="求财"
        @click="showPicker = true"
      />
      <VanField
        v-model.trim="question"
        name="question"
        label="所问何事"
        placeholder="今日动静如何？"
      />
      <VanField
        v-if="!['random', 'time'].includes(currItem.type)"
        v-model.trim="text"
        name="text"
        :label="currItem.text"
        :placeholder="currItem.ext ? currItem.ext : currItem.text"
        :rules="[{ required: true, message: `请填写${currItem.text}` }]"
      />
      <div class="mt-4 px-4">
        <VanButton round block type="primary" native-type="submit">
          解卦
        </VanButton>
      </div>
    </VanForm>

    <VanPopup v-model:show="showPicker" position="bottom">
      <VanPicker
        :columns="tags"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </VanPopup>
  </div>
</template>
