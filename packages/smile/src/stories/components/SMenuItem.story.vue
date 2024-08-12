<template>
  <Story title="s-menu-item" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-menu-item v-bind="initState['default']"></s-menu-item>
      </template>
      <template #controls>
        <template v-for="control in controls">
          <component
            v-model="initState['default'][control.key]"
            :is="`Hst${control.input}`"
            :title="control.key"
            v-bind="control.props"
          />
        </template>
      </template>
    </Variant>
    <Variant title="secondary">
      <template #default>
        <s-menu-item v-bind="initState['secondary']"></s-menu-item>
      </template>
      <template #controls>
        <template v-for="control in controls">
          <component
            v-model="initState['secondary'][control.key]"
            :is="`Hst${control.input}`"
            :title="control.key"
            v-bind="control.props"
          />
        </template>
      </template>
    </Variant>
    <Variant title="destructive">
      <template #default>
        <s-menu-item v-bind="initState['destructive']"></s-menu-item>
      </template>
      <template #controls>
        <template v-for="control in controls">
          <component
            v-model="initState['destructive'][control.key]"
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
  default: { textStyle: 'inline', title: '[Title]', description: '[description]' },
  secondary: { textStyle: 'block', title: '[Title]', description: '[description]', icon: 'home' },
  destructive: {
    textStyle: 'inline',
    title: '[Title]',
    description: '[description]',
    icon: 'basket',
    destructive: true,
  },
});

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
    key: 'secondary',
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
  {
    key: 'divider',
    input: 'Checkbox',
    props: {},
  },
];
</script>
