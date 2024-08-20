<template>
  <div class="s-notification" :class="type">
    <div
      v-if="type !== 'neutral'"
      class="s-notification__icon"
      :class="{ 'content-inline': contentInline }"
    >
      <sm-icon size="medium" :icon="TOAST_ICONS[type]" />
    </div>
    <div class="s-notification__wrapper">
      <div class="s-notification__body" :class="{ 'content-inline': contentInline }">
        <h4 class="s-notification__title" v-html="title" />
        <p class="s-notification__description" v-html="message" />
      </div>
      <div v-if="action" class="s-notification-actions">
        <button class="s-notification__button" @click="action?.action">
          {{ action.label }}
        </button>
      </div>
    </div>
    <div class="relative">
      <button class="s-notification__close" @click="emit('close')">
        <sm-icon size="small" icon="close" />
      </button>
      <div v-if="counterAlt" class="s-notification__alt">
        {{ counterAlt }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconType, ToastTypes, smNotification } from '../../../interfaces';

const props = withDefaults(defineProps<smNotification>(), {
  type: 'neutral',
  time: 5000,
});

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
// const timeOutCallback = ref<number | null>(null);

// onMounted(() => {
//   if (!props.persistent) {
//     timeOutCallback.value = window.setTimeout(() => emit('close'), props.time);
//   }
// });
// onBeforeUnmount(() => {
//   if (timeOutCallback.value) {
//     window.clearTimeout(timeOutCallback.value);
//   }
// });
</script>

<style src="./SNotificationItem.styles.scss" lang="scss" scoped></style>
