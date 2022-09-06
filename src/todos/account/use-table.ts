import type { Ref } from 'vue'
import type { Emitter } from 'mitt'

export default function useTable(g_account: Ref<MOCK.STOCk>, g_stock: Ref<MOCK.STOCk>, onShow: (title: string) => void) {
  const emitter = inject('emitter') as Emitter<{ 'onEdit': MOCK.STOCk_ITEM }>
  const tableData = ref<MOCK.STOCk>([])
  const currIndex = ref(0)

  // method
  function onEdit(index: number, row: MOCK.STOCk_ITEM) {
    onShow('编辑')

    currIndex.value = index
    emitter.emit('onEdit', row)
  }

  function onDelete(index: number) {
    const delData = g_account.value.filter((item, i) => i === index)
    g_account.value = g_account.value.filter((item, i) => i !== index)

    g_stock.value = g_stock.value.concat(delData)
  }

  function refresh(data: MOCK.STOCk) {
    tableData.value = data
  }

  return {
    tableData,
    currIndex,
    onEdit,
    onDelete,
    refresh,
  }
}
