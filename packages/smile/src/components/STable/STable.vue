<template>
  <div class="s-table">
    <div v-if="toolbar" class="s-table__toolbar"></div>
    <table class="s-table__wrapper">
      <thead class="s-table__head">
        <tr class="s-table__row">
          <th
            v-for="(col, i) in columnConfig"
            :key="'smTableTh' + i"
            :class="['s-table__head__cell', col.headerAlign, { sortable: col.order }]"
            :header-name="col.name"
            :style="{ width: col.width }"
            @click="onSort(col.name, col.order)"
          >
            <slot :name="'headerCell(' + col.name + ')'" :col="col">
              {{ columnNames[i] }}
              <sm-icon
                v-if="col.name == sortColumn"
                :icon="internarlOrder === 'DESC' ? 'arrow-down' : 'arrow-up'"
                size="small"
              />
            </slot>
            <span class="s-table__head__divider" />
          </th>
          <th
            v-if="hasActionsColumn"
            class="sm-table-container-th"
            :style="{ width: actionsColWidth }"
          >
            {{ actionsColHeadText }}
          </th>
        </tr>
      </thead>
      <tbody class="s-table__body">
        <tr v-for="(row, i) in tableData" :key="'smTableTr-' + i" class="s-table__row">
          <td
            v-for="(col, j) in columnConfig"
            :key="`smTableTd-${i}-${j}`"
            :class="['s-table__body__cell', col.bodyAlign, col.bodyClass]"
            :data-name="col.name"
          >
            <slot
              :name="'rowCell(' + col.name + ')'"
              :row-index="i"
              :col-index="j"
              :col="col"
              :row="row"
            >
              {{ row[col.name] }}
            </slot>
          </td>
          <td v-if="hasActionsColumn" class="sm-table-container-td">
            <slot name="actionsCol" :row="row" />
          </td>
        </tr>
      </tbody>
    </table>
    <s-pagination
      :page="internalPage"
      :items-per-page="internalItemsPerPage"
      :total="internalTotal"
      :item-limit-options="itemsPerPageOptions"
      :text="textPagination"
      :full-mode="paginationFullMode"
      class="sm-table-pagination"
      @refresh="onRefresh"
      @update:page="onUpdatePage"
      @update:itemsPerPage="onUpdateItemsPerPage"
    />
  </div>
</template>

<script lang="ts" setup>
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
    paginationFullMode?: boolean;
    toolbar?: boolean;
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

const sortColumn = ref('');
const internarlOrder = ref<'ASC' | 'DESC'>(props.initialOrder);
const internalPage = ref(props.page);
const internalItemsPerPage = ref(props.itemsPerPage);
const hasActionsColumn = computed(
  () => slots['actionsCol'] && typeof slots['actionsCol'] === 'function'
);
const internalTotal = computed(() =>
  props.total ? props.total : props.rows.length ? props.rows.length : 1
);

const { filterValues } = useFilters(props.columnConfig, props.filterConfig);

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
  const order_direction = internarlOrder.value;
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
  internalPage.value = 1;
  internalItemsPerPage.value = itemsPerPage;
  onEvent('change', itemsPerPage);
};
const onSort = (col: string, canSorter?: boolean) => {
  if (!canSorter) return;
  if (sortColumn.value === col) {
    internarlOrder.value = internarlOrder.value === 'ASC' ? 'DESC' : 'ASC';
  } else {
    sortColumn.value = col;
    internarlOrder.value = props.initialOrder;
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

<style scoped lang="scss" src="./STable.scss" />
