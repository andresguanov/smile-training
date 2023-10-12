<template>
  <Story title="s-avatar" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-avatar v-bind="initState"></s-avatar>
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
  type: 'circle',
});

const controls = [
  {
    key: 'type',
    input: 'Select',
    props: { options: ['circle', 'square'] },
  },
  {
    key: 'size',
    input: 'Select',
    props: { options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] },
  },
  {
    key: 'text',
    input: 'Text',
    props: {},
  },
  {
    key: 'image',
    input: 'Text',
    props: {},
  },
  {
    key: 'icon',
    input: 'Select',
    props: { options: icons },
  },
];
</script>
