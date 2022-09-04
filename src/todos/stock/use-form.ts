import type { Ref } from 'vue'
import useShoe from '/src/todos/common/use-shoe'
import { useGlobalStore } from '@/stores/global'
type FormKey = 'id' | 'name' | 'color' | 'area' | 'size'

export default function useForm() {
  const { uniqueBy } = useShoe()
  const { g_stock } = toRefs(useGlobalStore())
  const form = reactive<Partial<MOCK.STOCk_ITEM>>({
    id: '',
    name: '',
    color: '',
    size: '',
    area: '',
  })

  const names = ref<MOCK.STOCK_SELECT>([])
  const colors = ref<MOCK.STOCK_SELECT>([])
  const areas = ref<MOCK.STOCK_SELECT>([])
  const sizes = ref<MOCK.STOCK_SELECT>([])
  const isQuery = ref(false)

  // method
  function initSelect(stock: MOCK.STOCk) {
    const all = [{ value: '', label: '全部' }]
    const mapFn = (name: string | number | undefined) => ({ value: `${name}`, label: `${name}` })
    names.value = all.concat(uniqueBy((stock), 'name').map(mapFn))
    colors.value = all.concat(uniqueBy((stock), 'color').map(mapFn))
    areas.value = all.concat(uniqueBy((stock), 'area').map(mapFn))
    sizes.value = all.concat(uniqueBy((stock), 'size').map(mapFn))
  }

  function onQuery(stock: Ref<MOCK.STOCk>, refresh: (data: MOCK.STOCk) => void) {
    stock.value = g_stock.value
    const keys = Object.keys(form) as FormKey []

    keys.forEach((key) => {
      form[key] && (stock.value = stock.value.filter((item) => item[key] === form[key]))
    })

    refresh(stock.value)
    isQuery.value = true
  }

  return {
    form,
    isQuery,
    names,
    colors,
    areas,
    sizes,
    initSelect,
    onQuery,
  }
}
