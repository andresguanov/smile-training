<template>
  <label class="sm-label">
    <span
      v-if="label"
      :class="[sizeClass, { 'sm-label-required': required, 'sm-label-error': props.error }]"
    >
      {{ label }}
      <s-tooltip v-if="help" class="sm-label-help" :content="help">
        <sm-icon icon="help" type="primary" size="small" />
      </s-tooltip>
    </span>
    <slot />
  </label>
</template>

<script setup lang="ts">
import { LabelProps as labelProps } from '../../composables';

const props = defineProps({ ...labelProps });

const sizeClass = computed(() => {
  let size = props.size || 'medium';
  return `sm-text-${size} sm-label-text`;
});
</script>

<style lang="scss" scoped>
@import './SmLabel.scss';
</style>
