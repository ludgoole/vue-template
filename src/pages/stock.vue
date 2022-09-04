<route lang="yaml">
meta:
  title: 仓库
  </route>

<script lang="ts" setup>
import moment from 'moment'
import { useGlobalStore } from '@/stores/global'
import useForm from '@/todos/stock/use-form'
import useTable from '@/todos/stock/use-table'
import useAdd from '@/todos/stock/use-add'

const { form, isQuery, names, colors, areas, sizes, initSelect, onQuery } = useForm()
const { tableData, onEdit, onDelete, refresh } = useTable()
const { visible, title, onShow, onClose, onSubmit } = useAdd()
const { g_stock } = toRefs(useGlobalStore())
const stock = ref<MOCK.STOCk>([])

// init
watchEffect(() => {
  if (isQuery.value)
    isQuery.value = false

  else
    init(g_stock.value)
})

// method
function init(data: MOCK.STOCk) {
  stock.value = data
  initSelect(stock.value)
  refresh(stock.value)
}

function _onQuery() {
  onQuery(stock, refresh)
}

function _onEdit(index: number, row: MOCK.STOCK_TREE_ITEM) {
  onEdit(index, row, onShow)
}
</script>

<template>
  <div class="Stock">
    <ElForm inline relative flex :model="form">
      <ElFormItem label="厂商" w-50>
        <ElSelect v-model="form.name" placeholder="古雲轩">
          <ElOption
            v-for="({ label, value }) in names"
            :key="value"
            :label="label"
            :value="value"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="颜色" w-50>
        <ElSelect v-model="form.color" placeholder="红">
          <ElOption
            v-for="({ label, value }) in colors"
            :key="value"
            :label="label"
            :value="value"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="尺码" w-50>
        <ElSelect v-model="form.size" placeholder="35">
          <ElOption
            v-for="({ label, value }) in sizes"
            :key="value"
            :label="label"
            :value="value"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="位置" w-50>
        <ElSelect v-model="form.area" placeholder="A">
          <ElOption
            v-for="({ label, value }) in areas"
            :key="value"
            :label="label"
            :value="value"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="货号" w-50>
        <ElInput v-model="form.id" placeholder="001" />
      </ElFormItem>
      <ElFormItem ml-auto class="!mr-0">
        <ElButton type="primary" @click="_onQuery">
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
            <h3>数量: {{ props.row.children.length * props.row.children[0].sizes.length }}</h3>
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
                      'bg-gray-2': scope.row.color === '白',
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
      <ElTableColumn label="数量">
        <template #default="scope">
          {{ scope.row.children.length * scope.row.children[0].sizes.length }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="位置" prop="area" />
      <ElTableColumn label="时间">
        <template #default="scope">
          {{ moment(scope.row.time).format('YYYY-MM-DD') }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作">
        <template #default="scope">
          <ElButton size="small" @click="_onEdit(scope.$index, scope.row)">
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
    <StockAdd v-model="visible" :title="title" :names="names" :on-close="onClose" @onSubmit="onSubmit" />
  </div>
</template>
