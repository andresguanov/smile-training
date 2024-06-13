<template>
  <div class="htw-p-2 htw-flex htw-gap-2">
    <label :for="uid" class="htw-w-28">{{ label }}</label>
    <input
      :id="uid"
      v-model="value"
      :type="type"
      class="htw-py-1 htw-px-2 htw-border htw-rounded-sm htw-border-black/25"
    />
  </div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const props = defineProps<{
  label: string;
  uid: string;
  modelValue: Date;
  type: 'date' | 'text';
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: Date): void;
}>();

const value = useVModel(props, 'modelValue', emit);
</script>

<style lang="scss" scoped></style>
