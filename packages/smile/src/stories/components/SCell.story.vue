<template>
  <Story title="s-cell" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-cell v-bind="initState"></s-cell>
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
import { reactive } from 'vue';

const initState = reactive({
  text: 'Text',
  avatar: '',
  secondLine: 'Description',
  rightContent: false,
});

const controls = [
  {
    key: 'avatar',
    input: 'Text',
    props: {},
  },
  {
    key: 'text',
    input: 'Text',
    props: {},
  },
  {
    key: 'secondLine',
    input: 'Text',
    props: {},
  },
  {
    key: 'rightContent',
    input: 'Checkbox',
    props: {},
  },
];
</script>
