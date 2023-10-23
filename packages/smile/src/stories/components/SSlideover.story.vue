<template>
  <Story title="s-slideover" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-slideover v-bind="initState"></s-slideover>
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
  size: 'regular',
});

const controls = [
  {
    key: 'modelValue',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'headerText',
    input: 'Text',
    props: {},
  },
  {
    key: 'size',
    input: 'Select',
    props: { options: ['regular', 'medium'] },
  },
];
</script>
