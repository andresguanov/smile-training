<template>
  <div class="s-carousel">
    <transition-group name="slide" tag="div" class="slide-container">
      <slot>
        <template v-if="items?.length">
          <s-carousel-slide
            v-for="(slide, index) in items"
            :id="simpleUid()"
            :key="index"
            :title="slide.title"
            :description="slide.description"
            :banner-image="slide.bannerImage"
            :class="['slide', { active: index === currentSlide }]"
          />
        </template>
      </slot>
    </transition-group>
    <div class="s-carousel__actions">
      <button @click="prevSlide">Prev</button>

      <button @click="nextSlide">Next</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { sCarouselProps } from '~/interfaces';
import { simpleUid } from '~/utils/uid';

const props = defineProps<sCarouselProps>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void;
}>();

const currentSlide = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + props.items.length) % props.items.length;
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.items.length;
};
</script>

<style scoped>
.s-carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__actions {
    display: flex;
    gap: 1rem;
  }
}

.slide-container {
  position: relative;
  width: 400px;
  height: 300px;
  overflow: hidden;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.slide.active {
  opacity: 1;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}
</style>
