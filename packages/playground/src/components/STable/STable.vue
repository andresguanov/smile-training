<template>
  <STable :rows :columnConfig>
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
