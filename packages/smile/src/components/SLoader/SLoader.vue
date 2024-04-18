<template>
  <div
    class="s-loader"
    :class="[
      {
        inline: isInline,
      },
    ]"
  >
    <Vue3Lottie
      v-if="magic"
      :animationData="animationData"
      :height="isInline ? '20px' : '100%'"
      :width="isInline ? '20px' : '100%'"
      :style="lottieStyles"
    />
    <SmIcon
      icon="loading"
      :height="isInline ? '20px' : '100%'"
      :width="isInline ? '20px' : '100%'"
      v-else
      class="s-loader__icon"
    />
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie';
import animationData from '../../assets/loading-lottie.json';
const defaultOptions = { animationData };

const props = withDefaults(
  defineProps<{
    isInline: boolean;
    label?: string;
    magic?: boolean;
  }>(),
  {
    isInline: false,
    label: '',
    magic: false,
  }
);
const lottieStyles = computed(
  () => `
  --lottie-animation-container-width: ${props.isInline ? '20px' : '100%'};
  --lottie-animation-container-height: ${props.isInline ? '20px' : '100%'};
  --lottie-animation-container-background-color: transparent;
  --lottie-animation-margin: 0;
`
);
</script>

<style scoped lang="scss" src="./SLoader.scss"></style>
