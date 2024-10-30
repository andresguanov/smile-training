<template>
  <Story title="s-radio" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-radio
          v-model="initState['v-model']"
          v-bind="initState"
          @focusOut="logEvent('focusOut', $event)"
        ></s-radio>
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
import { logEvent } from 'histoire/client';

const initState = reactive({
  label: 'Label',
  orientation: 'vertical',
  options: [
    {
      value: '1',
      label: 'Opción 1',
    },
    {
      value: '2',
      label: 'Opción 2',
    },
    {
      value: '3',
      label: 'Opción 3',
      disabled: true,
    },
  ],
  optionalText: 'Opcional',
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
    key: 'error',
    input: 'Text',
    props: {},
  },
  {
    key: 'required',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'markType',
    input: 'Select',
    props: { options: ['required', 'optional'] },
  },
  {
    key: 'optionalText',
    input: 'Text',
  },
];
</script>
