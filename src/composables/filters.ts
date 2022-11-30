import { SmInput, SmSelect, SmCheckbox, SmDatepicker } from '../components/index'
import { smTableColumn, smTableFilter } from '../interfaces'

export function useFilters(
  columnConfig: Array<smTableColumn>,
  filterConfig: { [key: string]: smTableFilter }
) {
  const showFilters = ref(false)
  const filterValues = ref<{ [key: string]: any }>({})

  const filterAttrs = computed(() => {
    return columnConfig.map(col => {
      const filter = filterConfig[col.name]
      if (!filter) {
        return {
          show: false,
          name: 'none',
          component: SmInput,
          attrs: {},
        }
      }
      if (filter.type === 'checkbox') {
        return {
          show: col.filterable,
          name: col.name,
          component: SmCheckbox,
          attrs: { label: col.label || col.name, ...filter.attrs },
        }
      }
      if (filter.type === 'datepicker') {
        return {
          show: col.filterable,
          name: col.name,
          component: SmDatepicker,
          attrs: { placeholder: col.label || col.name, ...filter.attrs },
        }
      }
      if (filter.type === 'select') {
        return {
          show: col.filterable,
          name: col.name,
          component: SmSelect,
          attrs: {
            placeholder: col.label || col.name,
            options: filter.options || [],
            ...filter.attrs,
          },
        }
      }
      return {
        show: col.filterable,
        name: col.name,
        component: SmInput,
        attrs: { placeholder: col.label || col.name, ...filter.attrs },
      }
    })
  })

  const hasFilterableData = computed<boolean>(() => {
    return columnConfig.some(el => el.filterable) && Object.keys(filterConfig).length > 0
  })

  const resetValues = () => {
    columnConfig.forEach(el => {
      const modelIsBoolean = filterConfig[el.name]
      filterValues.value[el.name] = modelIsBoolean?.type === 'checkbox' ? false : ''
    })
  }

  resetValues()

  return { filterValues, hasFilterableData, filterAttrs, showFilters, resetValues }
}
