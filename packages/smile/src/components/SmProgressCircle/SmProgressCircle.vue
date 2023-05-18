<template>
  <div
    :class="[
      'sm-progress-circle',
      { 'sm-progress-circle-show-percentage': showPercentage },
      `sm-progress-circle-${size}`,
    ]"
    :value="(value * 100) / max"
  ></div>
</template>

<script lang="ts" setup>
// TODO: add size variants
withDefaults(
  defineProps<{
    max?: number;
    value?: number;
    showPercentage?: boolean;
    size?: 'small' | 'large' | 'medium';
  }>(),
  {
    max: 100,
    value: 0,
    showPercentage: false,
    size: 'medium',
  }
);
</script>

<style lang="scss" scoped>
@import './SmProgressCircle.scss';
</style>
