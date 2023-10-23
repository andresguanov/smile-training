<template>
  <Story title="s-input" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-input v-model="value" v-bind="initState"></s-input>
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
import { ref, reactive } from 'vue';
import { icons } from '../config/utils/IconOptions';

const value = ref('');
const initState = reactive({
  label: 'Label',
  size: 'medium',
  optionalText: 'Opcional',
  trailing: {
    inline: true,
    actionable: true,
    label: 'Trailing',
  },
  leading: {
    trailingIcon: icons[3],
  },
});

const controls = [
  {
    key: 'size',
    input: 'Select',
    props: { options: ['small', 'medium', 'large'] },
  },
  {
    key: 'iconLeft',
    input: 'Select',
    props: { options: icons },
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
    key: 'required',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'id',
    input: 'Text',
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
    key: 'label',
    input: 'Text',
    props: {},
  },
  {
    key: 'nativeType',
    input: 'Select',
    props: {
      options: [
        'text',
        'password',
        'date',
        'month',
        'email',
        'search',
        'time',
        'url',
        'color',
        'week',
      ],
    },
  },
  {
    key: 'error',
    input: 'Text',
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
  {
    key: 'supportiveText',
    input: 'Text',
    props: {},
  },
  {
    key: 'hint',
    input: 'Text',
    props: {},
  },
  {
    key: 'leading',
    input: 'Json',
    props: {},
  },
  {
    key: 'trailing',
    input: 'Json',
    props: {},
  },
];
</script>
