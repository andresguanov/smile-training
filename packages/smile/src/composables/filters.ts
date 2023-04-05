import { SmInput, SmSelect, SmCheckbox, SmDatepicker } from '../components/index';
import { smTableColumn, smTableFilter } from '../interfaces';

export function useFilters(
  columnConfig: Array<smTableColumn>,
  filterConfig: { [key: string]: smTableFilter }
) {
  const showFilters = ref(false);
  const filterValues = ref<{ [key: string]: any }>({});

  const filterAttrs = computed(() => {
    return columnConfig.map(col => {
      const filter = filterConfig[col.name];
      const commonAttr = {
        show: col.filterable,
        name: col.name,
        width: col.width,
      };
      if (!filter) {
        return {
          ...commonAttr,
          show: false,
          component: SmInput,
          attrs: {},
        };
      }
      if (filter.type === 'checkbox') {
        return {
          ...commonAttr,
          component: SmCheckbox,
          attrs: { label: col.label || col.name, ...filter.attrs },
        };
      }
      if (filter.type === 'datepicker') {
        return {
          ...commonAttr,
          component: SmDatepicker,
          attrs: { placeholder: col.label || col.name, ...filter.attrs },
        };
      }
      if (filter.type === 'select') {
        return {
          ...commonAttr,
          component: SmSelect,
          attrs: {
            placeholder: col.label || col.name,
            options: filter.options || [],
            ...filter.attrs,
          },
        };
      }
      return {
        ...commonAttr,
        component: SmInput,
        attrs: { placeholder: col.label || col.name, ...filter.attrs },
      };
    });
  });

  const hasFilterableData = computed<boolean>(() => {
    return columnConfig.some(el => el.filterable) && Object.keys(filterConfig).length > 0;
  });
  const filtersAreFalsy = computed(() =>
    Object.values(filterValues.value).every(val => (Array.isArray(val) && val.length === 0) || !val)
  );

  const resetValues = () => {
    columnConfig.forEach(el => {
      const filter = filterConfig[el.name];
      if (filter?.type === 'checkbox') {
        filterValues.value[el.name] = false;
      } else if (filter?.type === 'select' && filter?.attrs?.multiple) {
        filterValues.value[el.name] = [];
      } else {
        filterValues.value[el.name] = '';
      }
    });
  };

  resetValues();

  return {
    filterValues,
    hasFilterableData,
    filterAttrs,
    showFilters,
    resetValues,
    filtersAreFalsy,
  };
}
