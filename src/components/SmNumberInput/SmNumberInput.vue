<template>
  <sm-label v-bind="$props" :error="showError">
    <div
      ref="inputElement"
      class="sm-input-container"
      :data-prefix="dataPrefix"
      :data-sufix="dataSufix"
    >
      <input
        v-model="data"
        :step="step"
        :disabled="disabled"
        :placeholder="placeholder"
        :class="[
          'sm-input',
          `sm-input-${size}`,
          `sm-text-${size}`,
          { 'sm-input-error': showError },
          { 'sm-input-disabled': disabled },
        ]"
        type="number"
        @focusout="onFocusOut"
        @blur.prevent="updateValue"
      />
    </div>
    <sm-hint v-if="showError && inputElement && errorListContent" :to="inputElement">
      <template #content>
        <sm-error-list :error-messages="(errorListContent as Array<string>)" />
      </template>
    </sm-hint>
  </sm-label>
</template>

<script lang="ts" setup>
import { useValidate } from '~/composables'

const props = withDefaults(
  defineProps<{
    modelValue?: string | null | number
    label?: string
    size?: 'small' | 'medium' | 'large'
    error?: boolean
    dataPrefix?: string
    dataSufix?: string
    min?: number
    max?: number
    decimalPrecision?: number
    decimalSeparator?: '.' | ','
    disabled?: boolean
    placeholder?: string
    errorMessages?: Array<string>
    rules?: Array<(value: any) => boolean | string>
  }>(),
  {
    decimalPrecision: 0,
    min: -Infinity,
    max: Infinity,
    decimalSeparator: '.',
  }
)
const emit = defineEmits(['update:modelValue', 'on:focusout'])
const data = useVModel(props, 'modelValue', emit)
const inputElement = ref<HTMLDivElement | null>(null)
const { validate, isInvalid, errorListContent, validateOnFocusout } = useValidate(
  data,
  props.rules || [],
  props.errorMessages
)

const isNaN = Number.isNaN || window.isNaN

const step = computed(() => {
  return 1 / 10 ** getDecimalPart()
})

const getDecimalPart = () => {
  const value = Number(data.value)
  if (isNaN(value)) {
    return 0
  }
  /* for evaluate number as "5e-6"
      const textValue = value.toString()
      if (textValue.indexOf('e-') > -1) {
        const [base, trail] = textValue.split('e-')
        const deg = parseInt(trail, 10)
        console.log({ deg })
        return 0
      }
      */
  if (Math.floor(value) !== value) {
    return value.toString().split(props.decimalSeparator)[1].length || 0
  }
  return 0
}
const updateValue = () => {
  const value = data.value
  if (value) {
    let newValue = typeof value !== 'number' ? parseFloat(value) : value
    if (!isNaN(newValue)) {
      if (props.min <= props.max) {
        newValue = Math.min(props.max, Math.max(props.min, newValue))
      }
      newValue = Number(newValue.toFixed(props.decimalPrecision))
      data.value = newValue
    } else {
      data.value = ''
    }
  }
}
const showError = computed(() => {
  return props.error || isInvalid.value
})

const onFocusOut = () => {
  if (validateOnFocusout.value) {
    validate()
  }
  emit('on:focusout')
}

defineExpose({ validate })
</script>

<style lang="scss" scoped>
@import './SmNumberInput.scss';
</style>
