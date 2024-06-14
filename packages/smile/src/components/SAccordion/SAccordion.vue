<template>
  <ul class="s-accordion">
    <slot></slot>
  </ul>
</template>

<script lang="ts" setup>
import { ref, defineModel } from 'vue';
import { OptionsProps as optionsProps, useOptions } from '../../composables';

const props = defineProps({
  ...optionsProps,
});

const legacySelected = ref(props.selected);
const newSelected = defineModel<string>();

const selected = computed({
  get: () => {
    if (typeof newSelected.value === 'string') {
      return newSelected.value;
    }

    return legacySelected.value;
  },
  set: (value: string) => {
    if (typeof newSelected.value === 'string') {
      newSelected.value = value;
    } else {
      legacySelected.value = value;
    }
  },
});

useOptions(selected);
</script>

<style lang="scss" src="./SAccordion.scss" scoped></style>
