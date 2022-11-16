import { PropType, Ref } from 'vue'
import { provideSmForm } from '../interfaces/sm-form.interface'

export const provideSmFormSymbol = Symbol('smForm')

export const ValidateProps = {
  rules: Array as PropType<Array<(value: any) => boolean | string>>,
}

export const useValidate = (
  data: Ref<any>,
  rules: Array<(value: any) => boolean | string>,
  externalError: boolean = false,
  externalErrorMessages: Array<string> = []
) => {
  const errorBucket = ref<Array<string>>([])
  const validateOnFocusout = ref(false)

  const errorListContent = computed(() => {
    return [...errorBucket.value, ...externalErrorMessages]
  })
  const hasError = computed(() => {
    return externalError || errorBucket.value.length > 0
  })

  const validate = (ignoreUpdate?: boolean): boolean => {
    const errors = []
    const value = data.value
    for (let index = 0; index < rules.length; index++) {
      const rule = rules[index]
      const valid = typeof rule === 'function' ? rule(value) : rule

      if (valid === false || typeof valid === 'string') {
        errors.push(valid || 'Error de validación')
      } else if (typeof valid !== 'boolean') {
        console.error(`Rules should return a string or boolean, received '${typeof valid}' instead`)
      }
    }
    if (!ignoreUpdate) {
      errorBucket.value = [...errors]
    }
    return errors.length === 0
  }
  const resetValidation = () => {
    errorBucket.value = []
  }

  const stopWatchValidate = watch(data, () => validate())

  const smFormProvide = inject<provideSmForm | null>(provideSmFormSymbol, null)
  if (smFormProvide) {
    smFormProvide.register(validate)
    smFormProvide.registerReset(resetValidation)
    if (smFormProvide.validationMode !== 'on-type') stopWatchValidate()
    if (smFormProvide.validationMode === 'on-focusout') validateOnFocusout.value = true
  }

  return {
    errorBucket,
    validate,
    errorListContent,
    validateOnFocusout,
    hasError,
    resetValidation,
  }
}
