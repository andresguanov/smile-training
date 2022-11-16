<template>
  <component :is="containerIsForm ? 'form' : 'div'" @submit.prevent="onSubmit">
    <slot :isValid="isValid" :validate="validateInputs" :reset="resetValidation" />
  </component>
</template>

<script lang="ts" setup>
// import type { Ref } from 'vue'
import { provideSmFormSymbol } from '../../composables'

const props = withDefaults(
  defineProps<{
    containerIsForm?: boolean
    validationMode?: 'on-submit' | 'on-focusout' | 'on-type'
  }>(),
  { validationMode: 'on-submit' }
)
const emits = defineEmits(['submit', 'validation:error'])
const inputsValidation = ref<Array<(ignoreUpdate?: boolean) => boolean>>([])
const inputsReset = ref<Array<() => void>>([])
// const inputsValidRef = ref<Array<Ref<boolean>>>([])
const isValid = ref(true)

// const isValid = computed(() => {
//   if (props.validationMode === 'on-submit') {
//     return true
//   }
//   return inputsValidRef.value.every(el => {
//     return !el.value
//   })
// })

const validateInputs = (ignoreUpdate?: boolean): boolean => {
  let errorQty = 0
  inputsValidation.value.forEach(validate => {
    const res = validate(ignoreUpdate)
    if (!res) {
      errorQty += 1
    }
  })
  isValid.value = errorQty === 0
  return errorQty === 0
}
const resetValidation = () => {
  inputsReset.value.forEach(reset => reset())
  isValid.value = true
}
const onSubmit = () => {
  try {
    if (!validateInputs()) throw new Error('Error Validation')
    emits('submit')
  } catch (e: any) {
    emits('validation:error', e)
  }
}
const registerInputValidation = (validate: () => boolean) => {
  if (typeof validate === 'function') {
    inputsValidation.value.push(validate)
  } else {
    console.warn('Inject validation is not a function')
  }
}
// const registerInputsValidRef = (inputValidRef: Ref<boolean>) => {
//   if (isRef<boolean>(inputValidRef)) {
//     inputsValidRef.value.push(inputValidRef)
//   } else {
//     console.warn('Inject input ref is not a ref<boolean>')
//   }
// }

provide(provideSmFormSymbol, {
  register: registerInputValidation,
  // registerInputRef: registerInputsValidRef,
  validationMode: props.validationMode,
})
defineExpose({
  isValid,
  onSubmit,
  validateInputs,
  resetValidation,
})
</script>
