import { provideSmFormSymbol } from './validate';
import type { smFormProvide } from '../interfaces/sm-form.interface';
import type { Ref, WritableComputedRef } from 'vue';

export const useSmileValidate = <T = string>(
  data: Ref<T> | WritableComputedRef<T>,
  rules: Array<(value: T) => boolean | string>,
  externalError?: string
) => {
  const stopWatchValidate = watch(data, () => validate());
  const errorBucket = ref<Array<string>>([]);
  //   const validateOnFocusout = ref(false)

  /**
   * @param ignoreUpdate Se usa para no actualizar los estados de error del componente
   */
  const validate = (ignoreUpdate?: boolean): boolean => {
    const errors = [];
    const value = data.value;
    for (let index = 0; index < rules.length; index++) {
      const rule = rules[index];
      const valid = typeof rule === 'function' ? rule(value) : rule;

      if (valid === false || typeof valid === 'string') {
        errors.push(valid || 'Error de validación');
      } else if (typeof valid !== 'boolean') {
        console.error(
          `Rules should return a string or boolean, received '${typeof valid}' instead`
        );
      }
    }
    if (!ignoreUpdate) {
      errorBucket.value = [...errors];
    }
    return errors.length === 0;
  };
  const resetValidation = () => {
    errorBucket.value = [];
  };

  const formProvide = inject<smFormProvide | null>(provideSmFormSymbol, null);
  if (formProvide) {
    formProvide.register(validate);
    formProvide.registerReset(resetValidation);
    if (formProvide.validationMode !== 'on-type') stopWatchValidate();
    // if (formProvide.validationMode === 'on-focusout') validateOnFocusout.value = true
  } else {
    stopWatchValidate();
  }

  const hasError = computed(() => {
    return Boolean(externalError) || errorBucket.value.length > 0;
  });
  const validateOnFocusout = computed(() => formProvide?.validationMode === 'on-focusout');
  const currentError = computed(() => {
    if (errorBucket.value.length > 0) {
      return errorBucket.value[0];
    }
    return externalError || '';
  });

  return {
    errorBucket,
    validate,
    validateOnFocusout,
    hasError,
    resetValidation,
    currentError,
  };
};
