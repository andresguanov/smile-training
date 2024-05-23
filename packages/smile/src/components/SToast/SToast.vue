<template>
  <div class="s-toast" :class="type">
    <div v-if="type !== 'neutral'" class="s-toast__icon">
      <sm-icon size="large" :icon="TOAST_ICONS[type]" />
    </div>
    <div class="s-toast__body" :class="{ 'has-title': Boolean(title) }">
      <h4 v-if="title" class="s-toast__title" v-html="title" />
      <div class="s-toast__description" v-html="message" />
      <div v-if="action">
        <button class="s-toast__button" @click="action?.action">
          {{ action.label }}
        </button>
      </div>
    </div>
    <div>
      <button class="s-toast__close" @click="emit('close')">
        <sm-icon icon="close" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconType, ToastTypes, smAlert } from '../../interfaces';

const props = withDefaults(defineProps<smAlert>(), {
  type: 'neutral',
  time: 7500,
});
const emit = defineEmits<{
  (event: 'close'): void;
}>();

const TOAST_ICONS: Record<ToastTypes, IconType> = {
  error: 'ban',
  success: 'success',
  warning: 'alert-triangle',
  info: 'info',
  neutral: 'close',
};
const timeOutCallback = ref<number | null>(null);

onMounted(() => {
  if (!props.persistent) {
    timeOutCallback.value = window.setTimeout(() => emit('close'), props.time);
  }
});
onBeforeUnmount(() => {
  if (timeOutCallback.value) {
    window.clearTimeout(timeOutCallback.value);
  }
});
</script>

<style lang="scss" scoped>
.s-toast {
  @apply p-2 shadow-xl rounded-xl;
  @apply border border-solid;
  @apply flex gap-2;
  @apply bg-slate-800 border-transparent;

  &__body {
    @apply py-1.5 flex-1 flex gap-1 items-baseline justify-between;

    &.has-title {
      @apply flex-col;
    }
  }
  &__title,
  &__description {
    @apply px-2;
  }
  &__title {
    @apply text-sm font-semibold text-white;
  }
  &__description {
    @apply text-sm font-normal text-white/80;
  }
  &__close {
    @apply text-white cursor-pointer p-2 flex items-center justify-center;
  }
  &__icon {
    @apply pl-2 pt-1.5;
  }
  &__button {
    @apply px-2 py-1.5 text-sm font-normal text-sm-primary-300;
  }

  &.success,
  &.error,
  &.warning,
  &.info {
    .s-toast__title {
      @apply text-slate-900;
    }
    .s-toast__description {
      @apply text-slate-700;
    }
    .s-toast__close {
      @apply text-slate-700;
    }
  }
  &.success {
    @apply bg-green-100 border-green-600/20;

    .s-toast__icon,
    .s-toast__button {
      @apply text-green-700;
    }
  }
  &.error {
    @apply bg-rose-100 border-rose-600/20;

    .s-toast__icon,
    .s-toast__button {
      @apply text-rose-700;
    }
  }
  &.warning {
    @apply bg-amber-100 border-amber-600/20;

    .s-toast__icon,
    .s-toast__button {
      @apply text-amber-700;
    }
  }
  &.info {
    @apply bg-indigo-100 border-indigo-600/20;

    .s-toast__icon,
    .s-toast__button {
      @apply text-indigo-700;
    }
  }
}
</style>
