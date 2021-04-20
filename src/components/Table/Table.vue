<template>
  <div style="position: relative; display: table">
    <div v-if="rowsSelectedCount >= 2" class="selection-state">
      <div
        style="
          padding: 3px 10px 3px;
          font-size: 11px;
          font-weight: bold;
          display: inline-block;
          color: #777;
        "
      >
        {{ selectedText }} {{ rowsSelectedCount }}
        <sm-button icon-button icon="close" size="small" @click="deselectAll" ghost />
      </div>
      <sm-icon-help v-if="hasSlot('selection-state-help')">
        <slot name="selection-state-help" />
      </sm-icon-help>
      <div class="actions" style="position: absolute">
        <slot
          name="selection-state-actions"
          :rowsSelected="computedRowsSelected"
          :deselectAll="deselectAll"
        />
      </div>
    </div>

    <div class="table-wrapper">
      <sm-markup-table :class="{ scroll }" v-bind="$attrs" style="width: 100%" ref="table">
        <thead>
          <tr :class="['filters', { open: showFilters }]" v-if="hasFilterableColumns">
            <td v-if="selectable || externallySelectable" class="td-checkbox" />
            <td
              v-for="(col, i) in columnConfig"
              :key="$id('smTableFilter-' + i)"
              :style="[{ width: `${col.width}` }]"
            >
              <template v-if="showFilters && col.filterable">
                <slot
                  :name="`filter-${col.filterName || col.name}`"
                  :setFilterValue="setFilterValue"
                  :value="filterValues[col.filterName || col.name]"
                >
                  <sm-input
                    v-if="i === 0 && filterConfig[col.filterName || col.name].type === 'input'"
                    v-model="filterValues[col.filterName || col.name]"
                    size="small"
                    v-bind="filterConfig[col.filterName || col.name].attrs"
                    block
                    v-focus
                    @keyup.enter="handleFilter"
                  />
                  <sm-input
                    v-else-if="filterConfig[col.filterName || col.name].type === 'input'"
                    v-model="filterValues[col.filterName || col.name]"
                    size="small"
                    v-bind="filterConfig[col.filterName || col.name].attrs"
                    block
                    @keyup.enter="handleFilter"
                  />
                  <sm-select
                    v-if="filterConfig[col.filterName || col.name].type === 'select'"
                    v-model="filterValues[col.filterName || col.name]"
                    :options="filterConfig[col.filterName || col.name].options"
                    v-bind="filterConfig[col.filterName || col.name].attrs"
                    size="small"
                    block
                  />
                  <sm-checkbox
                    v-if="filterConfig[col.filterName || col.name].type === 'checkbox'"
                    v-model="filterValues[col.filterName || col.name]"
                    size="small"
                    :true-value="true"
                    :false-value="false"
                    v-bind="filterConfig[col.filterName || col.name].attrs"
                  >
                    {{ col.label }}
                  </sm-checkbox>
                  <sm-datepicker
                    v-if="filterConfig[col.filterName || col.name].type === 'datepicker'"
                    v-model="filterValues[col.filterName || col.name]"
                    v-bind="filterConfig[col.filterName || col.name].attrs"
                  />
                </slot>
              </template>
              <div
                v-if="!hasScopedSlot('actionsCol') && i === columnConfig.length - 1"
                style="text-align: right; padding: 6px 0"
              >
                <sm-button size="small" style="margin: 0 4px 0 0" @click="handleFilter">
                  {{ filterBtnText }}
                </sm-button>
                <sm-button v-if="showFilters" size="small" style="margin: 0" @click="hideFilters">
                  {{ closeFilterBtnText }}
                </sm-button>
              </div>
            </td>
            <td v-if="hasScopedSlot('actionsCol')">
              <div style="text-align: right; padding: 6px 0">
                <sm-button size="small" style="margin: 0 4px 0 0" @click="handleFilter">
                  {{ filterBtnText }}
                </sm-button>
                <sm-button v-if="showFilters" size="small" style="margin: 0" @click="hideFilters">
                  {{ closeFilterBtnText }}
                </sm-button>
              </div>
            </td>
          </tr>
          <tr class="headers">
            <th v-if="selectable || externallySelectable" class="th-checkbox">
              <sm-checkbox
                v-model="computedAllRowsSelected"
                :true-value="true"
                :false-value="false"
              ></sm-checkbox>
            </th>
            <th
              v-for="(col, i) in columnConfig"
              :key="$id('smTableTh-' + i)"
              class="th"
              :class="[
                {
                  left: col.headerAlign === 'left',
                  center: col.headerAlign === 'center',
                  right: col.headerAlign === 'right'
                },
                col.headerClass
              ]"
              :style="[{ width: `${col.width}` }, col.headerStyle]"
            >
              <span style="display: inline-block" v-if="!col.order">
                {{ columnsNames[i] }}
              </span>
              <span style="display: inline-block" v-else @click="sortTable(col.name)">
                {{ columnsNames[i] }}
              </span>
              <template v-if="col.name == sortColumn">
                <sm-icon v-if="ascending" icon="caret-up" />
                <sm-icon v-else icon="caret-down" />
              </template>
            </th>
            <slot v-if="hasScopedSlot('actionsCol')">
              <th class="cell-collapse" style="min-width: 105px">{{ actionsColHeadText }}</th>
            </slot>
          </tr>
        </thead>
        <!-- <tbody :class="{ 'empty-body': emptyRows }"> -->
        <!-- <sm-transition-height group tag="tbody"> -->
        <tbody>
          <tr v-if="!getRows().length" class="no-content">
            <!-- THIS IS HERE BECAUSE table AND tbody IGNORE height rule -->
            <td style="height: 473px; text-align: center" :colspan="paginationColspan">
              <slot v-if="!loading" name="no-content">
                {{ noContentText }}
              </slot>
            </td>
          </tr>
          <tr
            v-for="(row, i) in getRows()"
            :key="$id('smTableTr-' + i)"
            @click="$emit('click-row', row)"
          >
            <td v-if="selectable || externallySelectable" class="td-checkbox">
              <sm-checkbox
                :value="!!computedRowsSelected[row[idField]]"
                :true-value="true"
                :false-value="false"
                @click="toggleSelectRow($event, row[idField], row, idField)"
                @input="setSelectedRow($event, row)"
              />
            </td>

            <slot name="bodyRow" :columns="columnConfig" :row="row" :rowIndex="i">
              <td
                v-for="(col, j) in columnConfig"
                :key="$id('smTableTr-' + i + '-' + j)"
                class="td"
                :class="[
                  {
                    left: col.bodyAlign === 'left',
                    center: col.bodyAlign === 'center',
                    right: col.bodyAlign === 'right'
                  },
                  col.bodyClass
                ]"
                :style="[{ width: `${col.width}` }, col.bodyStyle]"
              >
                <slot :name="'bodyRow.' + col.name" :row="row">
                  {{ get(row, col.name) }}
                </slot>
              </td>
            </slot>
            <td v-if="hasScopedSlot('actionsCol')" class="td-actions">
              <slot name="actionsCol" :row="row" />
            </td>
          </tr>
        </tbody>
        <!-- </sm-transition-height> -->

        <!-- </tbody> -->
      </sm-markup-table>
    </div>
    <tfoot v-if="paginate">
      <tr>
        <td :colspan="paginationColspan">
          <sm-pagination
            v-model="currentPage"
            v-model:items-per-page="perPage"
            :total="totalItems"
            :texts="paginationTexts"
            :items-per-page-options="itemsPerPageOptions"
            style="margin: 0 auto"
            @refresh="onRefresh"
            @change="onChangePage"
          />
        </td>
      </tr>
    </tfoot>
    <sm-inner-loading
      style="position: absolute; top: 0; left: 0"
      :value="loading"
      :text="loadingText + '...'"
    />
  </div>
