// import { Ref } from 'vue'

export interface provideSmForm {
  register: (validate: (ignoreUpdate?: boolean) => boolean) => void
  registerReset: (reset: () => void) => void
  validationMode: 'on-submit' | 'on-focusout' | 'on-type'
}
