<template>
  <div class="sm-table">
    <slot name="aboveFilterButtons" />
    <div v-if="hasFilterableData" class="sm-table-filter-buttons">
      <sm-button size="small" @click="onFilter">
        {{ filterBtnText }}
      </sm-button>
      <sm-button v-if="showFilters" size="small" style="margin-left: 5px" @click="onHideFilter">
        {{ closeFilterBtnText }}
      </sm-button>
    </div>
    <slot name="belowFilterButtons" />
    <sm-markup-table
      :hoverable="hoverable"
      :is-fixed="isFixed"
      :class="{ 'sm-table-fixed': isFixed }"
    >
      <thead class="sm-table-container-thead">
        <tr v-if="hasFilterableData" :class="['sm-table-filter', { open: showFilters }]">
          <th
            v-for="(filter, i) in filterAttrs"
            class="sm-table-container-th filterable"
            :key="'smFilterTh' + i"
            :style="{ width: filter.width }"
          >
            <component
              v-if="filter.show"
              :is="filter.component"
              v-model="filterValues[filter.name]"
              v-bind="filter.attrs"
              size="small"
              @keyup.enter="onFilter"
            />
          </th>
          <th
            v-if="hasActionsColumn && !filterConfig.actionsCol"
            class="sm-table-container-th filterable"
            :style="{ width: actionsColWidth }"
          />
        </tr>
        <tr>
          <th
            v-for="(col, i) in columnConfig"
            :key="'smTableTh' + i"
            :class="[
              'sm-table-container-th',
              col.headerAlign,
              col.headerClass,
              { sortable: col.order },
            ]"
            :header-name="col.name"
            :style="{ width: col.width }"
          >
            <slot :name="(('head.' + col.name) as string)" :col="col">
              <sm-icon
                v-if="col.name == sortColumn"
                :class="{ desc: !ascending }"
                icon="caret-up"
                size="small"
              />
              <span v-if="col.order" @click="onSort(col.name)">
                {{ columnNames[i] }}
              </span>
              <span v-else>
                {{ columnNames[i] }}
              </span>
            </slot>
          </th>
          <th
            v-if="hasActionsColumn"
            class="sm-table-container-th"
            :style="{ width: actionsColWidth }"
          >
            <slot name="actionsHeader">
              {{ actionsColHeadText }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in tableData" :key="'smTableTr-' + i" class="sm-table-container-tr">
          <slot name="bodyRow" :columns="columnConfig" :row="row" :rowIndex="i">
            <td
              v-for="(col, j) in columnConfig"
              :key="`smTableTd-${i}-${j}`"
              :class="['sm-table-container-td', col.bodyAlign, col.bodyClass]"
              :data-name="col.name"
            >
              <slot
                :name="(('bodyRow.' + col.name) as string)"
                :row-index="i"
                :col-index="j"
                :col="col"
                :row="row"
              >
                {{ row[col.name] }}
              </slot>
            </td>
          </slot>
          <td v-if="hasActionsColumn" class="sm-table-container-td">
            <slot name="actionsCol" :row="row" />
          </td>
        </tr>
      </tbody>
    </sm-markup-table>
    <slot name="empty" v-if="!tableData.length">
      <div class="sm-table-empty">
        {{ noContentText }}
      </div>
    </slot>
    <slot name="pagination">
      <sm-pagination
        :page="internalPage"
        :items-per-page="internalItemsPerPage"
        :total="internalTotal"
        :item-limit-options="itemsPerPageOptions"
        :text="textPagination"
        class="sm-table-pagination"
        @refresh="onRefresh"
        @update:page="onUpdatePage"
        @update:items-per-page="onUpdateItemsPerPage"
      />
    </slot>
    <div v-if="loading" class="sm-table-loading">
      <sm-inner-loading :loading-text="loadingText" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SmPagination, SmInnerLoading, SmMarkupTable } from '../index';
import { useSlots } from 'vue';
import { smPaginationText } from '../../interfaces/sm-pagination.interface';
import {
  smTableColumn,
  smTableFilter,
  smTableChangeEvent,
} from '../../interfaces/sm-table.interface';
import { useFilters } from '../../composables';

