<template>
  <div class="s-toggle sm-input-container">
    <span ref="toggleElement" v-sm-simple-uid>
      <label :class="[`s-toggle-input`, { 's-toggle-disabled': disabled }]">
        <input v-model="data" v-bind="$attrs" :disabled="disabled" type="checkbox" />
        <span class="s-toggle-slider"></span>
        <span v-if="label" class="s-label-text">{{ label }}</span>
      </label>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { smSimpleUid as vSmSimpleUid } from '../../directives';
import { useVModel } from '@vueuse/core';
import {
  LabelProps as labelProps,
  InputProps as inputProps,
  ValidateProps as validateProps,
  ToggleProps as toggleProps,
} from '../../composables';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  ...labelProps,
  ...inputProps,
  ...toggleProps,
  ...validateProps,
});
const emit = defineEmits(['update:modelValue', 'on:focusout']);
const data = useVModel(props, 'modelValue', emit);
const toggleElement = ref<HTMLSpanElement | null>(null);
// TODO: Agregar validación por SForm
</script>

<style scoped lang="scss" src="./SToggle.scss"></style>
