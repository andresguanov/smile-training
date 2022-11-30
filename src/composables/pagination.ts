import type { paginationProps } from '../interfaces/sm-pagination.interface'

export const paginationEmits = ['update:page', 'update:itemsPerPage']

export function usePagination(
  props: paginationProps,
  emit: (event: 'update:page' | 'update:itemsPerPage', ...args: any[]) => void
) {
  const limit = ref(props.itemsPerPage || 10)
  const total = computed(() => props.total || 0)
  function goTo(p: number) {
    if (p <= lastPage.value && p >= 1) {
      emit('update:page', p)
    } else {
      selectedPage.value = p > 1 ? lastPage.value : 1
    }
  }

  watch(limit, () => {
    if (props.page > lastPage.value) {
      emit('update:page', lastPage.value)
    }
    emit('update:itemsPerPage', limit.value)
  })

  const isAtStart = computed(() => props.page === 1)
  const isAtEnd = computed(() => props.page * limit.value >= total.value)
  const lastPage = computed(() => Math.ceil(total.value / limit.value))
  const showingItemsRange = computed(() => [
    Math.max(props.page * limit.value - (limit.value - 1), 1),
    Math.min(props.page * limit.value, total.value),
  ])

  const selectedPage = ref(props.page)

  watch(selectedPage, () => {
    if (props.page > lastPage.value) {
      emit('update:page', lastPage.value)
    }
  })

  watch(props, () => {
    selectedPage.value = props.page
  })

  return {
    isAtStart,
    isAtEnd,
    lastPage,
    showingItemsRange,
    limit,
    goTo,
    selectedPage,
  }
}
