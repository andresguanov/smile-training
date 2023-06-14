<template>
  <div class="sm-pagination">
    <div class="sm-pagination-left">
      <button class="sm-pagination-button" :disabled="isAtStart" @click="changePage(1)">
        <img :src="isAtStart ? firstDisabled : first" />
      </button>
      <button class="sm-pagination-button" :disabled="isAtStart" @click="changePage(page - 1)">
        <img :src="isAtStart ? prevDisabled : prev" />
      </button>
      <div class="sm-pagination-vr"></div>
      <div class="sm-pagination-page">
        <label class="sm-pagination-wrapper">
          {{ text?.page }}
          <input
            :value="currentPage"
            :disabled="total <= itemsPerPage"
            class="sm-pagination-input"
            @beforeinput="onInputPage"
          />
        </label>
        <div class="sm-pagination-lastpage">{{ text?.of }} {{ lastPage }}</div>
      </div>
      <div class="sm-pagination-vr"></div>
      <button class="sm-pagination-button" :disabled="isAtEnd" @click="changePage(page + 1)">
        <img :src="isAtEnd ? nextDisabled : next" />
      </button>
      <button class="sm-pagination-button" :disabled="isAtEnd" @click="changePage(lastPage)">
        <img :src="isAtEnd ? lastDisabled : last" />
      </button>
      <div class="sm-pagination-vr" v-if="refresh"></div>
      <button v-if="refresh" class="sm-pagination-button" @click="emit('refresh')">
        <img :src="re" />
      </button>
    </div>
    <div class="sm-pagination-right">
      <p class="sm-pagination-showing">
        {{ `${text?.showing} ${itemsRangeText} ${text?.of} ${total}` }}
      </p>
      <div class="sm-pagination-vr"></div>
      <p class="sm-pagination-results">
        {{ text?.resultsPerPage }}
      </p>
      <sm-select
        v-model="limit"
        :options="selectLimitOptions"
        class="sm-pagination-select"
        size="small"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import last from '../../assets/page-last.png';
import lastDisabled from '../../assets/page-last-disabled.png';
import next from '../../assets/page-next.png';
import nextDisabled from '../../assets/page-next-disabled.png';
import prev from '../../assets/page-prev.png';
import prevDisabled from '../../assets/page-prev-disabled.png';
import first from '../../assets/page-first.png';
import firstDisabled from '../../assets/page-first-disabled.png';
import re from '../../assets/refresh.png';
import { SmSelect } from '../index';
import { usePagination } from '../../composables';
import { smPaginationText } from '../../interfaces/sm-pagination.interface';

const props = withDefaults(
  defineProps<{
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
      resultsPerPage: 'Resultados por página',
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
  (event: 'refresh'): void;
}>();

const limit = useVModel(props, 'itemsPerPage', emit);
const selectedPage = useVModel(props, 'page', emit);
const { isAtEnd, isAtStart, lastPage, currentPage, changePage, itemsRangeText, onInputPage } =
  usePagination(limit, selectedPage, toRef(props, 'total'));

const selectLimitOptions = computed(() => {
  return props.itemLimitOptions.map(v => ({ text: v.toString(), value: v }));
});
</script>

<style lang="scss" scoped>
@import './SmPagination.scss';
</style>
