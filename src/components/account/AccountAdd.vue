<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { Emitter } from 'mitt'
import { ElMessage } from 'element-plus'
import { useGlobalStore } from '@/stores/global'
import useShoe from '/src/todos/common/use-shoe'

type Form = Partial<MOCK.STOCk_ITEM>
interface Prop {
  onClose: () => void
}

const props = defineProps<Prop>()
const emit = defineEmits(['on-submit'])
const { uniqueBy, pickBy } = useShoe()
const { g_stock } = toRefs(useGlobalStore())
const emitter = inject('emitter') as Emitter<{ 'onEdit': (MOCK.STOCK_TREE_ITEM & MOCK.STOCk_ITEM) }>
const ruleFormRef = ref<FormInstance>()

const form = reactive<Form>({
  id: '',
  price: '',
  color: '',
  size: '',
})
const rules = reactive<FormRules>({
  id: [{ required: true, message: '请输入货号', trigger: 'blur' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
  color: [{ required: true, message: '请选择颜色', trigger: 'blur' }],
  size: [{ required: true, message: '请选择尺码', trigger: 'blur' }],
})
const mapFn = (name: string) => ({ value: name, label: name })
const ids = ref(['001', '002', '110', '111'].map(mapFn))
const colors = ref(['红', '粉', '橙', '黄', '绿', '青', '蓝', '紫', '黑', '白', '灰'].map(mapFn))
const sizes = ref(['33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'].map(mapFn))

// init
emitter.on('onEdit', (row) => {
  form.id = row.id
  form.price = row.price
  form.color = row.color
  form.size = row.size
})

watchEffect(() => {
  const mapFn = (name: string | number | undefined) => ({ value: `${name}`, label: `${name}` })
  ids.value = uniqueBy((g_stock.value), 'id').map(mapFn)
  form.price = g_stock.value.find((item) => item.id === form.id)?.price || ''
  colors.value = pickBy((g_stock.value.filter((item) => item.id === form.id)), 'color').map((v) => v.color).map(mapFn)
  sizes.value = pickBy(
    (g_stock.value.filter((item) => item.id === form.id).filter((item) => item.color === form.color)),
    'size',
  ).map((v) => v.size).map(mapFn)
})

// method
async function onSubmit(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    const { id, color, size } = form
    const adddata = g_stock.value.find((item) => [item.id, item.color, item.size].join() === [id, color, size].join())
    if (valid && adddata) {
      const addIndex = g_stock.value.findIndex((item) => [item.id, item.color, item.size].join() === [id, color, size].join())
      emit('on-submit', adddata, addIndex, form.price)
      formEl.resetFields()
      props.onClose()
      ElMessage.success('提交成功')
    }
    else {
      console.log('提交失败', fields)
      ElMessage.error('提交失败')
    }
  })
}

function onBeforeClose(formEl: FormInstance | undefined, done: () => void) {
  if (!formEl) return
  formEl.resetFields()
  done()
}

function onCancel(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.resetFields()
  props.onClose()
}
</script>

<template>
  <div class="StockAdd">
    <ElDialog v-bind="$attrs" :close-on-click-modal="false" :before-close="(done) => onBeforeClose(ruleFormRef, done)">
      <ElForm ref="ruleFormRef" :model="form" :rules="rules">
        <ElFormItem label="货号" prop="id">
          <ElSelect
            v-model="form.id"
            filterable
            allow-create
            placeholder="001"
          >
            <ElOption
              v-for="({ label, value }) in ids"
              :key="value"
              :label="label"
              :value="value"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="价格" prop="price">
          <ElInput v-model="form.price" placeholder="55" />
        </ElFormItem>
        <ElFormItem label="颜色" prop="color">
          <ElSelect
            v-model="form.color"
            filterable
            allow-create
            placeholder="红"
          >
            <ElOption
              v-for="({ label, value }) in colors"
              :key="value"
              :label="label"
              :value="value"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="尺码" prop="size">
          <ElSelect
            v-model="form.size"
            filterable
            allow-create
            placeholder="35"
          >
            <ElOption
              v-for="({ label, value }) in sizes"
              :key="value"
              :label="label"
              :value="value"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem class="!mb-0">
          <div flex="~ 1" justify-end>
            <ElButton type="primary" @click="onCancel(ruleFormRef)">
              取消
            </ElButton>
            <ElButton type="primary" @click="onSubmit(ruleFormRef)">
              提交
            </ElButton>
          </div>
        </ElFormItem>
      </ElForm>
    </ElDialog>
  </div>
</template>

<style>
.StockAdd .el-select {
  width: 100%;
}
</style>
