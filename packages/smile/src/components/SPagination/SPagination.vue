<template>
  <div class="s-pagination" :class="{ extended: fullMode }">
    <div v-if="fullMode" class="s-pagination__left">
      <p>{{ text.resultsPerPage }}:</p>
      <select class="s-pagination__select">
        <option v-for="option in itemLimitOptions" :value="option">{{ option }}</option>
      </select>
      <div class="s-pagination__divider" />
      <p class="s-pagination__total">{{ itemsRangeText }} {{ text.of }} {{ total }}</p>
    </div>
    <div class="s-pagination__right">
      <div v-if="fullMode" class="s-pagination__pages">
        <p>{{ text?.page }}</p>
        <input
          :value="currentPage"
          :disabled="total <= itemsPerPage"
          class="s-pagination__pages__input"
          @beforeinput="onInputPage"
        />
        <p>{{ text?.of }} {{ lastPage }}</p>
      </div>
      <p v-else>{{ itemsRangeText }} {{ text.of }} {{ total }}</p>
      <div class="s-pagination__buttons">
        <s-button
          only-icon="arrow-left"
          emphasis="text"
          size="small"
          :disabled="isAtStart"
          @click="changePage(page + 1)"
        />
        <s-button
          only-icon="arrow-right"
          emphasis="text"
          size="small"
          :disabled="isAtEnd"
          @click="changePage(page - 1)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePagination } from '~/composables';
import { smPaginationText } from '~/interfaces';

const props = withDefaults(
  defineProps<{
    fullMode?: boolean;
    page?: number;
    itemsPerPage?: number;
    total?: number;
    text?: smPaginationText;
    itemLimitOptions?: Array<number>;
    refresh?: boolean;
  }>(),
  {
    text: () => ({
      page: 'Página',
      of: 'de',
      showing: 'Mostrando',
      resultsPerPage: 'Ítems por página',
    }),
    itemsPerPage: 10,
    itemLimitOptions: () => [10, 20, 30],
    total: 1,
    page: 1,
    refresh: true,
  }
);
const emit = defineEmits<{
  (event: 'update:itemsPerPage', value: number): void;
  (event: 'update:page', value: number): void;
}>();

const limit = useVModel(props, 'itemsPerPage', emit);
const selectedPage = useVModel(props, 'page', emit);
const { isAtEnd, isAtStart, lastPage, currentPage, changePage, itemsRangeText, onInputPage } =
  usePagination(limit, selectedPage, toRef(props, 'total'));

// const selectLimitOptions = computed(() => {
//   return props.itemLimitOptions.map(v => ({ text: v.toString(), value: v }));
// });
</script>

<style scoped lang="scss" src="./SPagination.scss" />
