import type { paginationProps } from '../interfaces/sm-pagination.interface';

export const paginationEmits = ['update:page', 'update:itemsPerPage'];

export function usePagination(
  props: paginationProps,
  emit: (event: 'update:page' | 'update:itemsPerPage', ...args: any[]) => void
) {
  // const limit = ref(props.itemsPerPage || 10)
  // const selectedPage = ref(props.page)
  const limit = useVModel(props, 'itemsPerPage', emit);
  const selectedPage = useVModel(props, 'page', emit);

  const total = computed(() => props.total || 0);
  const isAtStart = computed(() => selectedPage.value === 1);
  const isAtEnd = computed(() => selectedPage.value * limit.value >= total.value);
  const lastPage = computed(() => Math.ceil(total.value / limit.value));
  const showingItemsRange = computed(() => [
    Math.max(selectedPage.value * limit.value - (limit.value - 1), 1),
    Math.min(selectedPage.value * limit.value, total.value),
  ]);
  const currentPage = computed(() => (selectedPage.value < 1 ? 1 : selectedPage.value));

  const goTo = (p: number) => {
    if (1 <= p && p <= lastPage.value) {
      selectedPage.value = p;
      // emit('update:page', p)
    } else {
      selectedPage.value = p > 1 ? lastPage.value : 1;
    }
  };

  // watch(selectedPage, () => {
  //   if (props.page > lastPage.value) {
  //     emit('update:page', lastPage.value)
  //   }
  // })

  // watch(limit, () => {
  //   if (props.page > lastPage.value) {
  //     emit('update:page', lastPage.value)
  //   }
  //   emit('update:itemsPerPage', limit.value)
  // })

  // watch(props, () => {
  //   selectedPage.value = props.page
  // })

  return {
    isAtStart,
    isAtEnd,
    lastPage,
    showingItemsRange,
    limit,
    goTo,
    selectedPage,
    currentPage,
  };
}
