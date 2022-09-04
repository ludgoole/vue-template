import type { Emitter } from 'mitt'
import { useGlobalStore } from '@/stores/global'

export default function useTemplate() {
  interface Prop {
    title: string
  }

  const { g_data } = toRefs(useGlobalStore())
  const emitter = inject('emitter') as Emitter<{ 'global.loading': boolean }>
  const props = withDefaults(defineProps<Prop>(), {
    title: '首页',
  })
  const attrs = useAttrs()
  const emit = defineEmits(['change'])
  const count = ref(0)
  const state = reactive({})

  emit('change', count)
  emitter.emit('global.loading', false)

  return {
    g_data,
    count,
    state,
    props,
    attrs,
  }
}
