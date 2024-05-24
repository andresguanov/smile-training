<template>
  <Story title="s-button" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-button v-bind="initState"></s-button>
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
  nativeType: 'button',
});

const controls = [
  {
    key: 'label',
    input: 'Text',
    props: {},
  },
  {
    key: 'nativeType',
    input: 'Select',
    props: { options: ['button', 'submit', 'reset'] },
  },
  {
    key: 'tag',
    input: 'Select',
    props: { options: ['button', 'a', 'router-link'] },
  },
  {
    key: 'size',
    input: 'Select',
    props: { options: ['small', 'medium', 'large'] },
  },
  {
    key: 'type',
    input: 'Select',
    props: { options: ['default', 'destructive', 'reversed'] },
  },
  {
    key: 'emphasis',
    input: 'Select',
    props: { options: ['filled', 'subtle', 'outline', 'text'] },
  },
  {
    key: 'iconLeft',
    input: 'Select',
    props: { options: icons },
  },
  {
    key: 'iconRight',
    input: 'Select',
    props: { options: icons },
  },
  {
    key: 'loading',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'disabled',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'onlyIcon',
    input: 'Select',
    props: { options: icons },
  },
  {
    key: 'tooltipPosition',
    input: 'Select',
    props: { options: ['top', 'bottom'] },
  },
];
</script>
