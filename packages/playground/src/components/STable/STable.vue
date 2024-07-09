<template>
  <STable are-local-items :rows :columnConfig>
    <template #empty>
      <EmptyContainer />
    </template>
    <template #firstHeaderCol>
      <SCheckbox :options="[{ value: 'all' }]" />
    </template>
    <template #firstCol>
      <SCheckbox :options="[{ value: 'all' }]" />
    </template>
    <template #lastHeaderCol="{ row, rowIndex }">
      <SCheckbox :options="[{ value: 'all' }]" />
    </template>
    <template #lastCol="{ row, rowIndex }">
      <SCheckbox :options="[{ value: 'all' }]" />
    </template>
  </STable>
</template>
<script setup lang="ts">
import EmptyContainer from './EmptyContainer.vue';

import { ref } from 'vue';

import { TableColumn, STable, SCheckbox } from '@alegradev/smile-ui-next';

const rows = [
  {
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    e: '5',
  },
  {
    a: '2',
    b: '3',
    c: '4',
    d: '5',
    e: '6',
  },
  {
    a: '7',
    b: '8',
    c: '9',
    d: '10',
    e: '11',
  },
  {
    a: '12',
    b: '13',
    c: '14',
    d: '14',
    e: '15',
  },
  {
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    e: '5',
  },
  {
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    e: '5',
  },
  {
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    e: '5',
  },
  {
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    e: '5',
  },
  {
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    e: '5',
  },
  {
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    e: '5',
  },
  {
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    e: '5',
  },
  {
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    e: '5',
  },
  {
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    e: '5',
  },
  {
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    e: '5',
  },
  {
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    e: '5',
  },
  {
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    e: '5',
  },
  {
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    e: '5',
  },
];

const columnConfig = ref<TableColumn[]>([
  {
    bodyAlign: 'right',
    headerAlign: 'right',
    filterable: false,
    label: 'a',
    name: 'a',
  },
  {
    bodyAlign: 'right',
    headerAlign: 'right',
    filterable: false,
    label: 'b',
    name: 'b',
  },
  {
    bodyAlign: 'right',
    headerAlign: 'right',
    filterable: false,
    label: 'b',
    name: 'c',
  },
  {
    bodyAlign: 'right',
    headerAlign: 'right',
    filterable: false,
    label: 'b',
    name: 'd',
  },
  {
    bodyAlign: 'right',
    headerAlign: 'right',
    filterable: false,
    label: 'b',
    name: 'e',
  },
]);
</script>
