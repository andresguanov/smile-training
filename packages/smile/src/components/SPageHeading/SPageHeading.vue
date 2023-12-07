<template>
  <div>
    <div
      v-if="breadcrumb"
      class="s-page-heading__breadcrumb"
      @click="$event => emit('clickBreadcrumb', $event)"
    >
      <sm-icon class="icon" size="small" icon="arrow-left"></sm-icon>
      <span>{{ breadcrumb }}</span>
    </div>
    <div class="s-page-heading">
      <div class="s-page-heading__title">
        <sm-icon v-if="icon" :icon="icon"></sm-icon>
        {{ title }}
      </div>

      <div class="s-page-heading__actions">
        <slot name="actions"></slot>
      </div>
      <div :class="['s-page-heading__description', { 's-page-heading__padding': icon }]">
        {{ description }}
      </div>

      <div v-if="border" class="s-page-heading__border"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IconType } from '../../interfaces';

withDefaults(
  defineProps<{
    title: string;
    description: string;
    breadcrumb?: string;
    border?: boolean;
    icon?: IconType;
  }>(),
  {
    border: true,
  }
);

const emit = defineEmits<{
  (event: 'clickBreadcrumb', value: MouseEvent): void;
}>();
</script>

<style scoped lang="scss" src="./SPageHeading.scss"></style>
