import type { Ref } from 'vue'
import type { Emitter } from 'mitt'
import useShoe from '/src/todos/common/use-shoe'

export default function useTable(g_stock: Ref<MOCK.STOCk>, onShow: (title: string) => void) {
  const { getTreeStock } = useShoe()

  const emitter = inject('emitter') as Emitter<{ 'onEdit': MOCK.STOCK_TREE_ITEM }>
  const tableData = ref<MOCK.STOCK_TREE>([])

  // method
  function onEdit(index: number, row: MOCK.STOCK_TREE_ITEM) {
    onShow('编辑')

    console.log(index, row)
    emitter.emit('onEdit', row)
  }

  function onDelete(index: number, row: MOCK.STOCk_ITEM) {
    console.log(index, row)
    g_stock.value = g_stock.value.filter((item) => item.id !== row.id)
  }

  function refresh(data: MOCK.STOCk) {
    tableData.value = getTreeStock(data)
  }

  return {
    tableData,
    onEdit,
    onDelete,
    refresh,
  }
}
