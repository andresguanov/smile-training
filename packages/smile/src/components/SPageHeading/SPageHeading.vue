<template>
  <div class="s-page-heading">
    <div class="s-page-heading__title">
      {{ title }}
    </div>

    <div class="s-page-heading__actions">
      <slot name="actions"></slot>
    </div>
    <div class="s-page-heading__description">
      {{ description }}
    </div>

    <div v-if="border" class="s-page-heading__border"></div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    description: string;
    border: boolean;
  }>(),
  {
    border: true,
  }
);
</script>

<style scoped lang="scss" src="./SPageHeading.scss"></style>
