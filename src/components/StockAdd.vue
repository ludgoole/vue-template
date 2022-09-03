<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { Emitter } from 'mitt'
import { useGlobalStore } from '@/stores/global'

type Form = Partial<MOCK.STOCk_BASE_ITEM> & {
  colors: string[]
  sizes: string[]
}
interface Prop {
  names: MOCK.STOCK_SELECT
  onClose: () => void
}

const props = defineProps<Prop>()
const attrs = useAttrs()
// const emit = defineEmits(['input'])

const emitter = inject('emitter') as Emitter<{ 'onEdit': MOCK.STOCK_TREE_ITEM }>
const { g_data } = toRefs(useGlobalStore())
const ruleFormRef = ref<FormInstance>()
const mapFn = (name: string) => {
  return {
    value: name,
    label: name,
  }
}
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
  name: [{ required: true, message: '请选择厂商', trigger: 'blur' }],
  colors: [{ required: true, message: '请选择颜色', trigger: 'blur' }],
  sizes: [{ required: true, message: '请选择尺码', trigger: 'blur' }],
  area: [{ required: true, message: '请选择位置', trigger: 'blur' }],
})
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
      // emit('submit', getAddData())
      if (attrs.title === '编辑') {
        const index = g_data.value.findIndex((item) => item.id === editId.value)
        const len = g_data.value.filter((item) => item.id === editId.value).length
        g_data.value.splice(index, len, ...getAddData())
      }
      else {
        g_data.value.push(...getAddData())
      }

      console.log('submit!', g_data)
      // formEl.resetFields()
      resetFields(null)
      props.onClose()
    }

    else {
      console.log('error submit!', fields)

      if (!form.sizes.length)
        ElMessage('请输入尺码')
      else if (!form.colors.length)
        ElMessage('请输入颜色')
      else
        ElMessage('请输入货号')
    }
  })
}

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

function resetFields(done: any) {
  form.id = ''
  form.price = ''
  form.name = ''
  form.colors = []
  form.sizes = []
  form.area = ''
  done && done()
}

function onCancel(formEl: FormInstance | undefined) {
  if (!formEl) return
  resetFields(null)
  props.onClose()
}
</script>

<template>
  <div class="StockAdd">
    <ElDialog v-bind="$attrs" :close-on-click-modal="false" :before-close="resetFields">
      <ElForm ref="ruleFormRef" :model="form" :rules="rules">
        <ElFormItem label="货号">
          <ElInput v-model="form.id" placeholder="001" />
        </ElFormItem>
        <ElFormItem label="价格">
          <ElInput v-model="form.price" placeholder="55" />
        </ElFormItem>
        <ElFormItem label="厂商">
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
        <ElFormItem label="颜色">
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
        <ElFormItem label="尺码">
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
        <ElFormItem label="位置">
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
