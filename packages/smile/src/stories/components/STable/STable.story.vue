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
];
</script>
