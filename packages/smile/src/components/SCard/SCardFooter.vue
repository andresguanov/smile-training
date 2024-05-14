<template>
  <div class="w-full h-full">
    <s-button
      class="w-full"
      native-type="submit"
      @click="handleClick"
      :label="labelBtn"
      :icon-right="icon"
    />
  </div>
</template>
<script setup lang="ts">
import { IconType } from '~/interfaces';
withDefaults(
  defineProps<{
    labelBtn?: string;
    icon?: IconType;
  }>(),
  {
    labelBtn: 'Siguiente',
  }
);

const emit = defineEmits<{
  (e: 'clickBtn'): void;
}>();

const handleClick = () => emit('clickBtn');
</script>
<style lang="scss" scoped></style>
