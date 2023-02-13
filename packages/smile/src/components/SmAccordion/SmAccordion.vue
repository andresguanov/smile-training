<template>
  <ul class="sm-accordion">
    <slot></slot>
  </ul>
</template>

<script lang="ts" setup>
import { OptionsProps as optionsProps, useOptions } from '../../composables'

const props = defineProps({
  ...optionsProps,
})

const selected = ref(props.selected)

useOptions(selected)
</script>

<style scoped lang="scss">
@import './SmAccordion.scss';
</style>
