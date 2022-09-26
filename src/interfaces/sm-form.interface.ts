import { Ref } from 'vue'

export interface provideSmForm {
  register: (validate: () => boolean) => void
  registerInputRef: (inputValidRef: Ref<boolean>) => void
  validationMode: 'on-submit' | 'on-focusout' | 'on-type'
}
