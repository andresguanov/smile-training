<template>
  <div class="s-radio">
    <p v-if="label" class="s-radio__label" :class="{ required: markType === 'required' }">
      {{ label }}<span v-if="markType" class="s-radio__mark">{{ textMark }}</span>
    </p>
    <div class="s-radio__group" :class="[orientation]" @focusout="onFocusOut">
      <label
        v-for="(option, i) in options"
        :key="i"
        :class="{ 's-radio__radio--disabled': option.disabled }"
        class="s-radio__radio"
      >
        <input
          v-model="internalValue"
          :value="option.value"
          :disabled="option.disabled"
          type="radio"
          class="s-radio__radio__input"
        />
        <span class="s-radio__radio__label"> {{ option.label }} </span>
      </label>
    </div>
    <s-error :error="currentError" :is-showing="hasError" />
  </div>
</template>

<script setup lang="ts">
import { useSmileValidate } from '~/composables';

const props = withDefaults(
  defineProps<{
    modelValue: object | string | number;
    options?: {
      value: object | string | number;
      label: string;
      disabled?: boolean;
    }[];
    label?: string;
    required?: boolean;
    /**
     * Identificador para la validación, solo funciona para el dientificador
     * de validación. No se usa como id de los inputs.
     */
    id?: string;
    orientation?: 'horizontal' | 'vertical';
    /**
     * Disponible solo cuando el componente está dentro de SmForm.
     * Permite establecer las validaciones del componente.
     */
    rules?: Array<(value: object | string | number) => boolean | string>;
    error?: string;
    /**
     * Al pasar esta prop indicas que deseas mostrar al lado del label la marca
     * que indica si el input es requerido u opcional.
     */
    markType?: 'required' | 'optional';
    /**
     * Texto que se mostrará cuando `markType` es `optional`
     * @default Opcional
     */
    optionalText?: string;
  }>(),
  { orientation: 'vertical', options: () => [], rules: () => [], optionalText: 'Opcional' }
);
if (props.options.length < 1) {
  console.warn('Missing data in %coptions', 'color: red;font-weight: bold;padding: 1px', 'prop.');
}
const emit = defineEmits<{
  (event: 'update:modelValue', value: object | string | number): void;
  (event: 'focusOut', value: FocusEvent): void;
}>();

const internalValue = useVModel(props, 'modelValue', emit);
const { validate, validateOnFocusout, hasError, currentError } = useSmileValidate<
  string | number | object
>(internalValue, props.rules, toRef(props, 'error'), props.id);
const textMark = computed(() => (props.markType === 'required' ? '*' : `(${props.optionalText})`));

const onFocusOut = (event: FocusEvent) => {
  if (validateOnFocusout.value) {
    validate();
  }
  emit('focusOut', event);
};

defineExpose({
  validate,
  hasError: hasError.value,
});
</script>

<style scoped lang="scss" src="./SRadio.scss"></style>