</template>

<script>
/**
 * @typedef {object} ColumnConfig
 * @property {string} label Nombre para mostrar
 * @property {string} name Nombre del campo
 * @property {function} format Función de formateo
 * @property {boolean} firstToUpper Modificador
 * @property {boolean} order
 * @property {boolean} filterable
 * @property {string} filterName Usar cuando el nombre del filtro y el de la columna no coinciden
 * @property {string} headerAlign
 * @property {string} bodyAlign
 * @property {string} width
 * @property {object} headerStyle Javascript-style object for header
 * @property {string} bodyClass Sets class for every td
 * @property {object} bodyStyle Javascript-style object for td
 */
/**
 * @typedef {object} FilterConfigValue
 * @property {string} type
 * @property {Array<{label,value}>} options Opciones para el tipo select
 * @property {object} attrs Atributos a pasar al filtro
 * @property {function} filterFn Función de filtro
 */
/**
 * @typedef {Object.<string,FilterConfigValue>} FilterConfig
 */

import smMarkupTable from "../MarkupTable/MarkupTable"
import smButton from "../Button/Button"
import smCheckbox from "../Checkbox/Checkbox"
import smDatepicker from "../Datepicker/Datepicker"
import smIcon from "../Icon/Icon"
import smIconHelp from "../Icon/IconHelp"
import smInput from "../Input/Input"
import smPagination from "../Pagination/Pagination"
import smInnerLoading from "../Loading/InnerLoading"
// import smTransitionHeight from "../Utils/TransitionHeight"
import smSelect from "../Select/Select"
// import smSelectSimple from "../SelectSimple/SelectSimple"
import slotsMixin from "../../mixins/slotsMixin"
import { orderBy, get } from "lodash-es"
import { isSameDate } from "../../utils/dateHelpers"
const ALL_ROWS_SELECTED_BY_PAGE = () => ({ 0: { value: false, fromGlobalCheckbox: false } })
export default {
  name: "sm-table",
  inheritAttrs: false,
  components: {
    smMarkupTable,
    smButton,
    smCheckbox,
    smDatepicker,
    smIcon,
    smIconHelp,
    smInput,
    smPagination,
    smInnerLoading,
    smSelect
    // smSelectSimple
    // smTransitionHeight
  },
  mixins: [slotsMixin],
  props: {
    rows: {
      type: Array,
      required: true
    },
    rowsLength: {
      type: Number,
      default: -1
    },
    columnConfig: {
      /** @type {{ new (): ColumnConfig[] }}  */
      type: Array,
      required: true
    },
    filterConfig: {
      /**@type {FilterConfig} */
      type: Object,
      default: () => ({})
    },
    itemsPerPage: {
      type: Number,
      default: null
    },
    itemsPerPageOptions: {
      type: Array,
      default: () => null
    },
    loading: {
      type: Boolean,
      default: false
    },
    noContentText: {
      type: String,
      default: "No hay contenido disponible"
    },
    paginate: {
      type: Boolean,
      default: true
    },
    paginationTexts: {
      type: Object,
      default: () => ({
        page: "Página",
        of: "de",
        showing: "Mostrando",
        resultsPerPage: "Resultados por página"
      })
    },
    remoteData: {
      type: Boolean,
      default: false
    },
    actionsColHeadText: {
      type: String,
      default: "Acciones"
    },
    loadingText: {
      type: String,
      default: "Cargando"
    },
    scroll: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: false
    },
    externallySelectable: {
      type: Boolean,
      default: false
    },
    // TODO: Check if fromGlobalCheckbox is still need
    allRowsSelected: {
      type: Object,
      default: () => ({ value: false, fromGlobalCheckbox: false })
    },
    rowsSelected: {
      type: Object,
      default: () => ({})
    },
    orderBy: {
      type: String,
      default: null
    },
    asc: {
      type: Boolean,
      default: null
    },
    page: {
      type: [Number, String],
      default: null
    },
    filterBtnText: {
      type: String,
      default: "Filtrar"
    },
    closeFilterBtnText: {
      type: String,
      default: "Cerrar"
    },
    selectedText: {
      type: String,
      default: "Seleccionados"
    },
    idField: {
      type: String,
      default: "id"
    }
  },
  data() {
    return {
      internalAscending: true,
      internalSortColumn: "",
      internalCurrentPage: 0,
      internalPerPage: 10,
      localRows: [],
      showFilters: false,
      filterValues: {},
      internalAllRowsSelectedByPage: ALL_ROWS_SELECTED_BY_PAGE(),
      internalRowsSelected: {}
    }
  },
  computed: {
    currentPage: {
      get() {
        //if (this.page !== null) return this.page
        //return this.internalCurrentPage
        return this.internalCurrentPage
      },
      set(val) {
        if (this.page !== null) {
          this.$emit("update:page", val)
        }
        //else {
        //  this.internalCurrentPage = val
        //}
        this.internalCurrentPage = val
      }
    },
    computedRowsSelected() {
      if (this.externallySelectable) return this.rowsSelected
      else return this.internalRowsSelected
    },
    rowsSelectedCount() {
      return Object.values(this.computedRowsSelected).filter(value => value).length
    },
    computedAllRowsSelected: {
      get() {
        if (this.externallySelectable) return this.externalSelectAllRows.value
        return this.internalAllRowsSelected.value
      },
      set(value) {
        // if (this.externallySelectable) {
        if (value) this.markSelectAll(true)
        else this.unmarkSelectAll(true)
        // } else {
        //   this.internalAllRowsSelected.value = value
        //   this.internalAllRowsSelected.fromGlobalCheckbox = true
        // }
      }
    },
    internalAllRowsSelected: {
      get() {
        if (this.internalAllRowsSelectedByPage[this.currentPage]) {
          return this.internalAllRowsSelectedByPage[this.currentPage]
        }

        this.internalAllRowsSelectedByPage[this.currentPage] = {
          value: false,
          fromGlobalCheckbox: false
        }
        return this.internalAllRowsSelectedByPage[this.currentPage]
        // this.$set(this.internalAllRowsSelectedByPage, this.currentPage, {
        //   value: false,
        //   fromGlobalCheckbox: false
        // })
      },
      set(value) {
        this.internalAllRowsSelectedByPage[this.currentPage] = value
        // this.$set(this.internalAllRowsSelectedByPage, this.currentPage, value)
      }
    },
    emptyRows() {
      return this.rows.length === 0
    },
    columnsNames() {
      return this.columnConfig.map(col => {
        const finalLabel = col.label ? col.label : col.name
        if (col.format && typeof col.format === "function") {
          return col.format(finalLabel)
        }
        if (col.firstToUpper) {
          return this.firstToUpper(finalLabel)
        }
        return finalLabel
      })
    },
    totalItems() {
      if (this.rowsLength >= 0) {
        return this.rowsLength
      }
      return this.localRows.length
    },
    paginationColspan() {
      return this.hasScopedSlot("actionsCol")
        ? this.selectable || this.externallySelectable
          ? this.columnConfig.length + 2
          : this.columnConfig.length + 1
        : this.columnConfig.length
    },
    hasFilterableColumns() {
      return this.columnConfig.some(c => c.filterable)
    },
    perPage: {
      get() {
        // if (this.itemsPerPage) {
        //   return this.itemsPerPage
        // }
        return this.internalPerPage
      },
      set(val) {
        if (this.itemsPerPage) {
          this.$emit("update:itemsPerPage", val)
          this.internalPerPage = val
        } else {
          this.internalPerPage = val
          this.currentPage = 0
        }
        if (this.remoteData) {
          this.updateTableState("change", {
            start: 0,
            limit: val,
            to: val
          })
        } else {
          this.getRows()
        }
      }
    },
    sortColumn: {
      get() {
        if (this.orderBy) return this.orderBy
        return this.internalSortColumn
      },
      set(val) {
        if (this.orderBy) {
          this.$emit("update:orderBy", val)
        } else {
          this.internalSortColumn = val
        }
      }
    },
    ascending: {
      get() {
        if (this.asc !== null) return this.asc
        return this.internalAscending
      },
      set(val) {
        if (this.asc !== null) {
          this.$emit("update:asc", val)
        } else {
          this.internalAscending = val
        }
      }
    }
  },
  methods: {
    sortTable(col) {
      let asc
      this.currentPage = 0
      if (this.sortColumn === col) {
        asc = !this.ascending
        this.ascending = asc
      } else {
        this.ascending = true
        asc = true
        this.sortColumn = col
      }

      if (this.remoteData) {
        const order_direction = asc ? "ASC" : "DESC"
        this.updateTableState("change", {
          order_field: col,
          order_direction,
          start: 0,
          to: this.perPage
        })
      } else {
        this.localRows = orderBy(this.localRows, col, this.ascending ? "ASC" : "DESC")
      }
    },
    firstToUpper(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    getRows() {
      if (this.remoteData) {
        return this.rows
      }
      if (!this.paginate) {
        return this.localRows
      }
      const start = this.currentPage * this.perPage
      const end = start + this.perPage
      return this.localRows.slice(start, end)
    },
    handleFilter() {
      if (this.showFilters) {
        if (this.remoteData) {
          this.currentPage = 0
          this.updateTableState("filter", {
            start: 0,
            to: this.perPage,
            limit: this.perPage
          })
        } else {
          this.localRows = this.rows.filter(row => {
            for (const filter of Object.keys(this.filterValues)) {
              // Si el filtro no sea ha utilizado
              if (this.filterValues[filter] === null) continue

              // Si se definió una función de filtro
              if (this.filterConfig[filter].filterFn) {
                return this.filterConfig[filter].filterFn(
                  this.filterValues[filter],
                  filter, // Tanto el filter como this.localRows están pensados para que la función los reciba solo si los necesita
                  this.localRows
                )
              }
              switch (this.filterConfig[filter].type) {
                case "input":
                  if (
                    !row[filter]
                      .toString()
                      .toLowerCase()
                      .includes(this.filterValues[filter].toLowerCase())
                  ) {
                    return false
                  }
                  break
                case "select":
                  //TODO: check multiple case
                  if (row[filter] !== this.filterValues[filter]) {
                    return false
                  }
                  break
                case "checkbox":
                  if (row[filter] !== this.filterValues[filter]) {
                    return false
                  }
                  break
                case "datepicker":
                  if (!isSameDate(this.filterValues[filter], row[filter])) {
                    return false
                  }
                  break
                default:
                  return false
              }
            }
            return true
          })
        }
      } else {
        this.showFilters = true
        this.$nextTick(this.setInputHolderMaxWidth)
      }
    },
    /**
     * this is needed because of display: table;
     * need to get rid of that
     */
    setInputHolderMaxWidth() {
      const inputHolders = this.$refs.table.$el.querySelectorAll(".filters .select .input-holder")
      inputHolders.forEach(
        inputHolder =>
          (inputHolder.style.maxWidth = inputHolder.getBoundingClientRect().width + "px")
      )
    },
    hideFilters() {
      this.showFilters = false
      this.clearFilterValues()
    },
    markSelectAll(fromGlobalCheckbox) {
      if (this.externallySelectable) this.$emit("mark-select-all", fromGlobalCheckbox)
      else {
        const rows = this.getRows()
        for (let i = 0; i < rows.length; i++) {
          this.$set(this.internalRowsSelected, rows[i][this.idField], true)
        }
        this.internalAllRowsSelected.value = true
        this.internalAllRowsSelected.fromGlobalCheckbox = fromGlobalCheckbox
      }
    },
    /**
     * Unmark global checkbox (the one on table's header)
     *
     * @param {Boolean} fromGlobalCheckbox It is used to differenciate when global
     * checkbox is unchecked directly instead of when a row's checkbox is unchecked
     */
    unmarkSelectAll(fromGlobalCheckbox) {
      if (this.externallySelectable) this.$emit("unmark-select-all", fromGlobalCheckbox)
      else {
        if (fromGlobalCheckbox) {
          const rows = this.getRows()
          for (let i = 0; i < rows.length; i++) {
            this.$set(this.internalRowsSelected, rows[i][this.idField], false)
          }
        }
        this.internalAllRowsSelected.value = false
      }
    },
    /**
     * Deselect all previously selected rows and uncheck global checkbox
     */
    deselectAll() {
      if (this.externallySelectable) this.$emit("deselect-all")
      else {
        this.internalRowsSelected = {}
        this.internalAllRowsSelectedByPage = ALL_ROWS_SELECTED_BY_PAGE()
      }
    },
    onChangePage(page) {
      const start = page * this.perPage
      this.updateTableState("change", {
        start,
        to: start + this.perPage,
        limit: this.perPage
      })
    },
    onRefresh() {
      this.updateTableState("refresh")
      // if (this.remoteData) {
      //   // const start = this.currentPage * this.perPage
      //   this.updateTableState("refresh")
      // } else {
      //   this.$emit("refresh")
      // }
    },
    setFilterValue(value, filter) {
      this.$set(this.filterValues, filter, value)
    },
    clearFilterValues() {
      for (const filter in this.filterValues) {
        this.$set(this.filterValues, filter, null)
      }
      this.currentPage = 0
      this.onChangePage(0)
      this.$emit("clearFilters")
    },
    setSelectedRow(selected, row) {
      this.$set(this.computedRowsSelected, row[this.idField], selected ? row : false)
    },
    toggleSelectRow(value, key) {
      if (this.externallySelectable) {
        this.$emit("select-row", key, value)
      } else {
        if (!value) this.unmarkSelectAll(false)
      }
    },
    updateTableState(event, config = {}) {
      const start = this.currentPage * this.perPage
      this.$emit(event, {
        order_field: this.sortColumn,
        order_direction: this.ascending ? "ASC" : "DESC",
        start,
        to: start + this.perPage,
        limit: this.perPage,
        filters: this.filterValues,
        ...config
      })
    }
  },
  watch: {
    rows(val) {
      if (!this.remoteData) {
        this.localRows = val
        this.getRows()
      }
    },
    itemsPerPage(val) {
      this.internalPerPage = val
    }
  },
  created() {
    const filterableColumns = this.columnConfig.filter(c => c.filterable)
    for (const column of filterableColumns) {
      this.filterValues[column.filterName || column.name] = null
      // this.$set(this.filterValues, column.filterName || column.name, null)
    }
    this.get = get
  },
  mounted() {
    // this.perPage = this.paginate ? this.itemsPerPage : Infinity
    if (this.itemsPerPage) {
      this.internalPerPage = this.itemsPerPage
    }
    if (this.page) {
      this.internalCurrentPage = this.page
    }
    this.localRows = this.rows
  }
}
</script>

