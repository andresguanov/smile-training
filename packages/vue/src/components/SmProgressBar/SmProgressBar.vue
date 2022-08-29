<template>
  <progress :value="value" :max="max" v-bind="$attrs" class="sm-progress-bar">
    {{ value }}
  </progress>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    value?: number
    max?: number
  }>(),
  {
    max: 100,
  }
)
</script>

<style lang="scss" scoped>
@import './SmProgressBar.scss';
</style>
