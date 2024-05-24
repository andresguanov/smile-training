<template>
  <Story title="s-breadcrumb" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-breadcrumb v-bind="initState"></s-breadcrumb>
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
  label: 'Label',
});

const controls = [
  {
    key: 'label',
    input: 'Text',
    props: {},
  },
  {
    key: 'active',
    input: 'Checkbox',
    props: {},
  },
];
</script>
