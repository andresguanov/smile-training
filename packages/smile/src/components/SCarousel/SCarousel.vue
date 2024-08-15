<template>
  <div class="s-carousel">
    <transition-group name="slide" tag="div" class="slide-container">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        :class="['slide', { active: index === currentSlide }]"
      >
        <img :src="slide.image" alt="Slide Image" />
        <h3>{{ slide.title }}</h3>
        <p>{{ slide.description }}</p>
      </div>
    </transition-group>
    <div class="s-carousel__actions">
      <button @click="prevSlide">Prev</button>

      <button @click="nextSlide">Next</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { sCarouselProps } from '~/interfaces';

defineProps<sCarouselProps>();

const currentSlide = ref(0);
const slides = ref([
  {
    image: 'path/to/image1.jpg',
    title: 'Slide 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    image: 'path/to/image2.jpg',
    title: 'Slide 2',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    image: 'path/to/image3.jpg',
    title: 'Slide 3',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
]);

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};
</script>

<style scoped>
.s-carousel {
  display: flex;
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
