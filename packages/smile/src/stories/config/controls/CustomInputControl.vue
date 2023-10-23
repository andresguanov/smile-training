<template>
  <div>
    <label :for="uid">{{ label }}</label>
    <input :id="uid" v-model="value" :type="type" />
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
