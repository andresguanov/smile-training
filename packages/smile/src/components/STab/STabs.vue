<template>
  <div class="s-tabs-container">
    <s-tab-selectors :filled="filled">
      <slot name="selectors"></slot>
    </s-tab-selectors>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { OptionsProps as optionsProps, useOptions } from '../../composables';

const props = defineProps({
  ...optionsProps,
  filled: {
    type: Boolean,
    default: false,
  },
});

const legacySelected = ref(props.selected);
const newSelected = defineModel<string>();

const selected = computed({
  get: () => {
    if (newSelected.value) {
      return newSelected.value;
    }
    return legacySelected.value;
  },
  set: value => {
    if (newSelected.value) {
      newSelected.value = value;
    } else {
      legacySelected.value = value;
    }
  },
});

useOptions(selected);

provide('STabType', props.filled);
</script>
