<template>
  <div class="sm-tabs-container">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { OptionsProps as optionsProps, useOptions } from '../../composables'

const props = defineProps({
  ...optionsProps,
})

const selected = ref(props.selected)

useOptions(selected)
</script>
