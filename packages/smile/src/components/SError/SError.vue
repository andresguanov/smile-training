<template>
  <transition name="fade">
    <div v-if="isShowing" class="s-error-list">
      <sm-icon icon="info" type="error" size="small" fluid />
      <p class="s-error-list__message">{{ error }}</p>
    </div>
  </transition>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    error: string;
    isShowing?: boolean;
  }>(),
  {
    isShowing: true,
  }
);
</script>

<style scoped lang="scss">
.s-error-list {
  @apply flex items-center;
  // @apply opacity-0 -z-10;

  // &.is-showing {
  @apply opacity-100 z-auto;
  // }
  &__message {
    @apply ml-1;
    @apply text-rose-600 text-xs font-normal;
  }
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-[opacity_transform] duration-500;
}

.fade-enter-from,
.fade-leave-to {
  @apply -translate-y-3;
  @apply opacity-0;
}
</style>
