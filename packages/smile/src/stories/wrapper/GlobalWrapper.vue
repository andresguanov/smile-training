<script lang="ts" setup>
import { ref } from 'vue';

type AlegraTheme =
  | 'sm-primary-alegra'
  | 'sm-primary-smile'
  | 'sm-primary-alanube'
  | 'sm-primary-alegra-next';

const dataTheme = ref<AlegraTheme>('sm-primary-alegra');
const isControlOpen = ref(false);

const changeTheme = (theme: AlegraTheme) => {
  dataTheme.value = theme;
};
const toggleControl = () => (isControlOpen.value = !isControlOpen.value);
</script>

<template>
  <div :sm-data-theme="dataTheme" class="global-wrapper">
    <slot />
    <div class="theme-control">
      <button class="theme-control__main" title="Temas" @click="toggleControl()" />
      <ul class="theme-control__options" :class="{ open: isControlOpen }">
        <li>
          <button
            class="theme-control__alegra"
            title="Alegra"
            @click="changeTheme('sm-primary-alegra')"
          />
        </li>
        <li>
          <button
            class="theme-control__alegra-next"
            title="Alegra Next"
            @click="changeTheme('sm-primary-alegra-next')"
          />
        </li>
        <li>
          <button
            class="theme-control__alanube"
            title="Alanube"
            @click="changeTheme('sm-primary-alanube')"
          />
        </li>
        <li>
          <button
            class="theme-control__smile"
            title="Smile"
            @click="changeTheme('sm-primary-smile')"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.theme-control {
  @apply fixed bottom-3 right-3;
  @apply flex items-center justify-center;

  button {
    @apply rounded-full border border-solid border-slate-600;
    @apply relative flex items-center justify-center;

    &:hover {
      &::after {
        @apply opacity-100;
      }
    }
    &::after {
      content: attr(title);
      @apply bg-slate-900 text-white text-xs;
      @apply p-1 rounded-md absolute right-full mr-1;
      @apply whitespace-nowrap opacity-0;
    }
  }
  &__main {
    @apply bg-sm-primary-600 w-12 h-12;
  }
  &__options {
    @apply opacity-0 -z-10 transition-opacity;
    @apply absolute bottom-12 mb-1 space-y-1;

    &.open {
      @apply opacity-100 z-10;
    }
  }
  &__alegra,
  &__alegra-next,
  &__alanube,
  &__smile {
    @apply w-8 h-8;
  }
  &__alegra {
    background-color: rgb(10, 158, 154);
  }
  &__smile {
    background-color: rgb(184, 80, 30);
  }
  &__alanube {
    background-color: rgb(115, 111, 226);
  }
  &__alegra-next {
    background-color: rgb(48, 171, 169);
  }
}
</style>
