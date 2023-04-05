<template>
  <sm-label v-bind="$props" :error="hasError">
    <div
      ref="inputElement"
      :class="[
        'sm-input',
        `sm-input-${size}`,
        `sm-text-${size}`,
        { 'sm-input-error': hasError },
        { 'sm-input-disabled': disabled },
      ]"
      v-sm-simple-uid
    >
      <slot name="before" />
      <input
        v-model="data"
        :disabled="disabled"
        :placeholder="placeholder"
        :type="nativeType || 'text'"
        :required="required"
        @focusout="onFocusOut"
      />
      <slot name="after" />
    </div>
    <sm-hint v-if="hasError && inputElement && errorListContent" :to="`#${inputElement.id}`">
      <template #content>
        <sm-error-list :error-messages="(errorListContent as Array<string>)" />
      </template>
    </sm-hint>
  </sm-label>
</template>

<script lang="ts" setup>
import { smSimpleUid as vSmSimpleUid } from '../../directives';
import {
  LabelProps as labelProps,
  InputProps as inputProps,
  ValidateProps as validateProps,
  useValidate,
} from '../../composables';

const props = defineProps({
  modelValue: String,
  ...labelProps,
  ...inputProps,
  ...validateProps,
});
const emit = defineEmits(['update:modelValue', 'on:focusout']);
const data = useVModel(props, 'modelValue', emit);
const inputElement = ref<HTMLInputElement | null>(null);
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

defineExpose({ validate, hasError: hasError.value });
</script>

<style lang="scss" scoped>
@import './SmInput.scss';

.sm-input {
  @apply cursor-text;
  @apply flex items-center;
  @apply gap-2;

  > input {
    @apply w-full;
  }
}
</style>
