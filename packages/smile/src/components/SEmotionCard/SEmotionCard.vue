<template>
  <div class="sui_emotion_card">
    <div :class="['emotion_card', selected && 'selected']">
      <SmIcon :icon="icon" :color="selected ? 'rgb(10, 158, 154)' : ''"></SmIcon>
    </div>
    <label class="emotion_card_label">{{ label }}</label>
  </div>
</template>
<script setup lang="ts">
import { IconType } from '../../interfaces';

defineProps<{
  label: string;
  icon: IconType;
  selected?: boolean;
}>();
</script>
<style src="./SEmotionCard.scss" scoped></style>
