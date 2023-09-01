<template>
  <div class="s-toggle sm-input-container">
    <span ref="toggleElement" v-sm-simple-uid>
      <label :class="[`s-toggle-input`, { 's-toggle-disabled': disabled }]">
        <input
          v-model="data"
          v-bind="$attrs"
          :disabled="disabled"
          type="checkbox"
          @focusout="onFocusOut"
        />
        <span class="s-toggle-slider"></span>
        <span v-if="label" class="s-label-text">{{ label }}</span>
      </label>
    </span>

    <sm-hint v-if="toggleElement && hasError && errorListContent" :to="`#${toggleElement.id}`">
      <template #content>
        <sm-error-list :error-messages="errorListContent as Array<string>" />
      </template>
    </sm-hint>
  </div>
</template>

<script lang="ts" setup>
import { smSimpleUid as vSmSimpleUid } from '../../directives';
import { useVModel } from '@vueuse/core';
import { SmHint, SmErrorList } from '../index';
import {
  LabelProps as labelProps,
  InputProps as inputProps,
  ValidateProps as validateProps,
  ToggleProps as toggleProps,
  useValidate,
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
const { validate, hasError, errorListContent, validateOnFocusout } = useValidate(
  data,
  props.rules || [],
  props.error,
  props.errorMessages
);

const onFocusOut = () => {
  if (validateOnFocusout.value) {
    validate();
  }
  emit('on:focusout');
};

defineExpose({ validate });
</script>

<style scoped lang="scss" src="./SToggle.scss"></style>
