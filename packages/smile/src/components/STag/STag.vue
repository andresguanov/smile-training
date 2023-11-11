<template>
  <div :class="['sm-tag-next', type]">
    <sm-icon v-if="leadingIcon" :icon="leadingIcon" height="12px" width="12px" />
    <span>{{ label }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { IconType } from '../../interfaces';

withDefaults(
  defineProps<{
    type?: 'primary' | 'slate' | 'rose' | 'amber' | 'green' | 'indigo';
    leadingIcon?: IconType;
    label: string;
  }>(),
  {
    type: 'primary',
  }
);
</script>

<style scoped lang="scss" src="./SmTagNext.scss"></style>
