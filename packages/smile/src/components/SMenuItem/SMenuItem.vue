<template>
  <div class="s-menu-item" :class="{ destructive, disabled, divider }">
    <div class="s-menu-item__leading" v-if="$slots['leading']">
      <slot name="leading" />
    </div>
    <img v-if="avatar" class="s-menu-item__image" :src="avatar" :alt="title" />
    <sm-icon v-if="icon" :icon="icon" width="20px" height="20px" fluid />
    <div class="s-menu-item__text" :class="[textStyle]">
      <p :class="{ 's-menu-item__text__title': description }" :style="titleStyle">{{ title }}</p>
      <p v-if="description" class="s-menu-item__text__description" :style="descriptionStyle">
        {{ description }}
      </p>
    </div>
    <div class="s-menu-item__trailing" v-if="$slots['trailing']">
      <slot name="trailing" />
    </div>
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
    divider?: boolean;
  }>(),
  { textStyle: 'inline' }
);
</script>

<style lang="scss" scoped src="./SMenuItem.scss"></style>
