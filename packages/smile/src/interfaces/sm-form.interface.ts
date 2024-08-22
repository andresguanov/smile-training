import type { Ref } from 'vue';

export interface SFormProvide {
  register: (validation: {
    id: string;
    validate: (silent?: boolean) => string[];
    reset: () => void;
  }) => void;
  unregister: (id: string) => void;
  validateOn: Ref<'submit' | 'focusout' | 'type'>;
}
