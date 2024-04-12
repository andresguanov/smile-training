<template>
  <Story :layout="{ type: 'grid', width: 98 }">
    <template v-for="icon in icons" :key="icon">
      <Variant :title="icon">
        <SmIcon v-bind="initState" :icon="icon"></SmIcon>
      </Variant>
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
  </Story>
</template>

<script setup>
import { reactive } from 'vue';
import { icons } from '../config/utils/IconOptions';

const initState = reactive({
  size: 'huge',
});

const controls = [
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
