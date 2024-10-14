<docs lang="md">
## STable

Tabla con paginación y filtros.

### Props

- `rows`: (Array) Datos a mostrar en la tabla.
- `hoverable`: (Boolean) Indica si la tabla tendrá un efecto hover.
- `total`: (Number) Total de elementos.
- `initialPage`: (Number) Página inicial.
- `initialItemsPerPage`: (Number) Cantidad de elementos por página.
- `initialOrder`: (String) Orden inicial de la tabla.
- `columnConfig`: (Array) Configuración de las columnas.
- `itemsPerPageOptions`: (Array) Opciones de cantidad de elementos por página.
- `lastHeaderColWidth`: (String) Ancho de la última columna.
- `loading`: (Boolean) Indica si la tabla está cargando.
- `showLastHeaderCol`: (Boolean) Indica si se muestra la última columna.
- `showFirstHeaderCol`: (Boolean) Indica si se muestra la primera columna.
- `textPagination`: (Object) Textos de la paginación.
- `firstHeaderColWidth`: (String) Ancho de la primera columna.

### Slots

- `toolbar`: Slot para implementar un toolbar.
- `empty`: Slot para implementar un mensaje cuando no hay datos.
- `firstHeaderCol`: Permite agregar un contenido antes de las opciones.
- `headerCell(${col.name})`: Permite agregar un contenido al header de cada columna.
- `lastHeaderCol`: Permite agregar un contenido al final de las opciones.
- `actionsHead`: Permite customizar el header de las actions.
- `actionsCol`: Permite customizar el elemento de cada action, recibe valores como el `índice` y la `action`.
- `firstCol`: Permite customizar el primer elemento de cada fila.
- `rowCell(${col.name})`: Permite customizar el contenido de cada celda de la fila, recibe valores como el `índice` y la `row`.
- `lastCol`: Permite customizar el último elemento de cada fila.
- `actionsCol`: Permite customizar el elemento de cada action, recibe valores como el `índice` y la `action`.

### Metodos expuestos

1. <strong>A través de Slot</strong>

- `col`: Recibe la configuración de la columna. <strong>Incluido en los slots:</strong>
  - `headerCell(${col.name})`
  - `rowCell(${col.name})`
- `row`: Recibe la fila actual. <strong>Incluido en los slots:</strong>

  - `rowCell(${col.name})`
  - `lastCol`

- `row-index`: Índice de la fila actual. <strong>Slots:</strong>

  - `rowCell(${col.name})`
  - `lastCol`

- `col-index`: Índice de la columna actual. <strong>Slots:</strong>
  - `rowCell(${col.name})`
- `page`: Página actual. <strong>Incluido en los slots:</strong>

  - `rowCell(${col.name})`
  - `lastCol`

- `items-per-page`: Cantidad de items por página. <strong>Slots:</strong>
  - `rowCell(${col.name})`

2. <strong>Mediante Ref</strong>

- `onUpdateItemsPerPage`: Método que permite actualizar la cantidad de items por página.
- `onUpdatePage`: Método que permite actualizar la página actual.
- `onRefresh`: Método que permite refrescar la tabla.
</docs>

<template>
  <Story title="table/s-table" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-table
          v-bind="initState"
          @change="logEvent('change')"
          @search="logEvent('search')"
          @toolbarAction="logEvent('toolbarAction')"
        >
        </s-table>
      </template>
      <template #controls>
        <template v-for="control in controls">
          <component
            v-model="initState[control.key]"
            :is="`Hst${control.input}`"
            :title="control.key"
            v-bind="control.props"
          />
        </template>
      </template>
    </Variant>
    <Variant title="ejemplo">
      <template #default>
        <s-table
          :rows="rows"
          :filters="[{ key: 'date', label: 'fecha', type: 'datepicker', icon: 'clock' }]"
          :column-config="cols"
          :actions="[{ label: 'Test', name: 'test', icon: 'add' }]"
          :total="50"
          pagination-full-mode
          @change="onChange"
          @search="$event => logEvent('search', { $event })"
          @toolbarAction="$event => logEvent('toolbarAction', { $event })"
          @clickRow="logEvent('clickRow', $event)"
        >
          <template #filters>
            <div>Slot para implementar filtros</div>
          </template>
          <template #rowCell(avatar)="{ row }">
            <s-cell :text="row.text" :avatar="row.avatar" />
          </template>
        </s-table>
      </template>
      <template #controls>
        <template v-for="control in controls">
          <component
            v-model="initState[control.key]"
            :is="`Hst${control.input}`"
            :title="control.key"
            v-bind="control.props"
          />
        </template>
      </template>
    </Variant>
  </Story>
</template>

<script setup>
import { logEvent } from 'histoire/client';
import { reactive, ref, computed } from 'vue';

const initState = reactive({
  toolbar: true,
  hoverable: true,
  rows: [],
  columnConfig: [],
  initialPage: 1,
  initialItemsPerPage: 10,
});

const paginationData = ref({
  start: 0,
  to: 10,
});
const rows = computed(() => {
  const obj = [];
  for (let i = paginationData.value.start; i < paginationData.value.to; i++) {
    obj.push({
      id: i,
      text: 'Dato ' + i,
      avatar: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        i + 1
      }.png`,
    });
  }
  return obj;
});
const cols = reactive([
  {
    bodyAlign: 'left',
    headerAlign: 'left',
    filterable: true,
    order: true,
    name: 'id',
    width: '100px',
  },
  {
    filterable: false,
    order: false,
    label: 'información',
    name: 'text',
    width: '200px',
    bodyClass: 'text-slate-900 font-bold',
  },
  {
    bodyAlign: 'left',
    headerAlign: 'left',
    format: value => `${value.toUpperCase()} +`,
    label: 'Avatar',
    name: 'avatar',
    width: '300px',
  },
]);
const onChange = data => {
  logEvent('change', data);
  paginationData.value.start = data.start;
  paginationData.value.to = data.to;
};

const controls = [
  {
    key: 'rows',
    input: 'Json',
    props: {},
  },
  {
    key: 'hoverable',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'total',
    input: 'Number',
    props: {},
  },
  {
    key: 'initialPage',
    input: 'Number',
    props: {},
  },
  {
    key: 'initialItemsPerPage',
    input: 'Number',
    props: {},
  },
  {
    key: 'initialOrder',
    input: 'Select',
    props: { options: ['ASC', 'DESC'] },
  },
  {
    key: 'columnConfig',
    input: 'Json',
    props: {},
  },
  {
    key: 'itemsPerPageOptions',
    input: 'Json',
    props: {},
  },
  {
    key: 'lastHeaderColWidth',
    input: 'Text',
    props: {},
  },
  {
    key: 'textPagination',
    input: 'Json',
    props: {},
  },
  {
    key: 'paginationFullMode',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'actionsColWidth',
    input: 'Text',
    props: {},
  },
  {
    key: 'toolbar',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'toolbarTexts',
    input: 'Json',
    props: {},
  },
  {
    key: 'actions',
    input: 'Json',
    props: {},
  },
  {
    key: 'filters',
    input: 'Json',
    props: {},
  },
  {
    key: 'areLocalItems',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'loading',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'showLastHeaderCol',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'showFirstHeaderCol',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'firstHeaderColWidth',
    input: 'Text',
    props: {},
  },
];
</script>
