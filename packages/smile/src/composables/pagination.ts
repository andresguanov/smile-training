import type { Ref, WritableComputedRef } from 'vue';

export function usePagination(
  limit: Ref<number> | WritableComputedRef<number>,
  selectedPage: Ref<number> | WritableComputedRef<number>,
  total: Ref<number>
) {
  const isAtStart = computedEager(() => selectedPage.value === 1);
  const isAtEnd = computed(() => selectedPage.value * limit.value >= total.value);
  const lastPage = computed(() => Math.ceil(total.value / limit.value));
  const itemsRangeText = computed(() => {
    const min = Math.max(selectedPage.value * limit.value - (limit.value - 1), 1);
    const max = Math.min(selectedPage.value * limit.value, total.value);
    return `${min}-${max}`;
  });
  const currentPage = computed(() => (selectedPage.value < 1 ? 1 : selectedPage.value));

  const validatePage = (value: number) => {
    const lastPageValue = Math.ceil(total.value / limit.value);
    return !isNaN(value) && value > 0 && value <= lastPageValue;
  };
  const changePage = (p: number) => {
    if (1 <= p && p <= lastPage.value) {
      selectedPage.value = p;
    } else {
      selectedPage.value = p > 1 ? lastPage.value : 1;
    }
  };
  const onInputPage = (event: Event) => {
    if ((event as InputEvent).inputType !== 'insertLineBreak') {
      return;
    }
    const target = event.target as HTMLInputElement;
    const page = Number(target?.value);
    if (validatePage(page)) {
      changePage(page);
    } else {
      target.value = currentPage.value.toString();
    }
  };

  return {
    isAtStart,
    isAtEnd,
    lastPage,
    itemsRangeText,
    currentPage,
    changePage,
    onInputPage,
  };
}
