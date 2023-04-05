<template>
  <div :class="['sm-tag-next', type]">
    {{ label }}
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    type?: 'primary' | 'slate' | 'rose' | 'amber' | 'green' | 'indigo';
    label: string;
  }>(),
  {
    type: 'primary',
  }
);
</script>

<style scoped lang="scss" src="./SmTagNext.scss"></style>
