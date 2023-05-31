<template>
  <component :is="containerIsForm ? 'form' : 'div'" @submit.prevent="onSubmit">
    <slot :isValid="isValid" :validate="validateInputs" :reset="resetValidation" />
  </component>
</template>

<script lang="ts" setup>
import type { smFormProvide2 } from '~/interfaces';
import { provideSmFormSymbol } from '../../composables';

type FormField = {
  id: string;
  validate: (silent?: boolean) => string[];
  reset: () => void;
};

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
    validateOn?: 'submit' | 'focusout' | 'type';
  }>(),
  { validateOn: 'submit' }
);
const emits = defineEmits(['submit', 'validation:error']);
// const inputsValidation = ref<Array<(ignoreUpdate?: boolean) => boolean>>([]);
const inputsReset = ref<Array<() => void>>([]);
const isValid = ref(true);
const fields = ref<FormField[]>([]);

const validateInputs = (silent?: boolean): boolean => {
  let errorQty = 0;
  fields.value.forEach(field => {
    const errors = field.validate(silent);
    if (errors.length > 0) {
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
// const registerValidation = (validate: () => boolean) => {
//   if (typeof validate === 'function') {
//     inputsValidation.value.push(validate);
//   } else {
//     console.warn('Inject validation is not a function');
//   }
// };
// const registerInputReset = (reset: () => void) => {
//   if (typeof reset === 'function') {
//     inputsReset.value.push(reset);
//   } else {
//     console.warn('Inject validation is not a function');
//   }
// };

provide<smFormProvide2>(provideSmFormSymbol, {
  register: ({ id, validate, reset }) => {
    if (fields.value.some(field => field.id === id)) {
      console.warn(`Duplicate input name "${id}"`);
    }
    fields.value.push({
      id,
      validate,
      reset,
      //   isValid: null,
      //   errorMessages: [],
    });
  },
  unregister: id => {
    fields.value = fields.value.filter(field => {
      return field.id !== id;
    });
  },
  validateOn: toRef(props, 'validateOn'),
});

defineExpose({
  isValid,
  onSubmit,
  validateInputs,
  resetValidation,
});
</script>
