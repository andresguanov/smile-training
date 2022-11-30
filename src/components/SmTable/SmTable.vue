<template>
  <div class="sm-table">
    <div v-if="hasFilterableData" class="sm-table-filter-buttons">
      <sm-button size="small" @click="onFilter">
        {{ filterBtnText }}
      </sm-button>
      <sm-button v-if="showFilters" size="small" style="margin-left: 5px" @click="onHideFilter">
        {{ closeFilterBtnText }}
      </sm-button>
    </div>
    <sm-markup-table :hoverable="hoverable">
      <thead class="sm-table-container-thead">
        <tr v-if="hasFilterableData" :class="['sm-table-filter', { open: showFilters }]">
          <th
            v-for="(filter, i) in filterAttrs"
            class="sm-table-container-th filterable"
            :key="'smFilterTh' + i"
          >
            <component
              v-if="filter.show"
              :is="filter.component"
              v-model="filterValues[filter.name]"
              size="small"
              v-bind="filter.attrs"
            />
          </th>
          <th
            v-if="hasSlot('actionsCol') && !filterConfig.actionsCol"
            class="sm-table-container-th filterable"
          ></th>
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
            :data-name="col.name"
            :style="{ width: col.width }"
          >
            <template v-if="col.name == sortColumn">
              <sm-icon :class="{ asc: ascending }" icon="caret-up" size="small" />
            </template>
            <span v-if="col.order" @click="sortTable(col.name)">
              {{ columnNames[i] }}
            </span>
            <span v-else>
              {{ columnNames[i] }}
            </span>
          </th>
          <th v-if="hasSlot('actionsCol')" class="sm-table-container-th">
            {{ actionsColHeadText }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in tableData" :key="'smTableTr-' + i">
          <slot name="bodyRow" :columns="columnConfig" :row="row" :rowIndex="i">
            <td
              v-for="(col, j) in columnConfig"
              :key="`smTableTd-${i}-${j}`"
              :class="['sm-table-container-td', col.bodyAlign, col.bodyClass]"
              :data-name="col.name"
            >
              <slot
                :name="(('bodyRow.' + col.name) as string)"
                :row="row"
                :rowIndex="i"
                :colIndex="j"
              >
                {{ row[col.name] }}
              </slot>
            </td>
          </slot>
          <td v-if="hasSlot('actionsCol')" class="sm-table-container-td">
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
        :total="internalTotal"
        :items-per-page="itemsPerPage"
        :item-limit-options="itemsPerPageOptions"
        :text="textPagination"
        class="sm-table-pagination"
        @refresh="handleEvent('refresh', itemsPerPage)"
        @update:page="onUpdatePage"
        @update:itemsPerPage="onUpdateItemsPerPage"
      />
    </slot>
    <div v-if="loading" class="sm-table-loading">
      <sm-inner-loading :loading-text="loadingText" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SmPagination, SmInnerLoading, SmMarkupTable } from '../index'
import { useSlots } from 'vue'
import { smPaginationText } from '../../interfaces/sm-pagination.interface'
import {
  smTableColumn,
  smTableFilter,
  smTableChangeEvent,
} from '../../interfaces/sm-table.interface'
import { useFilters } from '../../composables'

const props = withDefaults(
  defineProps<{
    rows?: Array<any>
    hoverable?: boolean
    total?: number
    page?: number
    itemsPerPage?: number
    itemsPerPageOptions?: Array<number>
    columnConfig?: Array<smTableColumn>
    loading?: boolean
    loadingText?: string
    noContentText?: string
    textPagination?: smPaginationText
    actionsColHeadText?: string
    filterConfig?: { [key: string]: smTableFilter }
    filterBtnText?: string
    closeFilterBtnText?: string
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
  }
)

const slots = useSlots()
const emit = defineEmits<{
  (e: 'refresh' | 'change' | 'filter', data: smTableChangeEvent): void
}>()

const sortColumn = ref('')
const ascending = ref(true)
const internalPage = ref(props.page)
const internalTotal = computed(() =>
  props.total ? props.total : props.rows.length ? props.rows.length : 1
)

const { hasFilterableData, filterAttrs, filterValues, showFilters, resetValues } = useFilters(
  props.columnConfig,
  props.filterConfig
)

const tableData = computed((): Array<any> => {
  if (props.rows.length > props.itemsPerPage) {
    return [...props.rows].slice(0, props.itemsPerPage)
  }
  return [...props.rows]
})
const columnNames = computed((): Array<string> => {
  return props.columnConfig.map(col => {
    const finalLabel = col.label ? col.label : col.name
    if (col.format) {
      return col.format(finalLabel)
    }
    if (col.firstToUpper) {
      return finalLabel.charAt(0).toUpperCase() + finalLabel.slice(1)
    }
    return finalLabel
  })
})

const handleEvent = (event: 'refresh' | 'change' | 'filter', itemsPerPage: number) => {
  const start = (internalPage.value - 1) * itemsPerPage
  const order_field = sortColumn.value
  const order_direction = ascending.value ? 'ASC' : 'DESC'
  emit(event, {
    start,
    to: start + itemsPerPage,
    limit: itemsPerPage,
    order_field,
    order_direction,
    filters: { ...filterValues.value },
  })
}
const onUpdatePage = (page: number) => {
  internalPage.value = page
  handleEvent('change', props.itemsPerPage)
}
const onUpdateItemsPerPage = (itemsPerPage: number) => {
  internalPage.value = 1
  handleEvent('change', itemsPerPage)
}
const onFilter = () => {
  if (showFilters.value) {
    internalPage.value = 1
    handleEvent('filter', props.itemsPerPage)
  } else {
    showFilters.value = true
  }
}
const onHideFilter = () => {
  showFilters.value = false
  resetValues()
  onUpdatePage(1)
}
const sortTable = (col: string) => {
  if (sortColumn.value === col) {
    ascending.value = !ascending.value
  } else {
    sortColumn.value = col
    ascending.value = true
  }
  onUpdateItemsPerPage(1)
}
const hasSlot = (slotName: string) => {
  return slots[slotName] && typeof slots[slotName] === 'function'
}
</script>

<style lang="scss" scoped>
@import './SmTable.scss';
</style>
