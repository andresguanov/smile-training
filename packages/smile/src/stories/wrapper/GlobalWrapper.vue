<script lang="ts" setup>
import type { Story, Variant } from 'histoire';
import { ref } from 'vue';

type AlegraTheme =
  | 'sm-primary-alegra'
  | 'sm-primary-smile'
  | 'sm-primary-alanube'
  | 'sm-primary-alegra-next';

const props = defineProps<{
  story: Story;
  variant?: Variant;
}>();

const dataTheme = ref<AlegraTheme>('sm-primary-alegra');

const changeTheme = (theme: AlegraTheme) => {
  dataTheme.value = theme;
};
</script>

<template>
  <div :sm-data-theme="dataTheme" class="global-wrapper">
    <slot />
    <div class="">
      <button class="">Temas</button>
      <ul>
        <li>
          <button class="" @click="changeTheme('sm-primary-alegra')">Alegra</button>
        </li>
        <li>
          <button class="" @click="changeTheme('sm-primary-alegra-next')">Alegra Next</button>
        </li>
        <li>
          <button class="" @click="changeTheme('sm-primary-alanube')">Alanube</button>
        </li>
        <li>
          <button class="" @click="changeTheme('sm-primary-smile')">
            Smile (solo para pruebas)
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
