<template>
  <Story title="s-number-input" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-number-input v-model="initState['v-model']" v-bind="initState"></s-number-input>
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
  size: 'medium',
  optionalText: 'Opcional',
});

const controls = [
  {
    key: 'v-model',
    input: 'Number',
    props: {},
  },
  {
    key: 'id',
    input: 'Text',
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
    props: { options: ['small', 'medium', 'large'] },
  },
  {
    key: 'step',
    input: 'Number',
    props: {},
  },
  {
    key: 'iconLeft',
    input: 'Select',
    props: { options: icons },
  },
  {
    key: 'placeholder',
    input: 'Text',
    props: {},
  },
  {
    key: 'disabled',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'readonly',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'success',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'loading',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'disabledMinus',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'disabledPlus',
    input: 'Checkbox',
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
    props: {},
  },
];
</script>
