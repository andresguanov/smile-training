<template>
  <div class="s-top-notification" :class="type">
    <div v-if="type !== 'neutral'" class="s-top-notification__icon">
      <sm-icon size="medium" :icon="TOAST_ICONS[type]" />
    </div>
    <div class="s-top-notification__wrapper">
      <div class="s-top-notification__body">
        <h4 class="s-top-notification__title" v-html="title" />
        <p class="s-top-notification__description" v-html="message" />
      </div>
      <div v-if="action" class="s-top-notification-actions">
        <button class="s-top-notification__button" @click="action?.action">
          {{ action.label }}
        </button>
      </div>
    </div>
    <div class="s-top-notification__append">
      <div v-if="appendAlt" class="s-top-notification__alt">
        <slot name="append-alt">
          {{ appendAlt }}
        </slot>
      </div>
      <button class="s-top-notification__close" @click="emit('close')">
        <sm-icon size="small" icon="close" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconType, ToastTypes, smNotification } from '~/interfaces';

const props = withDefaults(
  defineProps<
    { appendAlt?: boolean | string } & Omit<smNotification, 'contentInline' | 'counterAlt'>
  >(),
  {
    type: 'neutral',
    time: 5000,
  }
);

const emit = defineEmits<{
  (event: 'close'): void;
}>();

// const currentPage = ref(1);

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

<style src="./STopNotificationItem.styles.scss" lang="scss" scoped></style>
