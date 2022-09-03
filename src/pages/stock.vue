<script lang="ts" setup>
import moment from 'moment'
// import { getTestData } from '@/apis/test'
import type { Emitter } from 'mitt'
import useShoe from '@/todos/use-shoe'
import { useGlobalStore } from '@/stores/global'
type FormKey = 'id' | 'name' | 'color' | 'area' | 'size'

const { g_data } = toRefs(useGlobalStore())
const emitter = inject('emitter') as Emitter<{ 'onEdit': MOCK.STOCK_TREE_ITEM }>

const { uniqueBy, getTreeStock } = useShoe()
const stock = ref<MOCK.STOCk>([])
const tableData = ref<MOCK.STOCK_TREE>([])
const names = ref<MOCK.STOCK_SELECT>([])
const colors = ref<MOCK.STOCK_SELECT>([])
const areas = ref<MOCK.STOCK_SELECT>([])
const sizes = ref<MOCK.STOCK_SELECT>([])
const all = [
  {
    value: '',
    label: '全部',
  },
]

const formInline = reactive<Partial<MOCK.STOCk_ITEM>>({
  id: '',
  name: '',
  color: '',
  size: '',
  area: '',
})

const visible = ref(false)
const title = ref('添加')
const isQuery = ref(false)

// init
watchEffect(() => {
  if (isQuery.value)
    isQuery.value = false

  else
    init(g_data.value)
})

// method
function init(data: MOCK.STOCk) {
  stock.value = data
  initSelect(stock.value)
  refresh(stock.value)
  // getTestData({ id: 1 }).then((data) => {
  //   console.log('🚀 ~ file: index.vue ~ line 24 ~ getTestData ~ data', data)
  //   g_data.value = g_data.value.length ? g_data.value : data.data as MOCK.STOCk
  //   stock.value = g_data.value
  //   initSelect(stock.value)
  //   refresh(stock.value)
  // })
}

function initSelect(stock: MOCK.STOCk) {
  const mapFn = (value: string | number | undefined) => {
    return {
      value: `${value}`,
      label: `${value}`,
    }
  }
  const filterFn = ({ value = '' }) => value
  names.value = all.concat(
    uniqueBy((stock), 'name')
      .map(mapFn).filter(filterFn),
  )
  colors.value = all.concat(
    uniqueBy((stock), 'color')
      .map(mapFn).filter(filterFn),
  )
  areas.value = all.concat(
    uniqueBy((stock), 'area')
      .map(mapFn).filter(filterFn),
  )
  sizes.value = all.concat(
    uniqueBy((stock), 'size')
      .map(mapFn).filter(filterFn),
  )
}

function refresh(stock: MOCK.STOCk) {
  tableData.value = getTreeStock(stock)
}

function onEdit(index: number, row: MOCK.STOCK_TREE_ITEM) {
  onShow('编辑')

  console.log(index, row)
  emitter.emit('onEdit', row)
}

function onDelete(index: number, row: MOCK.STOCk_ITEM) {
  console.log(index, row)
  g_data.value = g_data.value.filter((item) => item.id !== row.id)
  refresh(g_data.value)
}

function onSubmit() {
  stock.value = g_data.value
  const keys = Object.keys(formInline) as FormKey []

  keys.forEach((key) => {
    formInline[key] && (stock.value = stock.value.filter((item) => item[key] === formInline[key]))
  })

  refresh(stock.value)
  isQuery.value = true
}

function onShow(_title = '新增') {
  title.value = _title
  visible.value = true
}

function onClose() {
  visible.value = false
}
</script>

<template>
  <div class="Stock">
    <ElForm inline relative flex :model="formInline">
      <ElFormItem label="厂商" w-50>
        <ElSelect v-model="formInline.name" placeholder="古雲轩">
          <ElOption
            v-for="({ label, value }) in names"
            :key="value"
            :label="label"
            :value="value"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="颜色" w-50>
        <ElSelect v-model="formInline.color" placeholder="红">
          <ElOption
            v-for="({ label, value }) in colors"
            :key="value"
            :label="label"
            :value="value"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="尺码" w-50>
        <ElSelect v-model="formInline.size" placeholder="35">
          <ElOption
            v-for="({ label, value }) in sizes"
            :key="value"
            :label="label"
            :value="value"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="位置" w-50>
        <ElSelect v-model="formInline.area" placeholder="A">
          <ElOption
            v-for="({ label, value }) in areas"
            :key="value"
            :label="label"
            :value="value"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="货号" w-50>
        <ElInput v-model="formInline.id" placeholder="001" />
      </ElFormItem>
      <ElFormItem ml-auto class="!mr-0">
        <ElButton type="primary" @click="onSubmit">
          查询
        </ElButton>
        <ElButton type="primary" @click="onShow('新增')">
          添加
        </ElButton>
      </ElFormItem>
    </ElForm>
    <ElTable :data="tableData" :border="true">
      <ElTableColumn type="expand">
        <template #default="props">
          <div m="4">
            <p m="t-0 b-2">
              货号: {{ props.row.id }}
            </p>
            <p m="t-0 b-2">
              厂商: {{ props.row.name }}
            </p>
            <p m="t-0 b-2">
              价格: {{ props.row.price }}
            </p>
            <h3>数量</h3>
            <ElTable :data="props.row.children" :border="true">
              <ElTableColumn label="颜色">
                <template #default="scope">
                  <i
                    :class="{
                      'bg-red': scope.row.color === '红',
                      'bg-pink': scope.row.color === '粉',
                      'bg-orange': scope.row.color === '橙',
                      'bg-yellow': scope.row.color === '黄',
                      'bg-green': scope.row.color === '绿',
                      'bg-cyan': scope.row.color === '青',
                      'bg-blue': scope.row.color === '蓝',
                      'bg-purple': scope.row.color === '紫',
                      'bg-black': scope.row.color === '黑',
                      'bg-white': scope.row.color === '白',
                      'bg-gray': scope.row.color === '灰',
                    }"
                    i-mdi:shoe-sneaker
                    text-18px
                  ></i>
                  {{ scope.row.color }}
                </template>
              </ElTableColumn>
              <ElTableColumn label="尺码">
                <template #default="scope">
                  {{ scope.row.sizes.sort().join(' ') }}
                </template>
              </ElTableColumn>
            </ElTable>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn label="货号" prop="id" />
      <ElTableColumn label="厂商" prop="name" />
      <ElTableColumn label="价格" prop="price" />
      <ElTableColumn label="位置" prop="area" />
      <ElTableColumn label="时间">
        <template #default="scope">
          {{ moment(scope.row.time).format('YYYY-MM-DD') }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作">
        <template #default="scope">
          <ElButton size="small" @click="onEdit(scope.$index, scope.row)">
            编辑
          </ElButton>
          <ElButton
            size="small"
            type="danger"
            @click="onDelete(scope.$index, scope.row)"
          >
            删除
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    <StockAdd v-model="visible" :title="title" :names="names" :on-close="onClose" />
  </div>
</template>
