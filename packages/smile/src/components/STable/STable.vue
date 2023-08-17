<template>
  <div class="s-table">
    <s-toolbar
      v-if="toolbar"
      :actions="actions"
      :filters="filters"
      :toolbar-texts="toolbarTexts"
      @action="e => emit('toolbarAction', e)"
      @search="v => emit('search', v)"
    >
      <template #actions>
        <slot name="actions" />
      </template>
      <template #filters>
        <slot name="filters" />
      </template>
      <template #rightContent>
        <slot name="toolbarRightContent" />
      </template>
    </s-toolbar>
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
                size="small"
                class="s-table__head__sort"
                :class="{ active: col.name == sortColumn }"
                :icon="sortIcon"
              />
            </slot>
            <span class="s-table__head__divider" />
          </th>
          <th
            v-if="hasActionsColumn"
            class="sm-table-container-th"
            :style="{ width: actionsColWidth }"
          >
            <slot name="actionsHead">{{ DEFAULT_ACTIONS_TEXT }}</slot>
          </th>
        </tr>
      </thead>
      <tbody class="s-table__body">
        <tr
          v-for="(row, i) in tableData"
          :key="'smTableTr-' + i"
          class="s-table__row"
          :class="{ hoverable }"
        >
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
import type { smPaginationText } from '../../interfaces/sm-pagination.interface';
import type {
  smTableColumn,
  smTableChangeEvent,
  ToolbarAction,
  ToolbarFilter,
} from '../../interfaces/sm-table.interface';
// import { useFilters } from '../../composables';

const props = withDefaults(
  defineProps<{
    rows?: Array<any>;
    hoverable?: boolean;
    total?: number;
    initialPage?: number;
    initialItemsPerPage?: number;
    initialOrder?: 'ASC' | 'DESC';
    columnConfig?: Array<smTableColumn>;
    itemsPerPageOptions?: Array<number>;
    textPagination?: smPaginationText;

    /**
     * Indica si la paginación de la tabla mostrará otros datos como
     * el selector de cantidad a mostrar, página actual, etc.
     */
    paginationFullMode?: boolean;
    actionsColWidth?: string;
    /**
     * Indica si la tabla presenta o no un toolbar
     */
    toolbar?: boolean;
    toolbarTexts?: {
      filter: string;
      by: string;
      removeFilters: string;
      searchPlaceholder?: string;
    };
    /**
     * Acciones secundarias para el toolbar,
     * cada una emite un evento `action` el cual devuelve
     * la propiedad name como parámetro.
     */
    actions?: ToolbarAction[];
    filters?: ToolbarFilter[];
  }>(),
  {
    toolbar: true,
    hoverable: true,
    rows: (): Array<any> => [],
    columnConfig: (): Array<smTableColumn> => [],
    filterConfig: () => ({}),
    initialPage: 1,
    initialItemsPerPage: 10,
  }
);
const slots = useSlots();
const emit = defineEmits<{
  (e: 'refresh' | 'change' | 'filter', data: smTableChangeEvent): void;
  (e: 'update:page', data: number): void;
  (e: 'update:itemsPerPage', data: number): void;
  (e: 'toolbarAction', value: string): void;
  (e: 'search', value: string): void;
}>();

const DEFAULT_ACTIONS_TEXT = 'Acciones';
const internalPage = ref(props.initialPage);
const internalItemsPerPage = ref(props.initialItemsPerPage);

const sortColumn = ref('');
const internarlOrder = ref<'ASC' | 'DESC' | undefined>(props.initialOrder);
const hasActionsColumn = computedEager(
  () => slots['actionsCol'] && typeof slots['actionsCol'] === 'function'
);
const internalTotal = computed(() =>
  props.total ? props.total : props.rows.length ? props.rows.length : 1
);
const sortIcon = computed(() =>
  internarlOrder.value
    ? internarlOrder.value === 'DESC'
      ? 'arrow-down'
      : 'arrow-up'
    : 'arrows-sort'
);

// const { filterValues } = useFilters(props.columnConfig, props.filterConfig);

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
  emit(event, {
    start,
    to: start + itemsPerPage,
    limit: itemsPerPage,
    order_field: sortColumn.value,
    order_direction: internarlOrder.value || '',
    filters: {},
    // filters: { ...filterValues.value },
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
    internarlOrder.value = props.initialOrder || 'ASC';
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
