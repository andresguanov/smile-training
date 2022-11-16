// import { Ref } from 'vue'

export interface provideSmForm {
  register: (validate: (ignoreUpdate?: boolean) => boolean) => void
  // registerInputRef: (inputValidRef: Ref<boolean>) => void
  validationMode: 'on-submit' | 'on-focusout' | 'on-type'
}
