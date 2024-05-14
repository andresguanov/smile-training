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
      :height="dimensions.lottie"
      :width="dimensions.lottie"
      :style="lottieStyles"
    />
    <SmIcon
      v-else
      :height="dimensions.icon"
      :width="dimensions.icon"
      icon="loading-spinner"
      class="s-loader__icon"
    />
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie';
import animationData from '../../assets/loading-lottie.json';

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
const dimensions = computed(() => {
  return {
    lottie: props.isInline ? '20px' : '100%',
    icon: props.isInline ? '20px' : '50%',
  };
});
</script>

<style scoped lang="scss" src="./SLoader.scss"></style>
