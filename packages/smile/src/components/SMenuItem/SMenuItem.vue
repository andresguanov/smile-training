<template>
  <div class="s-menu-item" :class="{ destructive, disabled }">
    <slot name="leading" />
    <img v-if="avatar" class="s-menu-item__image" :src="avatar" :alt="title" />
    <sm-icon v-if="icon" :icon="icon" width="20px" height="20px" fluid />
    <div class="s-menu-item__text" :class="[textStyle]">
      <p :class="{ 's-menu-item__text__title': description }" :style="titleStyle">{{ title }}</p>
      <p v-if="description" class="s-menu-item__text__description" :style="descriptionStyle">
        {{ description }}
      </p>
    </div>
    <slot name="trailing" />
  </div>
</template>

<script setup lang="ts">
import type { IconType } from '../../interfaces';

withDefaults(
  defineProps<{
    title: string;
    destructive?: boolean;
    descriptionStyle?: string;
    disabled?: boolean;
    textStyle?: 'inline' | 'block';
    avatar?: string;
    icon?: IconType;
    description?: string;
    titleStyle?: string;
  }>(),
  { textStyle: 'inline' }
);
</script>

<style lang="scss" scoped src="./SMenuItem.scss"></style>
