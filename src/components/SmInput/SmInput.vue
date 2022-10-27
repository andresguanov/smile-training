<template>
  <sm-label v-bind="$props" :error="showError">
    <input
      ref="inputElement"
      v-model="data"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="nativeType || 'text'"
      :class="[
        'sm-input',
        `sm-input-${size}`,
        `sm-text-${size}`,
        { 'sm-input-error': showError },
        { 'sm-input-disabled': disabled },
      ]"
      v-sm-simple-uid
      @focusout="onFocusOut"
    />
    <sm-hint v-if="showError && inputElement && errorListContent" :to="`#${inputElement.id}`">
      <template #content>
        <sm-error-list :error-messages="(errorListContent as Array<string>)" />
      </template>
    </sm-hint>
  </sm-label>
</template>

<script lang="ts" setup>
import { smSimpleUid as vSmSimpleUid } from '../../directives'
import {
  LabelProps as labelProps,
  InputProps as inputProps,
  ValidateProps as validateProps,
  useValidate,
} from '../../composables'

const props = defineProps({
  modelValue: String,
  ...labelProps,
  ...inputProps,
  ...validateProps,
})
const emit = defineEmits(['update:modelValue', 'on:focusout'])
const data = useVModel(props, 'modelValue', emit)
const inputElement = ref<HTMLInputElement | null>(null)
const { validate, isInvalid, errorListContent, validateOnFocusout } = useValidate(
  data,
  props.rules || [],
  props.errorMessages
)

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
@import './SmInput.scss';
</style>
