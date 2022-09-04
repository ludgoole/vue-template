<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { Emitter } from 'mitt'

type Form = Partial<MOCK.STOCk_BASE_ITEM> & {
  colors: string[]
  sizes: string[]
}
interface Prop {
  names: MOCK.STOCK_SELECT
  onClose: () => void
}

const props = defineProps<Prop>()
const emit = defineEmits(['on-submit'])
const emitter = inject('emitter') as Emitter<{ 'onEdit': MOCK.STOCK_TREE_ITEM }>
const ruleFormRef = ref<FormInstance>()

const form = reactive<Form>({
  id: '',
  price: '',
  name: '',
  colors: [],
  sizes: [],
  area: '',
})
const rules = reactive<FormRules>({
  id: [{ required: true, message: '请输入货号', trigger: 'blur' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
  name: [{ required: true, message: '请选择厂商', trigger: 'blur' }],
  colors: [{ required: true, message: '请选择颜色', trigger: 'blur' }],
  sizes: [{ required: true, message: '请选择尺码', trigger: 'blur' }],
  area: [{ required: true, message: '请选择位置', trigger: 'blur' }],
})
const mapFn = (name: string) => ({ value: name, label: name })
const names = computed(() => toRefs(props).names.value.filter((name) => name.value))
const colors = ref(['红', '粉', '橙', '黄', '绿', '青', '蓝', '紫', '黑', '白', '灰'].map(mapFn))
const sizes = ref(['33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'].map(mapFn))
const areas = ref(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map(mapFn))
const editId = ref('')

// init
emitter.on('onEdit', (row) => {
  form.id = row.id
  form.price = row.price
  form.name = row.name
  form.colors = row.children.map((child) => child.color)
  form.sizes = row.children.reduce((a: string[], child) => [...new Set(a.concat(child.sizes))].sort(), [])
  form.area = row.area

  editId.value = row.id
})

// method
async function onSubmit(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid && form.id && form.colors.length && form.sizes.length) {
      emit('on-submit', getAddData(), editId.value)
      formEl.resetFields()
      props.onClose()
      ElMessage.success('提交成功')
    }

    else {
      console.log('error submit!', fields)
    }
  })

  function getAddData() {
    const addData: MOCK.STOCk = []
    const { colors, sizes, id = '', price = '', name = '', area = '' } = form
    colors.forEach((color) => {
      sizes.forEach((size) => {
        addData.push({
          id,
          price: price || '--',
          name: name || '--',
          area: area || '--',
          color,
          size,
          time: Date.now(),
        })
      })
    })

    return addData
  }
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
          <ElInput v-model="form.id" placeholder="001" />
        </ElFormItem>
        <ElFormItem label="价格" prop="price">
          <ElInput v-model="form.price" placeholder="55" />
        </ElFormItem>
        <ElFormItem label="厂商" prop="name">
          <ElSelect
            v-model="form.name"
            filterable
            allow-create
            placeholder="古雲轩"
          >
            <ElOption
              v-for="({ label, value }) in names"
              :key="value"
              :label="label"
              :value="value"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="颜色" prop="colors">
          <ElSelect
            v-model="form.colors"
            multiple
            filterable
            allow-create
            placeholder="红 粉"
          >
            <ElOption
              v-for="({ label, value }) in colors"
              :key="value"
              :label="label"
              :value="value"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="尺码" prop="sizes">
          <ElSelect
            v-model="form.sizes"
            multiple
            filterable
            allow-create
            placeholder="35 36 37"
          >
            <ElOption
              v-for="({ label, value }) in sizes"
              :key="value"
              :label="label"
              :value="value"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="位置" prop="area">
          <ElSelect
            v-model="form.area"
            filterable
            allow-create
            placeholder="A"
          >
            <ElOption
              v-for="({ label, value }) in areas"
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
