<template>
  <Story title="s-chip" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-chip v-bind="initState"></s-chip>
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
});

const controls = [
  {
    key: 'label',
    input: 'Text',
    props: {},
  },
  {
    key: 'type',
    input: 'Select',
    props: {
      options: ['input', 'filter'],
    },
  },
  {
    key: 'icon',
    input: 'Select',
    props: {
      options: icons,
    },
  },
  {
    key: 'avatar',
    input: 'Text',
    props: {},
  },
  {
    key: 'disabled',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'selected',
    input: 'Checkbox',
    props: {},
  },
];
</script>
