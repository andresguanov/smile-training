import { PropType, Ref } from 'vue'
import { provideSmForm } from '../interfaces/sm-form.interface'

export const provideSmFormSymbol = Symbol('smForm')

export const ValidateProps = {
  rules: Array as PropType<Array<(value: any) => boolean | string>>,
}

export const useValidate = (
  data: Ref<any>,
  rules: Array<(value: any) => boolean | string>,
  externalErrorMessages?: Array<string>
) => {
  const errorBucket = ref<Array<string>>([])
  const isInvalid = ref(false)
  const validateOnFocusout = ref(false)

  const errorListContent = computed(() => {
    if (isInvalid.value) {
      return errorBucket.value
    }
    return externalErrorMessages
  })

  const validate = (): boolean => {
    const errors = []
    const value = data.value
    for (let index = 0; index < rules.length; index++) {
      const rule = rules[index]
      const valid = typeof rule === 'function' ? rule(value) : rule

      if (valid === false || typeof valid === 'string') {
        errors.push(valid || '')
      } else if (typeof valid !== 'boolean') {
        console.error(`Rules should return a string or boolean, received '${typeof valid}' instead`)
      }
    }
    errorBucket.value = errors
    isInvalid.value = errorBucket.value.length !== 0
    return errors.length === 0
  }

  const smFormProvide = inject<provideSmForm | null>(provideSmFormSymbol, null)
  if (smFormProvide) {
    smFormProvide.register(validate)
    smFormProvide.registerInputRef(isInvalid)
    switch (smFormProvide.validationMode) {
      case 'on-focusout':
        validateOnFocusout.value = true
        break
      case 'on-type':
        watch(data, () => {
          validate()
        })
        break
      default:
        break
    }
  }

  return { errorBucket, isInvalid, validate, errorListContent, validateOnFocusout }
}
