<template>
  <Story
    title="s-checkbox"
    :layout="{
      type: 'grid',
    }"
  >
    <pre>{{ inputValue }}</pre>
    <s-checkbox v-model="inputValue" :options="options"></s-checkbox>
  </Story>
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref([]);

const options = [
  {
    value: '1',
    label: 'Opción 1',
  },
  {
    value: '2',
    label: 'Opción 2',
    indeterminate: true,
  },
  {
    value: '3',
    label: 'Opción 3',
    disabled: true,
  },
];
</script>
