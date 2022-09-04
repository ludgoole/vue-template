import type { Emitter } from 'mitt'
import { useGlobalStore } from '@/stores/global'
import useShoe from '/src/todos/common/use-shoe'

export default function useTable() {
  const { g_data } = toRefs(useGlobalStore())
  const { getTreeStock } = useShoe()

  const emitter = inject('emitter') as Emitter<{ 'onEdit': MOCK.STOCK_TREE_ITEM }>
  const tableData = ref<MOCK.STOCK_TREE>([])

  // method
  function onEdit(index: number, row: MOCK.STOCK_TREE_ITEM, onShow: (title: string) => void) {
    onShow('编辑')

    console.log(index, row)
    emitter.emit('onEdit', row)
  }

  function onDelete(index: number, row: MOCK.STOCk_ITEM) {
    console.log(index, row)
    g_data.value = g_data.value.filter((item) => item.id !== row.id)
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
