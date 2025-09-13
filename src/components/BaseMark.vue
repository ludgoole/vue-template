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
  objects: {
    type: Array,
    default() {
      return []
    },
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
// const groupLine = new fabric.Group()
const width = props.width
const height = props.height
const objects = props.objects
const src = props.src
const originSrc = props.originSrc
const isOriginal = ref(false)

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

const drawTextbox = (text, x, y) => {
  const textbox = new fabric.Textbox(text, {
    fill: '#F56C6C',
    fontSize: 40,
  })
  textbox.set({
    left: x,
    top: y,
  })
  return textbox
}

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

const drawPath = (path, left, top) => {
  const pathline = new fabric.Path(path, {
    stroke: '#000000',
    fill: 'transparent',
    strokeWidth: 1,
    left,
    top,
  })

  return pathline
}

const createCanvas = () => {
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
  return new Promise((resolve) => {
    fabric.Image.fromURL(src, (oImg) => {
      oImg.width = screen.width
      oImg.height = screen.height
      oImg.scale(screen.width / oImg.width)
      oImg.selectable = false
      canvas.add(oImg)
      resolve(oImg)
    })
  })
}

const drawObjects = () => {
  objects.forEach((object) => {
    const pathline = drawPath(object.path, object.left, object.top)
    canvas.add(pathline)
  })
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

const saveImage = () => {
  // 还原缩放
  resetZomm()

  // 不保存背景图
  const objects = canvas.toObject().objects.slice(1).map((v) => {
    return {
      path: v.path,
      left: v.left,
      top: v.top,
    }
  })

  console.log('saveImage', objects)
  emit('save', objects)
}

const download = () => {
  const imageSrc = canvas.toDataURL({
    format: 'webp',
    quality: 1,
  })
  const a = document.createElement('a')
  a.href = imageSrc
  a.download = 'image.webp'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const keydownhandler = (evt) => {
  console.log('🚀 ~ initEvent ~ evt:', evt.key)
  if (evt.key === 'Delete')
    clearSelect()
}

const init = async () => {
  createCanvas()
  await drawImage()
  drawObjects()
}

const initEvent = () => {
  canvas.on('mouse:down', (opt) => {
    const evt = opt.e
    // 移动前置准备
    if (evt.ctrlKey === true) { // 是否按住alt
      canvas.isDragging = true // isDragging 是自定义的，开启移动状态
      canvas.lastPosX = evt.clientX // lastPosX 是自定义的
      canvas.lastPosY = evt.clientY // lastPosY 是自定义的
    }

    if (!isDrawing) return

    console.log('mouse:down', opt)
    const { x, y } = canvas.getPointer(evt)
    points.push({ x, y })

    if (points.length > 1) {
      const point1 = points[points.length - 2]
      const point2 = points[points.length - 1]
      // groupLine.addWithUpdate(drawLine(point1, point2))
      canvas.add(drawLine(point1, point2))
    }

    canvas.add(drawTextbox(points.length.toString(), x, y))
  })

  canvas.on('mouse:move', (opt) => { // 鼠标移动时触发
    if (canvas.isDragging) {
      const evt = opt.e
      const vpt = canvas.viewportTransform // 聚焦视图的转换
      vpt[4] += evt.clientX - canvas.lastPosX
      vpt[5] += evt.clientY - canvas.lastPosY
      canvas.requestRenderAll() // 重新渲染
      canvas.lastPosX = evt.clientX
      canvas.lastPosY = evt.clientY
    }
  })

  canvas.on('mouse:up', () => { // 鼠标松开时触发
    canvas.setViewportTransform(canvas.viewportTransform) // 设置此画布实例的视口转换
    canvas.isDragging = false // 关闭移动状态
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

  document.addEventListener('keydown', keydownhandler)
}

onMounted(() => {
  init()
  initEvent()
})

onUnmounted(() => {
  document.removeEventListener('keydown', keydownhandler)
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
      <ElTag type="info" @click="drawGuideLine">
        画引导线
      </ElTag>
      <ElTag type="info" @click="drawCancel">
        取消绘制
      </ElTag>
      <ElTag type="info" @click="clearSelect">
        删除选中
      </ElTag>
      <ElTag type="info" @click="clearAll">
        清除所有
      </ElTag>
      <ElTag type="info" @click="resetZomm">
        还原缩放
      </ElTag>
      <ElTag v-if="originSrc" type="info" @click="isOriginal = !isOriginal">
        {{ isOriginal ? '切换缩略图' : '切换原图' }}
      </ElTag>
      <ElTag type="info" @click="emit('redraw')">
        重新绘制
      </ElTag>
      <ElTag type="info" @click="saveImage">
        保存数据
      </ElTag>
      <ElTag type="info" @click="download">
        下载图片
      </ElTag>
    </div>
  </div>
</template>

<style scoped>
.BaseMark {
  width: v-bind(width);
  height: v-bind(height);

  &:deep(.el-tag) {
    margin-left: 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: #e6a23c;
      color: #fff;
    }
  }
}
</style>