<style lang="scss" scoped>
.expand-enter-active,
.expand-leave-active {
  transition-duration: 0.3s !important;
}

.empty-body {
  min-height: 100px;
  display: block;
}

.filters {
  background: #f4f5fb;
  &:hover {
    background: #f4f5fb;
  }
  height: 36px;

  :deep(.mx-input) {
    margin: 0;
    padding: 4px 8px;
    height: 26px;
  }
  :deep(.mx-icon-calendar) {
    top: 50%;
  }
  :deep(input),
  :deep(.select),
  :deep(.input-wrapper-border),
  :deep(.input-wrapper) {
    margin: 0 !important;
  }
  // Min width setted for the conainet of the controls, in order to not to be so small
  :deep(.sm-container) {
    min-width: 50px;
  }

  :deep(.mx-datepicker),
  :deep(.sm-container) {
    width: 100%;
    input.is-small {
      min-width: unset;
    }
  }
  td {
    // padding-top: 0;
    // padding-bottom: 0;
    padding: 0 4px;
    background-color: transparent;
  }
  &:hover {
    td {
      background-color: transparent !important;
    }
  }
}
.th,
.td {
  &.left {
    text-align: left;
  }
  &.center {
    text-align: center;
  }
  &.right {
    text-align: right;
  }
}
.th {
  > span {
    cursor: pointer;
    transition: all 0.5 linear;

    &:hover {
      color: $brand1;
    }
  }
}
tfoot tr:hover {
  background-color: initial;
}
.cell-collapse {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.selection-state {
  position: relative;
  button.icon-only {
    padding: 0px;
    margin: 0px;
    margin-left: 4px;
    border-radius: 50%;
    background: #f0ecec;
    height: 18px;
    width: 18px;
    :deep(.icon) {
      width: 16px;
      height: 16px;
    }
  }
  .help-icon {
    padding-left: 0;
  }
  .actions {
    top: 0;
    right: 0;
    button {
      margin: 0 2px;
      min-width: 50px;
      padding: 2px;
      padding-right: 6px;
      height: 100%;
      background-color: white !important;
      border-color: #e6e6e6 !important;
      color: #00535e !important;
      border-radius: 0.4rem;
      transition: background 0.2s ease;
      transition-property: background;
      transition-duration: 0.2s;
      transition-timing-function: ease;
      transition-delay: 0s;
      background-image: linear-gradient(to bottom, #fff, #f9fafd) !important;
      // background-image: -webkit-gradient(
      //   linear,
      //   50% 0,
      //   50% 100%,
      //   color-stop(0, #fff),
      //   color-stop(100%, #f9fafd)
      // ) !important;

      &.is-outline:hover {
        :deep(.icon) {
          color: $brand1;
        }
      }
    }
  }
}

.th-checkbox {
  width: 20px;
}
.th-checkbox,
.td-checkbox {
  position: relative;
  min-width: 50px;
  > .sm-container {
    position: absolute;
    top: 6px;
    left: 5px;
    // margin-top: 5px;
    // display: block;
  }
}
tr.no-content,
tr.no-content td {
  background: #fff !important;
}
tr.no-content > td {
  border-bottom: none;
}
.table-wrapper {
  min-height: 561px;
  background: white;
}

.scroll {
  .td-checkbox,
  .th-checkbox {
    width: 50px !important;
  }
  tbody {
    display: block;
    height: 473px;
    overflow: auto;
  }
  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
}
</style>
