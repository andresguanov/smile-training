<template>
  <Transition>
    <SmCarousel v-if="showNotification" v-model="slide" :actionsDefault="carousel" actions-hidden>
      <template #default="{ currentSlide, handlerCurrentSlide, totalCurrent }">
        <s-carousel-slide
          v-for="(item, i) in notifications"
          :key="i"
          :id="`s-carousel__slide${i + 1}`"
          :title="item.title"
          :description="item.message"
        >
          <s-top-notification-item
            :id="item.id"
            :type="item.type"
            :title="item.title"
            :message="item.message"
            :action="item.action"
            :contentInline="item.contentInline"
            :appendAlt="carousel"
            @close="handleClose"
          >
            <template #append-alt>
              <s-carousel-actions
                :current-page="currentSlide"
                @update:current-page="handlerCurrentSlide"
                :totalPages="totalCurrent"
              />
            </template>
          </s-top-notification-item>
        </s-carousel-slide>
      </template>
    </SmCarousel>
  </Transition>
</template>
<script lang="ts" setup>
import { smNotifications } from '~/interfaces';

const props = withDefaults(defineProps<Omit<smNotifications, 'carouselActionsAlt'>>(), {
  carousel: false,
  slide: 1,
  modelValue: true,
});

const emit = defineEmits<{
  (e: 'update:slide', value: number): void;
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();

const slide = computed({
  get: () => props.slide,
  set: (value: number) => emit('update:slide', value),
});

const showNotification = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

const handleClose = () => {
  showNotification.value = false;
  emit('close');
};
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

.v-enter-active {
  transition: opacity 1s ease;
}
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
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
