import { PropType, Ref } from 'vue';
import { smFormProvide } from '../interfaces/sm-form.interface';

export const provideSFormSymbol = Symbol('sForm');

export const ValidateProps = {
  rules: Array as PropType<Array<(value: any) => boolean | string>>,
};

/**
 * @deprecated
 */
export const useValidate = (
  data: Ref<any>,
  externalError: boolean = false,
  externalErrorMessages: Array<string> = []
) => {
  const errorBucket = ref<Array<string>>([]);
  const rules = ref<Array<(value: any) => boolean | string>>([]);
  const validateOnFocusout = ref(false);

  const errorListContent = computed((): string[] => {
    return [...errorBucket.value, ...externalErrorMessages];
  });
  const hasError = computed(() => {
    return externalError || errorBucket.value.length > 0;
  });

  const validate = (ignoreUpdate?: boolean): boolean => {
    const errors = [];
    const value = data.value;
    for (let index = 0; index < rules.value.length; index++) {
      const rule = rules.value[index];
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

  const stopWatchValidate = watch(data, () => validate());

  const formProvide = inject<smFormProvide | null>(provideSFormSymbol, null);
  if (formProvide) {
    formProvide.register(validate);
    formProvide.registerReset(resetValidation);
    if (formProvide.validationMode !== 'on-type') stopWatchValidate();
    if (formProvide.validationMode === 'on-focusout') validateOnFocusout.value = true;
  } else {
    stopWatchValidate();
  }

  return {
    // Propiedades
    errorBucket,
    errorListContent,
    hasError,
    rules,
    validateOnFocusout,

    // Métodos
    validate,
    resetValidation,
  };
};
