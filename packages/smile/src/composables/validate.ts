import { PropType, Ref } from 'vue';
import { SFormProvide } from '../interfaces/sm-form.interface';
import { simpleUid } from '~/utils/uid';

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
  const id = simpleUid();
  const errorBucket = ref<Array<string>>([]);
  const rules = ref<Array<(value: any) => boolean | string>>([]);
  const validateOnFocusout = ref(false);

  const errorListContent = computed((): string[] => {
    return [...errorBucket.value, ...externalErrorMessages];
  });
  const hasError = computed(() => {
    return externalError || errorBucket.value.length > 0;
  });

  const validate = (ignoreUpdate?: boolean): string[] => {
    const errors = [];
    for (const rule of rules.value) {
      const handler = typeof rule === 'function' ? rule : () => rule;
      const result = handler(data.value);

      if (result === true) continue;
      if (typeof result !== 'string') {
        console.error(
          `Rules should return a string or boolean, received '${typeof result}' instead`
        );
        continue;
      }
      errors.push(result);
    }
    if (!ignoreUpdate) {
      errorBucket.value = [...errors];
    }
    return errors;
  };
  const reset = () => {
    errorBucket.value = [];
  };

  const stopWatchValidate = watch(data, () => validate());

  const formInject = inject<SFormProvide | null>(provideSFormSymbol, null);

  onBeforeMount(() => {
    if (formInject?.validateOn.value !== 'type') {
      stopWatchValidate();
    }
    formInject?.register({
      id,
      validate,
      reset,
    });
  });
  onBeforeUnmount(() => {
    formInject?.unregister(id);
  });

  return {
    // Propiedades
    errorBucket,
    errorListContent,
    hasError,
    rules,
    validateOnFocusout,
    id,
    // Métodos
    validate,
    reset,
  };
};
