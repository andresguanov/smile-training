import { SmInput, SmSelect, SmCheckbox, SmDatepicker } from '../components/index';
import { smTableColumn, smTableFilter } from '../interfaces';

export function useFilters(
  columnConfig: Array<smTableColumn>,
  filterConfig: { [key: string]: smTableFilter }
) {
  // Propiedades reactivas
  const showFilters = ref(false);

  const filterValues = ref<{ [key: string]: any }>({});

  // Propiedades computadas
  const filterAttrs = computed(() => {
    return columnConfig.map(col => {
      const filter = filterConfig[col.name];
      const commonAttr = {
        show: col.filterable,
        name: col.name,
        width: col.width,
      };
      if (!filter) {
        return reactive({
          ...commonAttr,
          show: false,
          component: 'SmInput',
          attrs: {},
        });
      }
      if (filter.type === 'checkbox') {
        return reactive({
          ...commonAttr,
          component: 'SmCheckbox',
          attrs: { label: col.label || col.name, ...filter.attrs },
        });
      }
      if (filter.type === 'datepicker') {
        return reactive({
          ...commonAttr,
          component: 'SmDatePicker',
          attrs: { placeholder: col.label || col.name, ...filter.attrs },
        });
      }
      if (filter.type === 'select') {
        return reactive({
          ...commonAttr,
          component: 'SmSelect',
          attrs: {
            placeholder: col.label || col.name,
            options: filter.options || [],
            ...filter.attrs,
          },
        });
      }
      return reactive({
        ...commonAttr,
        component: 'SmInput',
        attrs: { placeholder: col.label || col.name, ...filter.attrs },
      });
    });
  });

  const hasFilterableData = computed<boolean>(() => {
    return columnConfig.some(el => el.filterable) && Object.keys(filterConfig).length > 0;
  });
  const filtersAreFalsy = computed(() =>
    Object.values(filterValues.value).every(val => (Array.isArray(val) && val.length === 0) || !val)
  );

  // Métodos
  const getComponent = (component?: 'SmCheckbox' | 'SmDatePicker' | 'SmInput' | 'SmSelect') => {
    if (component == 'SmCheckbox') {
      return SmCheckbox;
    }
    if (component == 'SmDatePicker') {
      return SmDatepicker;
    }
    if (component == 'SmSelect') {
      return SmSelect;
    }
    return SmInput;
  };

  const initValues = () => {
    const rawVal: { [key: string]: any } = {};
    columnConfig.forEach(column => {
      if (!column.name) {
        return;
      }
      if (!filterConfig[column.name]) {
        return;
      }
      const type = filterConfig[column.name].type;
      if (type == 'input' || type == 'datepicker') {
        rawVal[column.name] = ref<string>('');
      }
      if (type == 'checkbox') {
        rawVal[column.name] = ref<boolean>(false);
      }
      if (type == 'select') {
        const isMultiple = filterConfig[column.name].attrs?.multiple;
        rawVal[column.name] = isMultiple ? ref([]) : ref(undefined);
      }
    });
    filterValues.value = { ...rawVal };
  };

  initValues();

  return {
    filterValues,
    hasFilterableData,
    filterAttrs,
    showFilters,
    filtersAreFalsy,
    // Métodos
    getComponent,
    resetValues: initValues,
  };
}
