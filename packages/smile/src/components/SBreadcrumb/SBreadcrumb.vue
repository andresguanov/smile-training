<template>
  <div class="s-breadcrumb">
    <span :class="{ active }">{{ label }}</span>
    <sm-icon class="icon" size="small" icon="arrow-right"></sm-icon>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    active?: boolean;
  }>(),
  {
    active: false,
  }
);
</script>

<style scoped lang="scss" src="./SBreadcrumb.scss"></style>
