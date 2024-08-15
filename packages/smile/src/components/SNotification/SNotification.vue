<template>
  <!-- <transition-group
    tag="ul"
    class="s-notification-stack"
    name="s-notification-stack"
    @enter="onEnter"
    @leave="onLeave"
  >
    <li v-for="(notify, i) in notifications" :key="notify.id">
      <SNotificationItem v-bind="notify" :class="{ current: [currentPage - 1 == i] }" />
    </li>
    <SNotificationCarousel
      v-if="carousel"
      v-model:currentPage="currentPage"
      :totalPages="notifications.length"
    />
  </transition-group> -->
  <SmCarousel v-model="slide" :actionsInline="carouselActionsAlt" :actionsDefault="carousel">
    <template #default="{ currentSlide, totalCurrent }">
      <s-carousel-slide
        v-for="(item, i) in notifications"
        :key="i"
        :id="`s-carousel__slide${i + 1}`"
        :title="item.title"
        :description="item.message"
        :image="''"
      >
        <s-notification-item
          :id="item.id"
          :type="item.type"
          :title="item.title"
          :message="item.message"
          :action="item.action"
          :contentInline="item.contentInline"
          :counterAlt="carouselActionsAlt ? `${currentSlide}/${totalCurrent}` : undefined"
        ></s-notification-item>
      </s-carousel-slide>
    </template>
  </SmCarousel>
</template>
<script lang="ts" setup>
import { smNotifications } from '~/interfaces';

const props = withDefaults(defineProps<smNotifications>(), {
  carousel: false,
  modelValue: 1,
  carouselActionsAlt: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const slide = computed({
  get: () => props.modelValue,
  set: (value: number) => emit('update:modelValue', value),
});

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
