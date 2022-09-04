<route lang="yaml">
meta:
  title: 账本
    </route>

<script lang="ts" setup>
import moment from 'moment'
import { useGlobalStore } from '@/stores/global'
import useAdd from '@/todos/stock/use-add'
import useForm from '@/todos/stock/use-form'
import useTable from '@/todos/account/use-table'

const { g_account, g_stock } = toRefs(useGlobalStore())
const account = ref<MOCK.STOCk>([])
const { visible, title, onShow, onClose } = useAdd(g_account)
const { tableData, currIndex, onEdit, onDelete, refresh } = useTable(g_account, onShow)
const { isQuery, onSave } = useForm(g_account, account, refresh)

const date = ref(new Date())

const totalPrice = computed(() => {
  return account.value.reduce((a, c) => a + Number(c.price), 0)
})

// init
watchEffect(() => {
  if (isQuery.value)
    isQuery.value = false

  else
    init(g_account.value)
})

// method
function init(data: MOCK.STOCk) {
  account.value = data
  refresh(account.value)
}

function onChange(data: Event) {
  isQuery.value = true
  account.value = g_account.value.filter((item) => moment(item.time).format('YYYYMMDD') === moment(data as any as string).format('YYYYMMDD'))
  refresh(account.value)
  console.log('🚀 ~ file: account.vue ~ line 41 ~ onChange ~ data', account.value, tableData)
}

function onSubmit(data: MOCK.STOCk_ITEM, addIndex: number, price: string) {
  if (title.value === '编辑') {
    const index = g_account.value.findIndex((item, index) => index === currIndex.value)
    g_account.value.splice(index, 1, data)
  }
  else if (title.value === '新增' && data) {
    g_stock.value = g_stock.value.filter((item, index) => index !== addIndex)
    g_account.value.push({
      ...data,
      price,
    })
  }
}
</script>

<template>
  <div class="Stock">
    <div flex mb-4 content-center>
      <p font-bold>
        总量: {{ account.length }}双
      </p>
      <p font-bold ml-8>
        总价: {{ totalPrice }}元
      </p>
      <div flex-1></div>
      <ElDatePicker
        v-model="date"
        type="date"
        placeholder="Pick a day"
        @change="onChange"
      />
      <ElButton ml-4 type="primary" @click="onShow('新增')">
        添加
      </ElButton>
      <ElButton type="primary" @click="onSave('account')">
        保存
      </ElButton>
    </div>
    <ElTable :data="tableData" :border="true">
      <ElTableColumn label="货号" prop="id" />
      <ElTableColumn label="厂商" prop="name" />
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
              'bg-gray-2': scope.row.color === '白',
              'bg-gray': scope.row.color === '灰',
            }"
            i-mdi:shoe-sneaker
            text-18px
          ></i>
          {{ scope.row.color }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="尺码" prop="size" />
      <ElTableColumn label="价格" prop="price" />
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
    <AccountAdd v-model="visible" :title="title" :on-close="onClose" @on-submit="onSubmit" />
  </div>
</template>
