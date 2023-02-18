<route lang="yaml">
meta:
  title: 记忆法入门
  leftArrow: true
  rightText: 重学
  isPlain: true
</route>

<script lang="ts" setup>
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import type { Emitter } from 'mitt'
import { useHeaderStore } from '@/stores/header'
const emitter = inject('emitter') as Emitter<{ 'on-click-right': unknown }>

// data
const { title } = toRefs(useHeaderStore())
const router = useRouter()
const route = useRoute()
const step = ref(1)
const end = 7
const message = ref('')
const words = [
  '热情',
  '溏泻',
  '县公',
  '瞽说',
  '诸倩',
  '愉怿',
  '撒暂',
  '屎橛',
  '省堂',
  '种生',
]
const checked = ref('')
const options = [
  {
    item: 'A',
    text: '它是一条蛇',
  },
  {
    item: 'B',
    text: '它是数字',
  },
  {
    item: 'C',
    text: '它是一种图像',
  },
  {
    item: 'D',
    text: '我不知道',
  },
]

// method
const reLearning = () => {
  step.value = 1
}
const toIntroduction = () => {
  router.push('/introduction')
}
const prev = () => {
  step.value = step.value - 1
}
const next = () => {
  step.value = step.value + 1
}

// mounted
onMounted(() => {
  title.value = route.query.title as string
  emitter.on('on-click-right', reLearning)
})

// destroyed
onUnmounted(() => {
  emitter.off('on-click-right', reLearning)
})
</script>

<template>
  <div class="Course">
    <VanProgress mb-4 :percentage="step / end * 100" :show-pivot="false" />
    <section v-if="step === 1" class="step1">
      <div px-6>
        <p>大家好，欢迎来到{{ title.slice(0, 3) }}的学习</p>
        <p>接下来，一起看下面这个视频</p>
      </div>
      <div gap my-6></div>
      <div px-6>
        <VideoPlayer
          w-full
          :height="200"
          src="//vjs.zencdn.net/v/oceans.mp4"
          poster="//vjs.zencdn.net/v/oceans.png"
          controls
        />
      </div>
    </section>
    <section v-if="step === 2" class="step2">
      <div px-6>
        <p>编码最重要的是背下来并熟悉它</p>
      </div>
      <div gap my-6></div>
      <div px-6>
        <VanField
          v-model="message"
          rows="1"
          autosize
          type="textarea"
          placeholder="请输入你的理解"
        />
      </div>
    </section>
    <section v-if="step === 3" class="step3">
      <div px-6>
        <p>接下来我们进行课程练习</p>
      </div>
      <div gap my-6></div>
      <div px-6>
        <p>背完下面是十个词</p>
        <ul flex flex-wrap text-gray ml--2 mt-2>
          <li v-for="word in words" :key="word" px-2 whitespace-nowrap>
            {{ word }}
          </li>
        </ul>
      </div>
    </section>
    <section v-if="step === 4" class="step4">
      <div px-6>
        <p>请默写刚才背的十个词</p>
      </div>
      <div gap my-6></div>
      <div px-6>
        <VanField
          v-model="message"
          rows="1"
          autosize
          type="textarea"
          placeholder="请输入刚才记忆的十个词"
        />
      </div>
    </section>
    <section v-if="step === 5" class="step5">
      <div px-6>
        <p>请问编码是什么</p>
      </div>
      <div gap my-6></div>
      <div px-6>
        <VanRadioGroup v-model="checked">
          <VanRadio v-for="option in options" :key="option.item" :name="option.item" class="h-36px my-4">
            {{ option.text }}
            <template #icon="props">
              <p :class="{ active: props.checked }" class="w-1.5em h-1.5em circle font-14px">
                {{ option.item }}
              </p>
            </template>
          </VanRadio>
        </VanRadioGroup>
      </div>
    </section>
    <section v-if="step === 6" class="step6">
      <div px-6>
        <p>请看下面一张图，背下来之后点击下一步</p>
      </div>
      <div gap my-6></div>
      <div px-6>
        <img src="//vjs.zencdn.net/v/oceans.png" alt="" />
      </div>
    </section>
    <section v-if="step === 7" class="step6" text-center>
      <div px-6 mt-30>
        <p text-24px color-red border-base border-2 py-4 rounded-4>
          恭喜你完成这一课的学习啦~
        </p>
      </div>
      <div px-6 text-18px mt-10>
        <p>这一课，你得了</p>
        <p color-pramiry text-24px>
          9分
        </p>
      </div>
    </section>
    <footer p-6 fixed bottom-0 w-full flex>
      <VanButton type="primary" size="small" round block :disabled="step === 1" @click="prev">
        上一步
      </VanButton>
      <div w-8></div>
      <VanButton v-if="step === end" type="primary" size="small" round block @click="toIntroduction">
        返回
      </VanButton>
      <VanButton v-else type="primary" size="small" round block @click="next">
        下一步
      </VanButton>
    </footer>
  </div>
</template>
