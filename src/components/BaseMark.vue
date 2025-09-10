<script setup>
import { fabric } from 'fabric'

const props = defineProps({
  width: {
    type: Number,
    default: 800,
  },
  height: {
    type: Number,
    default: 600,
  },
  src: {
    type: String,
    required: true,
  },
  originSrc: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['save', 'redraw'])

let canvas = null
let isDrawing = false
let defaultViewportTransform = [1, 0, 0, 1, 0, 0]
let points = []
// const groupText = new fabric.Group()
// const groupLine = new fabric.Group()
const width = props.width
const height = props.height
const src = props.src
const originSrc = props.originSrc
const isOriginal = ref(false)

const init = () => {
  canvas = new fabric.Canvas('canvas', {
    width,
    height,
  })

  defaultViewportTransform = canvas.viewportTransform
  window.canvas = canvas

  // 设置画笔颜色
  // canvas.freeDrawingBrush.color = '#11999e'

  // 设置画笔粗细
  canvas.freeDrawingBrush.width = 1

  // 画笔投影
  // canvas.freeDrawingBrush.shadow = new fabric.Shadow({
  //   blur: 10,
  //   offsetX: 10,
  //   offsetY: 10,
  //   affectStroke: true,
  //   color: '#30e3ca',
  // })
}
const drawImage = () => {
  fabric.Image.fromURL(src, (oImg) => {
    // oImg.width = screen.width
    // oImg.height = screen.height
    console.log(oImg.width, screen.innerWidth)
    // zoom = width / oImg.width
    oImg.scale(width / oImg.width)
    oImg.selectable = false
    canvas.add(oImg)
  })
}

// const drawPoint = (x, y) => {
//   const point = new fabric.Circle({
//     radius: 5,
//     fill: 'red',
//     originX: 'center',
//     originY: 'center',
//   })
//   point.set({
//     left: x,
//     top: y,
//   })
//   return point
// }

// const drawTextbox = (text, x, y) => {
//   const textbox = new fabric.Textbox(text, {
//     fill: '#F56C6C',
//     fontSize: 40,
//   })
//   textbox.set({
//     left: x,
//     top: y,
//   })
//   return textbox
// }

const drawLine = (point1, point2) => {
  const line = new fabric.Line([
    point1.x, point1.y,
    point2.x, point2.y,
  ], {
    stroke: '#4047d6ff',
    strokeWidth: 5,
    originX: 'center',
    originY: 'center',
  })
  return line
}

const drawFree = () => {
  isDrawing = false
  canvas.isDrawingMode = !canvas.isDrawingMode
}

const drawGuideLine = () => {
  points = []
  canvas.isDrawingMod = false
  isDrawing = !isDrawing
}

const drawCancel = () => {
  canvas.isDrawingMode = false
  isDrawing = false
}

const clearSelect = () => {
  canvas.getActiveObjects().forEach((object) => {
    canvas.remove(object)
  })
}

const clearAll = () => {
  canvas.clear()
  drawCancel()
  drawImage()
}

const resetZomm = () => {
  canvas.setViewportTransform(defaultViewportTransform)
}

const download = (imageSrc) => {
  const a = document.createElement('a')
  a.href = imageSrc
  a.download = 'image.webp'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
const saveImage = () => {
  // 还原缩放
  resetZomm()

  const imageSrc = canvas.toDataURL({
    format: 'webp',
    quality: 1,
  })
  console.log('saveImage', imageSrc)
  emit('save', imageSrc)
  download(imageSrc)
}

onMounted(() => {
  init()
  drawImage()

  canvas.on('mouse:down', (opt) => {
    if (!isDrawing) return

    const evt = opt.e
    console.log('mouse:down', opt)
    const { x, y } = canvas.getPointer(evt)
    points.push({ x, y })

    if (points.length > 1) {
      const point1 = points[points.length - 2]
      const point2 = points[points.length - 1]
      canvas.add(drawLine(point1, point2))
    }

    // canvas.remove(groupText).add(groupText)
    // canvas.remove(groupLine).add(groupLine)
    // canvas.add(drawTextbox(points.length.toString(), x, y))
  })

  canvas.on('mouse:wheel', (opt) => {
    const delta = opt.e.deltaY
    let zoom = canvas.getZoom()
    console.log(zoom, delta)

    zoom *= 0.999 ** delta
    if (zoom > 20) zoom = 20
    if (zoom < 0.01) zoom = 0.01
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)
    opt.e.preventDefault()
    opt.e.stopPropagation()
  })
})
</script>

<template>
  <div class="BaseMark" relative>
    <canvas v-show="!isOriginal" id="canvas"></canvas>
    <img v-show="isOriginal" absolute top-0 :src="originSrc" />
    <div absolute top-0 m-2>
      <ElTag type="info" @click="drawFree">
        自由绘制
      </ElTag>
      <ElTag ml-4 type="info" @click="drawGuideLine">
        画引导线
      </ElTag>
      <ElTag ml-4 type="info" @click="drawCancel">
        取消绘制
      </ElTag>
      <ElTag ml-4 type="info" @click="clearSelect">
        清除选中
      </ElTag>
      <ElTag ml-4 type="info" @click="clearAll">
        清除所有
      </ElTag>
      <ElTag ml-4 type="info" @click="resetZomm">
        还原缩放
      </ElTag>
      <ElTag v-if="originSrc" ml-4 type="info" @click="isOriginal = !isOriginal">
        {{ isOriginal ? '切换缩略图' : '切换原图' }}
      </ElTag>
      <ElTag ml-4 type="info" @click="emit('redraw')">
        重新绘制
      </ElTag>
      <ElTag ml-4 type="info" @click="saveImage">
        保存图片
      </ElTag>
    </div>
  </div>
</template>

<style scoped>
.BaseMark {
  width: v-bind(width);
  height: v-bind(height);
}
</style>
