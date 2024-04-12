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
      v-sm-simple-uid="'sm-input'"
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
        <sm-error-list :error-messages="errorListContent" />
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
const emit = defineEmits<{
  (event: 'update:modelValue', value?: string): void;
  (event: 'blur' | 'focus', value: FocusEvent): void;
}>();
const data = useVModel(props, 'modelValue', emit);
const inputElement = ref<HTMLInputElement | null>(null);
// const internalError = toRef(props.error)
const { validate, rules, hasError, errorListContent, validateOnFocusout } = useValidate(
  data,
  props.error,
  props.errorMessages
);

const onFocusOut = (event: FocusEvent) => {
  if (validateOnFocusout.value) {
    validate();
  }
  emit('blur', event);
};

watch(
  () => props.rules,
  () => {
    rules.value = props.rules ?? [];
  },
  { immediate: true }
);

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
