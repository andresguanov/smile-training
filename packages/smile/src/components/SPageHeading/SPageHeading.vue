<template>
  <div>
    <div
      v-if="breadcrumbs.length === 1"
      class="s-page-heading__breadcrumb"
      @click="$event => emit('clickBreadcrumb', $event, breadcrumbs[0].to)"
    >
      <sm-icon class="icon" size="small" icon="arrow-left"></sm-icon>
      <span>{{ breadcrumbs[0].label }}</span>
    </div>

    <div v-else class="s-page-heading__breadcrumb_container">
      <div
        v-for="(bc, index) in breadcrumbs"
        :key="bc.label"
        class="s-page-heading__breadcrumb_container__step"
        @click="clickBreadcrumb($event, bc.to, index === breadcrumbs.length - 1)"
      >
        <span>{{ bc.label }}</span>

        <sm-icon
          v-if="index !== breadcrumbs.length - 1"
          class="icon ml-2"
          size="small"
          icon="arrow-right"
        />
      </div>
    </div>

    <div class="s-page-heading">
      <div class="s-page-heading__title">
        <sm-icon v-if="icon" :icon="icon"></sm-icon>
        {{ title }}
      </div>

      <div class="s-page-heading__actions">
        <slot name="actions"></slot>
      </div>
      <div
        v-if="description || hasDescriptionSlot"
        :class="['s-page-heading__description', { 's-page-heading__padding': icon }]"
      >
        <slot v-if="hasDescriptionSlot" name="description"></slot>
        <span v-else>{{ description }}</span>
      </div>

      <div v-if="border" class="s-page-heading__border"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

import type { IconType, BreadCrumb } from '../../interfaces';

const slots = useSlots();

const props = withDefaults(
  defineProps<{
    title: string;
    description?: string;
    breadcrumb?: string | BreadCrumb[];
    border?: boolean;
    icon?: IconType;
  }>(),
  {
    border: true,
  }
);

const checkSlot = (name: string) => slots[name] && typeof slots[name] === 'function';

const breadcrumbs = computed(() => {
  if (typeof props.breadcrumb === 'string') {
    return [
      {
        label: props.breadcrumb,
        to: '',
      },
    ];
  }

  return props.breadcrumb ?? [];
});

const hasDescriptionSlot = checkSlot('description');

const emit = defineEmits<{
  (event: 'clickBreadcrumb', value: MouseEvent, to: string): void;
}>();

const clickBreadcrumb = (event: MouseEvent, to: string, isLast: boolean) => {
  event.preventDefault();
  // If it's the last breadcrumb, we don't want to navigate
  if (!isLast) {
    emit('clickBreadcrumb', event, to);
  }
};
</script>

<style scoped lang="scss" src="./SPageHeading.scss"></style>
