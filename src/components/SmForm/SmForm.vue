<template>
  <form ref="smFormEl" @submit.prevent="onSubmit">
    <slot></slot>
    <slot name="footer" :isValid="isValid"> </slot>
  </form>
</template>

<script lang="ts" setup>
import { Ref } from 'vue'
import { provideSmFormSymbol } from '../../composables'

const props = withDefaults(
  defineProps<{
    validationMode?: 'on-submit' | 'on-focusout' | 'on-type'
  }>(),
  { validationMode: 'on-submit' }
)
const emits = defineEmits(['submit', 'validation:error'])
const inputsValidation = ref<Array<() => boolean>>([])
const inputsValidRef = ref<Array<Ref<boolean>>>([])

const isValid = computed(() => {
  if (props.validationMode === 'on-submit') {
    return true
  }
  return inputsValidRef.value.every(el => {
    return !el.value
  })
})

const allInputsAreValid = (): boolean => {
  let errorQty = 0
  inputsValidation.value.forEach(el => {
    const res = el()
    if (!res) {
      errorQty += 1
    }
  })
  return errorQty === 0
}
const onSubmit = () => {
  try {
    if (!allInputsAreValid()) throw new Error('Error Validation')
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
const registerInputsValidRef = (inputValidRef: Ref<boolean>) => {
  if (isRef<boolean>(inputValidRef)) {
    inputsValidRef.value.push(inputValidRef)
  } else {
    console.warn('Inject input ref is not a ref<boolean>')
  }
}

provide(provideSmFormSymbol, {
  register: registerInputValidation,
  registerInputRef: registerInputsValidRef,
  validationMode: props.validationMode,
})
defineExpose({
  isValid,
})
</script>
