<template>
  <Story title="s-menu-item" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-menu-item v-bind="initState"></s-menu-item>
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

const initState = reactive({ textStyle: 'inline', title: '[Title]', description: '[description]' });

const controls = [
  {
    key: 'title',
    input: 'Text',
    props: {},
  },
  {
    key: 'titleStyle',
    input: 'Text',
    props: {},
  },
  {
    key: 'description',
    input: 'Text',
    props: {},
  },
  {
    key: 'descriptionStyle',
    input: 'Text',
    props: {},
  },
  {
    key: 'destructive',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'disabled',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'textStyle',
    input: 'Select',
    props: { options: ['inline', 'block'] },
  },
  {
    key: 'avatar',
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
