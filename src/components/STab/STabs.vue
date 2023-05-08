<template>
  <div class="s-tabs-container">
    <s-tab-selectors :filled="filled">
      <slot name="selectors"></slot>
    </s-tab-selectors>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { OptionsProps as optionsProps, useOptions } from '../../composables'

const props = defineProps({
  ...optionsProps,
  filled: {
    type: Boolean,
    default: false,
  },
})

const selected = ref(props.selected)

useOptions(selected)

provide('STabType', props.filled)
</script>
