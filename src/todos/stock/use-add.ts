import type { Ref } from 'vue'
export default function useAdd(g_stock: Ref<MOCK.STOCk>) {
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

  function onSubmit(data: MOCK.STOCk, id: string) {
    if (title.value === '编辑') {
      const index = g_stock.value.findIndex((item) => item.id === id)
      const len = g_stock.value.filter((item) => item.id === id).length
      g_stock.value.splice(index, len, ...data)
    }
    else {
      g_stock.value = g_stock.value.concat(data)
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
