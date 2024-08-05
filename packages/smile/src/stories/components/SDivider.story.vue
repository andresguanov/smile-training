<template>
  <Story title="s-divider" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-divider v-bind="initState"></s-divider>
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

const initState = reactive({
  size: 'medium',
});

const controls = [
  {
    key: 'size',
    input: 'Select',
    props: {
      options: ['xsmall', 'small', 'medium', 'large', 'huge'],
    },
  },
];
</script>
