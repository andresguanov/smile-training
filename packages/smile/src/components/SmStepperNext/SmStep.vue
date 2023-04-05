<template>
  <div class="sm-step" :class="[state]">
    <div class="sm-step__header">
      <span class="sm-step__line sm-step__line--left" />
      <span class="sm-step__circle" />
      <span class="sm-step__line sm-step__line--right" />
    </div>
    <p v-if="label" class="sm-step__label">{{ label }}</p>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    state: 'pending' | 'progress' | 'error' | 'completed';
    label?: string;
  }>(),
  { state: 'pending' }
);
</script>

<style scoped lang="scss" src="./SmStep.scss"></style>
