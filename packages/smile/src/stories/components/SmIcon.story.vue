<template>
  <Story title="sm-icon" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <sm-icon v-bind="initState"></sm-icon>
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
import { icons } from '../config/utils/IconOptions';

const initState = reactive({
  size: 'medium',
  icon: 'help',
});

const controls = [
  {
    key: 'icon',
    input: 'Select',
    props: { options: icons },
  },
  {
    key: 'size',
    input: 'Select',
    props: { options: ['small', 'medium', 'large', 'huge'] },
  },
  {
    key: 'type',
    input: 'Select',
    props: { options: ['primary', 'secondary', 'error'] },
  },
  {
    key: 'hoverColor',
    input: 'Text',
    props: {},
  },
  {
    key: 'disabled',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'fluid',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'width',
    input: 'Text',
    props: {},
  },
  {
    key: 'height',
    input: 'Text',
    props: {},
  },
  {
    key: 'color',
    input: 'Text',
    props: {},
  },
];
</script>
