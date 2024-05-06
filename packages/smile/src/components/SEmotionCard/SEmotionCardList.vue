<template>
  <div class="sui_card_emotion_list">
    <emotion-card
      v-for="(option, i) in options"
      :key="`${i}-sui-${option}-emotion-card`"
      :label="option.label"
      :icon="option.icon"
      :selected="option.id === props.modelValue"
      @click="emit('update:modelValue', option.id)"
    ></emotion-card>
  </div>
</template>
<script setup lang="ts">
import EmotionCard from './SEmotionCard.vue';
import { EmotionCardOptions } from '../../interfaces';

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null;
    options?: EmotionCardOptions;
  }>(),
  {
    options: () => [
      {
        id: 'hard',
        label: 'Fue difícil',
        icon: 'mood-sad',
      },
      {
        id: 'neutral',
        label: 'Neutral',
        icon: 'mood-empty',
      },
      {
        id: 'easy',
        label: 'Fue fácil',
        icon: 'mood-happy',
      },
    ],
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

// const default_options: EmotionCardOptions = [
//   {
//     id: 'hard',
//     label: 'Fue difícil',
//     icon: 'mood-sad',
//   },
//   {
//     id: 'neutral',
//     label: 'Neutral',
//     icon: 'mood-empty',
//   },
//   {
//     id: 'easy',
//     label: 'Fue fácil',
//     icon: 'mood-happy',
//   },
// ];
</script>
<style lang="scss" scoped>
.sui_card_emotion_list {
  @apply py-2 flex gap-x-1;
}
</style>
