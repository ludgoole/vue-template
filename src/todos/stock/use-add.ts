import { useGlobalStore } from '@/stores/global'

export default function useAdd() {
  const { g_data } = toRefs(useGlobalStore())
  const visible = ref(false)
  const title = ref('添加')

  // method
  function onShow(_title = '新增') {
    title.value = _title
    visible.value = true
  }

  function onClose() {
    visible.value = false
  }

  function onSubmit(data: MOCK.STOCk, editId: string) {
    if (title.value === '编辑') {
      const index = g_data.value.findIndex((item) => item.id === editId)
      const len = g_data.value.filter((item) => item.id === editId).length
      g_data.value.splice(index, len, ...data)
    }
    else {
      g_data.value.push(...data)
    }
  }

  return {
    visible,
    title,
    onShow,
    onClose,
    onSubmit,
  }
}