const props = withDefaults(
  defineProps<{
    rows?: Array<any>;
    hoverable?: boolean;
    total?: number;
    page?: number;
    itemsPerPage?: number;
    itemsPerPageOptions?: Array<number>;
    columnConfig?: Array<smTableColumn>;
    loading?: boolean;
    loadingText?: string;
    noContentText?: string;
    textPagination?: smPaginationText;
    actionsColHeadText?: string;
    actionsColWidth?: string;
    filterConfig?: { [key: string]: smTableFilter };
    filterBtnText?: string;
    closeFilterBtnText?: string;
    isFixed?: boolean;
    initialOrder?: 'ASC' | 'DESC';
    initialSortColumn?: string;
  }>(),
  {
    hoverable: true,
    rows: (): Array<any> => [],
    columnConfig: (): Array<smTableColumn> => [],
    filterConfig: () => ({}),
    loading: false,
    page: 1,
    itemsPerPage: 10,
    loadingText: 'Cargando',
    noContentText: 'No hay contenido disponible',
    actionsColHeadText: 'Acciones',
    filterBtnText: 'Filtrar',
    closeFilterBtnText: 'Cerrar',
    initialOrder: 'ASC',
  }
);

const slots = useSlots();
const emit = defineEmits<{
  (e: 'refresh' | 'change' | 'filter', data: smTableChangeEvent): void;
  (e: 'update:page', data: number): void;
  (e: 'update:itemsPerPage', data: number): void;
}>();

const sortColumn = ref(props.initialSortColumn || '');
const ascending = ref(props.initialOrder === 'ASC');
const internalPage = ref(props.page);
const internalItemsPerPage = ref(props.itemsPerPage);
const internalTotal = computed(() =>
  props.total ? props.total : props.rows.length ? props.rows.length : 1
);
const hasActionsColumn = computed(
  () => slots['actionsCol'] && typeof slots['actionsCol'] === 'function'
);

const { hasFilterableData, filterAttrs, filterValues, showFilters, resetValues, filtersAreFalsy } =
  useFilters(props.columnConfig, props.filterConfig);

const tableData = computed((): Array<any> => {
  if (props.rows.length > internalItemsPerPage.value) {
    return [...props.rows].slice(0, internalItemsPerPage.value);
  }
  return [...props.rows];
});
const columnNames = computed((): Array<string> => {
  return props.columnConfig.map(col => {
    const finalLabel = col.label ? col.label : col.name;
    if (col.format) {
      return col.format(finalLabel);
    }
    if (col.firstToUpper) {
      return finalLabel.charAt(0).toUpperCase() + finalLabel.slice(1);
    }
    return finalLabel;
  });
});

const onEvent = (event: 'refresh' | 'change' | 'filter', itemsPerPage: number) => {
  const start = (internalPage.value - 1) * itemsPerPage;
  const order_field = sortColumn.value;
  const order_direction = ascending.value ? 'ASC' : 'DESC';
  emit(event, {
    start,
    to: start + itemsPerPage,
    limit: itemsPerPage,
    order_field,
    order_direction,
    filters: { ...filterValues.value },
  });
};
const onUpdatePage = (page: number) => {
  internalPage.value = page;
  onEvent('change', internalItemsPerPage.value);
};
const onUpdateItemsPerPage = (itemsPerPage: number) => {
  if (itemsPerPage !== internalItemsPerPage.value) {
    internalPage.value = 1;
    internalItemsPerPage.value = itemsPerPage;
    onEvent('change', itemsPerPage);
  }
};
const onFilter = () => {
  if (showFilters.value) {
    internalPage.value = 1;
    onEvent('filter', internalItemsPerPage.value);
  } else {
    showFilters.value = true;
  }
};
const onHideFilter = () => {
  showFilters.value = false;
  if (!filtersAreFalsy.value) {
    resetValues();
    onUpdatePage(1);
  }
};
const onSort = (col: string) => {
  if (sortColumn.value === col) {
    ascending.value = !ascending.value;
  } else {
    sortColumn.value = col;
    ascending.value = props.initialOrder === 'ASC';
  }
  onUpdatePage(1);
};
const onRefresh = () => {
  onEvent('refresh', internalItemsPerPage.value);
};

defineExpose({
  onUpdateItemsPerPage,
  onUpdatePage,
  onRefresh,
});
</script>

<style scoped lang="scss" src="./SmTable.scss" />
