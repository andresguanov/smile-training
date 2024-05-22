<template>
  <div class="s-loader" :class="{ inline: isInline }">
    <div
      v-if="magic"
      class="s-loader__magic"
      :style="{ width: dimensions.magic, height: dimensions.magic }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 45 45"
        fill="none"
        class="s-loader__star s-loader__star--left s-loader__star--center"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22.4999 -0.000244141C23.8806 -0.000244141 24.9999 1.11905 24.9999 2.49977C24.9999 7.14109 26.8437 11.5923 30.1256 14.8742C33.4075 18.1561 37.8587 19.9999 42.5 19.9999C43.8807 19.9999 45 21.1192 45 22.4999C45 23.8806 43.8807 24.9999 42.5 24.9999C37.8587 24.9999 33.4075 26.8437 30.1256 30.1256C26.8437 33.4075 24.9999 37.8587 24.9999 42.5C24.9999 43.8807 23.8806 45 22.4999 45C21.1192 45 19.9999 43.8807 19.9999 42.5C19.9999 37.8587 18.1561 33.4075 14.8742 30.1256C11.5923 26.8437 7.14109 24.9999 2.49977 24.9999C1.11905 24.9999 -0.000244141 23.8806 -0.000244141 22.4999C-0.000244141 21.1192 1.11905 19.9999 2.49977 19.9999C7.14109 19.9999 11.5923 18.1561 14.8742 14.8742C18.1561 11.5923 19.9999 7.14109 19.9999 2.49977C19.9999 1.11905 21.1192 -0.000244141 22.4999 -0.000244141Z"
          fill="currentColor"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 45 45"
        fill="none"
        class="s-loader__star s-loader__star--small s-loader__star--top s-loader__star--right"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22.4999 -0.000244141C23.8806 -0.000244141 24.9999 1.11905 24.9999 2.49977C24.9999 7.14109 26.8437 11.5923 30.1256 14.8742C33.4075 18.1561 37.8587 19.9999 42.5 19.9999C43.8807 19.9999 45 21.1192 45 22.4999C45 23.8806 43.8807 24.9999 42.5 24.9999C37.8587 24.9999 33.4075 26.8437 30.1256 30.1256C26.8437 33.4075 24.9999 37.8587 24.9999 42.5C24.9999 43.8807 23.8806 45 22.4999 45C21.1192 45 19.9999 43.8807 19.9999 42.5C19.9999 37.8587 18.1561 33.4075 14.8742 30.1256C11.5923 26.8437 7.14109 24.9999 2.49977 24.9999C1.11905 24.9999 -0.000244141 23.8806 -0.000244141 22.4999C-0.000244141 21.1192 1.11905 19.9999 2.49977 19.9999C7.14109 19.9999 11.5923 18.1561 14.8742 14.8742C18.1561 11.5923 19.9999 7.14109 19.9999 2.49977C19.9999 1.11905 21.1192 -0.000244141 22.4999 -0.000244141Z"
          fill="currentColor"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 45 45"
        fill="none"
        class="s-loader__star s-loader__star--small s-loader__star--bottom s-loader__star--right"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22.4999 -0.000244141C23.8806 -0.000244141 24.9999 1.11905 24.9999 2.49977C24.9999 7.14109 26.8437 11.5923 30.1256 14.8742C33.4075 18.1561 37.8587 19.9999 42.5 19.9999C43.8807 19.9999 45 21.1192 45 22.4999C45 23.8806 43.8807 24.9999 42.5 24.9999C37.8587 24.9999 33.4075 26.8437 30.1256 30.1256C26.8437 33.4075 24.9999 37.8587 24.9999 42.5C24.9999 43.8807 23.8806 45 22.4999 45C21.1192 45 19.9999 43.8807 19.9999 42.5C19.9999 37.8587 18.1561 33.4075 14.8742 30.1256C11.5923 26.8437 7.14109 24.9999 2.49977 24.9999C1.11905 24.9999 -0.000244141 23.8806 -0.000244141 22.4999C-0.000244141 21.1192 1.11905 19.9999 2.49977 19.9999C7.14109 19.9999 11.5923 18.1561 14.8742 14.8742C18.1561 11.5923 19.9999 7.14109 19.9999 2.49977C19.9999 1.11905 21.1192 -0.000244141 22.4999 -0.000244141Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <SmIcon
      v-else
      :height="dimensions.icon"
      :width="dimensions.icon"
      icon="loading-spinner"
      class="s-loader__icon"
    />
    <span v-if="label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isInline?: boolean;
    label?: string;
    magic?: boolean;
  }>(),
  {
    isInline: false,
    label: '',
    magic: false,
  }
);
const dimensions = computed(() => {
  return {
    magic: props.isInline ? '20px' : '100%',
    icon: props.isInline ? '20px' : '50%',
  };
});
</script>
<style scoped lang="scss" src="./SLoader.scss"></style>
<style scoped lang="scss">
.s-loader {
  &__magic {
    @apply relative;
  }
  &__star {
    @apply text-sm-primary-500 w-[56.25%] h-[56.25%];
    @apply absolute;
    animation: zoom-and-rotate 1.5s cubic-bezier(0.19, 1, 0.22, 1) infinite both;
    // animation: zoom-and-rotate 1.5s cubic-bezier(0.39, 0.575, 0.565, 1) infinite both;

    &--small {
      @apply w-1/4 h-1/4;
    }
    &--center {
      @apply top-0 bottom-0 my-auto;
    }
    &--left {
      left: 14%;
    }
    &--right {
      right: 14%;
    }
    &--top {
      top: 14%;
    }
    &--bottom {
      bottom: 14%;
    }
  }
}
@keyframes zoom-and-rotate {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(0) rotate(-360deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
</style>
