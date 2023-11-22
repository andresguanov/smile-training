<template>
  <ul class="s-accordion">
    <slot></slot>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { OptionsProps as optionsProps, useOptions } from '../../composables';

const props = defineProps({
  ...optionsProps,
});

const selected = ref(props.selected);

useOptions(selected);
</script>

<style lang="scss" src="./SAccordion.scss" scoped></style>
