<template>
  <Story title="s-stepper" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-stepper v-model="initState['v-model']" v-bind="initState"></s-stepper>
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
  'v-model': 1,
  steps: ['Step 1', 'Step 2', 'Step 3'],
});

const controls = [
  {
    key: 'v-model',
    input: 'Number',
    props: {},
  },
  {
    key: 'steps',
    input: 'Json',
    props: {},
  },
  {
    key: 'hideLabels',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'currentStepHasError',
    input: 'Checkbox',
    props: {},
  },
];
</script>
