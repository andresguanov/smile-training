<template>
  <Story title="s-checkbox" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-checkbox v-bind="initState"></s-checkbox>
      </template>

      <template #controls>
        <component
          v-for="control in controls"
          v-model="initState[control.key]"
          :is="`Hst${control.input}`"
          :title="control.key"
          v-bind="control.props"
        />
      </template>
    </Variant>
  </Story>
</template>

<script setup>
import { ref, reactive } from 'vue';

const initState = reactive({
  label: 'Label',
  options: [
    {
      value: '1',
      label: 'Opción 1',
    },
    {
      value: '2',
      label: 'Opción 2',
      indeterminate: true,
    },
    {
      value: '3',
      label: 'Opción 3',
      disabled: true,
    },
  ],
  id: 'id',
  error: '',
  rules: [],
});

const controls = [
  {
    key: 'label',
    input: 'Text',
    props: {},
  },
  {
    key: 'id',
    input: 'Text',
    props: {},
  },
  {
    key: 'orientation',
    input: 'Select',
    props: { options: ['horizontal', 'vertical'] },
  },
  {
    key: 'options',
    input: 'Json',
    props: {},
  },
  {
    key: 'id',
    input: 'Text',
    props: {},
  },
  {
    key: 'error',
    input: 'Text',
    props: {},
  },
  {
    key: 'rules',
    input: 'Json',
    props: {},
  },
];
</script>
