<template>
  <component :is="containerIsForm ? 'form' : 'div'" @submit.prevent="onSubmit">
    <slot :isValid="isValid" :validate="validateForm" :reset="resetInputs" />
  </component>
</template>

<script lang="ts" setup>
import type { smFormProvide2 } from '~/interfaces';
import { provideSFormSymbol } from '../../composables';

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
    breakOnFirstError?: boolean;
  }>(),
  { validateOn: 'submit' }
);
const emits = defineEmits(['submit', 'validation:error']);

const isValidating = ref(true);
const errors = ref<{ id: string; errorMessages: string[] }[]>([]);
const fields = ref<FormField[]>([]);
const isValid = computed(() => errors.value.length === 0);

const validateForm = (silent?: boolean) => {
  let valid = true;
  const results = [];
  isValidating.value = true;

  for (const field of fields.value) {
    const fieldErrorMessages = field.validate(silent);

    if (fieldErrorMessages.length > 0) {
      valid = false;
      results.push({
        id: field.id,
        errorMessages: fieldErrorMessages,
      });
    }
    if (!valid && props.breakOnFirstError) break;
  }
  errors.value = [...results];
  isValidating.value = false;

  return { valid, results };
};
const resetInputs = () => {
  fields.value.forEach(({ reset }) => reset());
  errors.value = [];
};
const onSubmit = () => {
  try {
    const result = validateForm();
    if (!result.valid) {
      throw new Error('Error Validation');
    }
    emits('submit');
  } catch (e: any) {
    emits('validation:error', e);
  }
};
const validateInput = (id: string) => {
  const field = fields.value.find(el => el.id === id);
  if (!field) throw new Error(`El input con id ${id}, no se encuentra en el formulario`);
  field.validate();
};

provide<smFormProvide2>(provideSFormSymbol, {
  register: ({ id, validate, reset }) => {
    if (fields.value.some(field => field.id === id)) {
      console.warn(`Duplicate input name "${id}"`);
    }
    fields.value.push({
      id,
      validate,
      reset,
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
  validateInput,
  validateForm,
  resetInputs,
  errors,
});
</script>
