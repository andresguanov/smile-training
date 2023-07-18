<template>
  <div class="s-leading" :class="[size, { inline, actionable, trailing }]">
    <div class="s-leading__wrapper" :class="{ disabled }">
      <slot>
        <sm-icon v-if="leadingIcon" class="s-leading__icon" :icon="leadingIcon" />
        <!-- <img
        v-else-if="leadingImage"
        :src="leadingImage"
        :alt="label || 'Leading image'"
        class="s-leading__img"
      /> -->
        <p v-if="label">{{ label }}</p>
        <sm-icon v-if="trailingIcon" class="s-leading__icon" :icon="trailingIcon" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IconType } from '../../../interfaces';

defineProps<{
  inline?: boolean;
  actionable?: boolean;
  size?: 'small' | 'medium' | 'large';
  label?: string;
  leadingIcon?: IconType;
  trailingIcon?: IconType;
  trailing?: boolean;
  disabled?: boolean;
}>();
</script>

<style lang="scss" scoped>
.s-leading {
  @apply h-full;

  &__wrapper {
    @apply flex items-center gap-0.5;
    @apply h-full bg-slate-50 px-2;
    @apply border-r border-solid border-slate-300;
    @apply text-slate-500 font-normal;

    :deep(.s-leading__icon) {
      @apply w-5 h-5;
    }
  }
  &.inline {
    @apply p-0.5;

    .s-leading__wrapper {
      @apply border-none bg-transparent;
      @apply rounded-lg;
    }
  }
  &.actionable {
    .s-leading__wrapper {
      @apply bg-white cursor-pointer text-slate-700;

      &:not(.disabled) {
        &:hover {
          @apply bg-slate-200/[45%];
        }
        &:active,
        &:focus {
          @apply bg-slate-200/70;
        }
      }
      &.disabled {
        @apply text-slate-300 cursor-auto;
      }
    }
  }
  &.small {
    .s-leading__wrapper {
      @apply text-sm rounded-md px-[6px];

      :deep(.s-leading__icon) {
        @apply w-4 h-4;
      }
    }
  }
  &.large {
    .s-leading__wrapper {
      @apply rounded-[10px] px-3;
    }
  }
  &.trailing {
    .s-leading__wrapper {
      @apply border-0 border-l;
    }
  }
}
</style>
