<template>
  <div :class="['sm-card', elevation && `sm-card-elevation-${elevation}`]">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    elevation?: '0' | '1' | '2' | '3' | '4';
  }>(),
  {
    elevation: '1',
  }
);
</script>

<style scoped lang="scss">
@import './SmCard.scss';
</style>
