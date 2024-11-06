<template>
  <li :id="id" tabindex="0" class="s-carousel-slide">
    <slot>
      <div class="s-carousel__slide">
        <img :src="bannerImage" alt="slide" />
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>
    </slot>
  </li>
</template>
<script lang="ts" setup>
import { sCarouselSlide } from '~/interfaces';
defineProps<sCarouselSlide>();
</script>
<style lang="scss" scoped>
.s-carousel__slide {
  @apply w-full relative;
  @apply flex flex-col items-center justify-center;
  @apply snap-center;
  img {
    @apply aspect-square;
  }
}
</style>
