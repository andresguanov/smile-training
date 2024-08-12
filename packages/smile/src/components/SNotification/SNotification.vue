<template>
  <transition-group
    tag="ul"
    class="s-notification-stack"
    name="s-notification-stack"
    @enter="onEnter"
    @leave="onLeave"
  >
    <li v-for="(notify, i) in notifications" :key="notify.id">
      <SNotificationItem v-bind="notify" :class="{ current: [currentPage - 1 == i] }" />
    </li>
    <!-- <SNotificationItem v-bind="notifications[currentPage - 1]" /> -->
    <SNotificationCarousel
      v-if="carousel"
      v-model:currentPage="currentPage"
      :totalPages="notifications.length"
    />
  </transition-group>
</template>
<script lang="ts" setup>
import { smNotifications } from '~/interfaces';

withDefaults(defineProps<smNotifications>(), {
  carousel: false,
});

const currentPage = ref(1);

const DURATION = 750;

function onEnter(el: Element, done: () => void) {
  el.classList.add('sm-alert-slide-in');
  setTimeout(() => done(), DURATION);
}

function onLeave(el: Element, done: () => void) {
  el.classList.add('sm-alert-slide-out');
  setTimeout(() => done(), DURATION);
}

function remove(index: number) {
  // if (index > -1) stack.value.splice(index, 1)
  //   alertStore.removeAlert(index);
}
</script>
<style lang="scss" scoped>
.s-notification-stack {
  :deep(.s-notification) {
    @apply hidden;
    &.current {
      @apply flex;
    }
  }
}

.sm-alert-stack {
  @apply fixed right-0 top-0 w-96;
  @apply z-[100];
}

.sm-alert-stack-move,
.sm-alert-stack-enter-active,
.sm-alert-stack-leave-active {
  @apply transition-transform duration-500;
}

.sm-alert-stack-enter-from,
.sm-alert-stack-leave-to {
  @apply translate-x-96;
}

.sm-alert-stack-leave-active {
  @apply absolute;
}
</style>
