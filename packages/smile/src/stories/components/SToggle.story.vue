<template>
  <Story title="s-toggle" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-toggle v-model="initState['v-model']" v-bind="initState"></s-toggle>
      </template>

      <template #controls>
        <component
          v-model="initState[control.key]"
          v-for="control in controls"
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
import { icons } from '../config/utils/IconOptions';

const initState = reactive({
  label: 'Label',
  errorMessages: ['Lorem ipsum dolor'],
});

const controls = [
  {
    key: 'v-model',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'label',
    input: 'Text',
    props: {},
  },
  {
    key: 'size',
    input: 'Select',
    props: { options: ['medium', 'small', 'large'] },
  },
  {
    key: 'orientation',
    input: 'Select',
    props: { options: ['horizontal', 'vertical'] },
  },
  {
    key: 'required',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'error',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'errorMessages',
    input: 'Json',
    props: {},
  },
  {
    key: 'disabled',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'labelToLeft',
    input: 'Checkbox',
    props: {},
  },
];
</script>
