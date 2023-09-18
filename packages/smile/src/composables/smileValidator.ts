/**
 * Versión del validador que permite modelValue undefined. Se genera esta versión para no romper las que hacen uso del smileValidate
 * @author José Bernardo Bernal Cabrera <bernardo.bernal@alegra.com>
 */
import type { smFormProvide2 } from '../interfaces/sm-form.interface';
import type { Ref, WritableComputedRef } from 'vue';
import { provideSFormSymbol } from './validate';
import { simpleUid } from '~/utils/uid';

// Types
type ValidatorArgs<T> = {
  data?: Ref<T> | WritableComputedRef<T>;
  rules: Array<(value?: T) => boolean | string>;
  externalError?: Ref<string | undefined>;
  id?: string;
};

export const useSmileValidator = <T = string>(args: ValidatorArgs<T>) => {
  const id = args.id ?? simpleUid();

  const stopWatchValidate = watch(
    () => args.data,
    () => validate()
  );

  const errorBucket = ref<Array<string>>([]);

  /**
   * @param ignoreUpdate Se usa para no actualizar los estados de error del componente
   */
  const validate = (silent = false): string[] => {
    const errors = [];
    for (const rule of args.rules) {
      const handler = typeof rule === 'function' ? rule : () => rule;
      const result = handler(args.data?.value);

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

  const formInject = inject<smFormProvide2 | null>(provideSFormSymbol, null);

  const hasError = computed(() => {
    return Boolean(args.externalError?.value) || errorBucket.value.length > 0;
  });
  const validateOnFocusout = computed(() => formInject?.validateOn.value === 'focusout');
  const currentError = computed(() => {
    if (errorBucket.value.length > 0) {
      return errorBucket.value[0];
    }
    return args.externalError?.value || '';
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
    errorBucket,
    validate,
    reset,
    validateOnFocusout,
    hasError,
    currentError,
    id,
  };
};
