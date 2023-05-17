<template>
  <component :is="containerIsForm ? 'form' : 'div'" @submit.prevent="onSubmit">
    <slot :isValid="isValid" :validate="validateInputs" :reset="resetValidation" />
  </component>
</template>

<script lang="ts" setup>
import { provideSmFormSymbol } from '../../composables';

const props = withDefaults(
  defineProps<{
    /**
     * Si es true el contenedor adquiere la etiqueta <form> caso contrario usa <div>
     */
    containerIsForm?: boolean;
    /**
     * Úsalo para especificar el tipo de validación que se tendrá:
     *
     * `on-submit`: la validación se lanza en el evento submit del form.
     *
     * `on-focusout`: la validación se lanza en el evento focusout.
     *
     * `on-type`: la validación se lanza cuando el valor de los inputs cambiar.
     *
     * Para los inputs de tipo radio y checkbox on-focusout y on-type hacen la misma acción.
     */
    validationMode?: 'on-submit' | 'on-focusout' | 'on-type';
  }>(),
  { validationMode: 'on-submit' }
);
const emits = defineEmits(['submit', 'validation:error']);
const inputsValidation = ref<Array<(ignoreUpdate?: boolean) => boolean>>([]);
const inputsReset = ref<Array<() => void>>([]);
const isValid = ref(true);

const validateInputs = (ignoreUpdate?: boolean): boolean => {
  let errorQty = 0;
  inputsValidation.value.forEach(validate => {
    const res = validate(ignoreUpdate);
    if (!res) {
      errorQty += 1;
    }
  });
  isValid.value = errorQty === 0;
  return errorQty === 0;
};
const resetValidation = () => {
  inputsReset.value.forEach(reset => reset());
  isValid.value = true;
};
const onSubmit = () => {
  try {
    if (!validateInputs()) throw new Error('Error Validation');
    emits('submit');
  } catch (e: any) {
    emits('validation:error', e);
  }
};
const registerInputValidation = (validate: () => boolean) => {
  if (typeof validate === 'function') {
    inputsValidation.value.push(validate);
  } else {
    console.warn('Inject validation is not a function');
  }
};
const registerInputReset = (reset: () => void) => {
  if (typeof reset === 'function') {
    inputsReset.value.push(reset);
  } else {
    console.warn('Inject validation is not a function');
  }
};

provide(provideSmFormSymbol, {
  register: registerInputValidation,
  registerReset: registerInputReset,
  validationMode: props.validationMode,
});
defineExpose({
  isValid,
  onSubmit,
  validateInputs,
  resetValidation,
});
</script>
