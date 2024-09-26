<template>
  <Story title="s-tag" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-tag v-bind="initState"></s-tag>
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
  label: 'label',
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
    props: { options: ['primary', 'slate', 'rose', 'amber', 'green', 'indigo'] },
  },
  {
    key: 'leadingIcon',
    input: 'Select',
    props: { options: icons },
  },
];
</script>
