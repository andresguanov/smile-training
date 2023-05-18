// import { Ref } from 'vue'

export interface smFormProvide {
  register: (validate: (ignoreUpdate?: boolean) => boolean) => void;
  registerReset: (reset: () => void) => void;
  validationMode: 'on-submit' | 'on-focusout' | 'on-type';
}
