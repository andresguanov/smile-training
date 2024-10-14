<template>
  <Story title="table/s-pagination" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-pagination
          v-bind="initState"
          v-model:page="initState.page"
          v-model:itemsPerPage="initState.itemsPerPage"
        ></s-pagination>
        {{ initState }}
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
import { reactive } from 'vue';

const initState = reactive({
  text: {
    page: 'Página',
    of: 'de',
    showing: 'Mostrando',
    resultsPerPage: 'Ítems por página',
  },
  itemsPerPage: 10,
  itemLimitOptions: [10, 20, 30],
  total: 1,
  page: 1,
});

const controls = [
  {
    key: 'fullMode',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'v-model:page',
    input: 'Number',
    props: {},
  },
  {
    key: 'v-model:itemsPerPage',
    input: 'Number',
    props: {},
  },
  {
    key: 'total',
    input: 'Number',
    props: {},
  },
  {
    key: 'height',
    input: 'Text',
    props: {},
  },
  {
    key: 'text',
    input: 'Json',
    props: {},
  },
  {
    key: 'itemLimitOptions',
    input: 'Json',
    props: {},
  },
];
</script>
