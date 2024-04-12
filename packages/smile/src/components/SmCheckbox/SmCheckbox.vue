<template>
  <div class="sm-input-container">
    <span ref="checkboxElement" v-sm-simple-uid>
      <sm-label
        v-bind="$props"
        :class="[
          'sm-checkbox',
          sizeClass,
          { 'sm-checkbox-disabled': disabled },
          { 'label-to-left': labelToLeft },
        ]"
        :error="hasError"
      >
        <input
          v-model="data"
          v-bind="$attrs"
          :disabled="disabled"
          type="checkbox"
          @focusout="onFocusOut"
        />
        <span class="sm-checkbox-box"></span>
      </sm-label>
    </span>
    <sm-hint v-if="checkboxElement && hasError && errorListContent" :to="`#${checkboxElement.id}`">
      <template #content>
        <sm-error-list :error-messages="errorListContent" />
      </template>
    </sm-hint>
  </div>
</template>

<script lang="ts" setup>
import { smSimpleUid as vSmSimpleUid } from '../../directives';
import { useVModel } from '@vueuse/core';
import { SmLabel, SmHint, SmErrorList } from '../index';
import { useValidate } from '../../composables';

const props = defineProps<{
  label: string;
  modelValue?: boolean;
  error?: boolean;
  size?: 'small' | 'medium' | 'large';
  required?: boolean;
  errorMessages?: Array<string>;
  disabled?: boolean;
  labelToLeft?: boolean;
  rules?: Array<(value: any) => boolean | string>;
}>();

const emit = defineEmits(['update:modelValue', 'on:focusout']);
const data = useVModel(props, 'modelValue', emit);
const checkboxElement = ref<HTMLSpanElement | null>(null);
const { rules, validate, hasError, errorListContent, validateOnFocusout } = useValidate(
  data,
  props.error,
  props.errorMessages
);
const sizeClass = computed(() => {
  let size = props.size || 'medium';
  return `sm-checkbox-${size}`;
});

const onFocusOut = () => {
  if (validateOnFocusout.value) {
    validate();
  }
  emit('on:focusout');
};

watch(
  () => props.rules,
  () => {
    rules.value = props.rules ?? [];
  },
  { immediate: true }
);

defineExpose({ validate });
</script>

<style scoped lang="scss">
@import './SmCheckbox.scss';
</style>
