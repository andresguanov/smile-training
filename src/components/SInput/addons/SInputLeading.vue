<template>
  <div class="s-leading" :class="[size, { inline, actionable, trailing }]">
    <div class="s-leading__wrapper">
      <p>{{ label }}</p>
      <sm-icon v-if="icon" :icon="icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IconType } from '../../../interfaces'

defineProps<{
  inline?: boolean
  actionable?: boolean
  size?: 'small' | 'medium' | 'large'
  label?: string
  icon?: IconType
  trailing?: boolean
}>()
</script>

<style lang="scss" scoped>
.s-leading {
  @apply h-full;

  &__wrapper {
    @apply flex items-center gap-0.5;
    @apply h-full px-2;
    @apply border-r border-solid bg-slate-50 border-slate-300;
    @apply text-slate-500 font-normal;

    svg {
      @apply w-5 h-5;
    }
  }
  &.inline {
    @apply p-0.5;

    .s-leading__wrapper {
      @apply text-slate-700 border-none bg-transparent;
      @apply rounded-lg;
    }
  }
  &.actionable {
    .s-leading__wrapper {
      @apply bg-white cursor-pointer;

      &:hover {
        @apply bg-slate-200/40;
      }
      &:active,
      &:focus {
        @apply bg-slate-200/70;
      }
    }
  }
  &.small {
    .s-leading__wrapper {
      @apply text-sm;

      svg {
        @apply w-4 h-4;
      }
    }
  }
  &.trailing {
    .s-leading__wrapper {
      @apply flex-row-reverse;
    }
  }
}
</style>
