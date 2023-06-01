import type { Ref } from 'vue';

export interface smFormProvide {
  register: (validate: (ignoreUpdate?: boolean) => boolean) => void;
  registerReset: (reset: () => void) => void;
  validationMode: 'on-submit' | 'on-focusout' | 'on-type';
}

export interface smFormProvide2 {
  register: (validation: {
    id: string;
    validate: (silent?: boolean) => string[];
    reset: () => void;
  }) => void;
  unregister: (id: string) => void;
  validateOn: Ref<'submit' | 'focusout' | 'type'>;
}
