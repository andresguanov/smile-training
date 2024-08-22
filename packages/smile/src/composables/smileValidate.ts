import type { SFormProvide } from '../interfaces/sm-form.interface';
import type { Ref, WritableComputedRef } from 'vue';
import { provideSFormSymbol } from './validate';
import { simpleUid } from '~/utils/uid';

export const useSmileValidate = <T = string>(
  data: Ref<T> | WritableComputedRef<T>,
  externalError?: Ref<string | undefined>,
  id: string = simpleUid()
) => {
  const rules = ref<Array<(value: T) => boolean | string>>([]);
  const stopWatchValidate = watch(data, () => validate());
  const errorBucket = ref<Array<string>>([]);

  /**
   * @param ignoreUpdate Se usa para no actualizar los estados de error del componente
   */
  const validate = (silent = false): string[] => {
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
    if (!silent) {
      errorBucket.value = [...errors];
    }
    return errors;
  };
  const reset = () => {
    errorBucket.value = [];
  };

  const formInject = inject<SFormProvide | null>(provideSFormSymbol, null);

  const hasError = computed(() => {
    return Boolean(externalError?.value) || errorBucket.value.length > 0;
  });
  const validateOnFocusout = computed(() => formInject?.validateOn.value === 'focusout');
  const currentError = computed(() => {
    if (errorBucket.value.length > 0) {
      return errorBucket.value[0];
    }
    return externalError?.value || '';
  });

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
    id,
    errorBucket,
    validate,
    reset,
    validateOnFocusout,
    hasError,
    currentError,
    rules,
  };
};
