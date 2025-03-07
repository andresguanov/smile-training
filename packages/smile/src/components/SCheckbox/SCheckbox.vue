<template>
  <div class="s-checkbox">
    <p v-if="label" class="s-checkbox__label">{{ label }}</p>
    <div class="s-checkbox__group" :class="[orientation]" @focusout="onFocusOut">
      <label
        v-for="(option, i) in options"
        :key="i"
        :class="{ 's-checkbox__checkbox--disabled': option.disabled }"
        class="s-checkbox__checkbox"
      >
        <input
          v-model="internalValue"
          :value="option.value"
          :disabled="option.disabled"
          :indeterminate="option.indeterminate"
          type="checkbox"
          class="s-checkbox__checkbox__input"
        />
        <span class="s-checkbox__checkbox__label"> {{ option.label }} </span>
      </label>
    </div>
    <s-error :error="currentError" :is-showing="hasError" />
  </div>
</template>

<script setup lang="ts">
import { useSmileValidate } from '~/composables';

const props = withDefaults(
  defineProps<{
    modelValue: string[] | boolean;
    options?: {
      value?: string;
      label: string;
      disabled?: boolean;
      indeterminate?: boolean;
    }[];
    /**
     * Identificador para la validación, solo funciona para el dientificador
     * de validación. No se usa como id de los inputs.
     */
    id?: string;
    label?: string;
    orientation?: 'horizontal' | 'vertical';
    /**
     * Disponible solo cuando el componente está dentro de SmForm.
     * Permite establecer las validaciones del componente.
     */
    rules?: Array<(value: string[] | boolean) => boolean | string>;
    error?: string;
  }>(),
  { orientation: 'vertical', options: () => [], rules: () => [] }
);
if (props.options.length < 1) {
  console.warn('Missing data in %coptions', 'color: red;font-weight: bold;padding: 1px', 'prop.');
}
const emit = defineEmits<{
  (event: 'update:modelValue', value: string[] | boolean): void;
  (event: 'focusOut', value: FocusEvent): void;
}>();

const internalValue = useVModel(props, 'modelValue', emit);
const { rules, validate, validateOnFocusout, hasError, currentError } = useSmileValidate<
  string[] | boolean
>(internalValue, toRef(props, 'error'), props.id);

const onFocusOut = (event: FocusEvent) => {
  if (validateOnFocusout.value) {
    validate();
  }
  emit('focusOut', event);
};

watch(
  () => props.rules,
  () => {
    rules.value = props.rules ?? [];
  },
  { immediate: true }
);

defineExpose({
  validate,
  hasError: hasError.value,
});
</script>

<style scoped lang="scss" src="./SCheckbox.scss"></style>
