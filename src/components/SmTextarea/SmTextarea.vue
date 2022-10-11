<template>
  <sm-label v-bind="$props" :error="showError">
    <textarea
      ref="textareaElement"
      v-model="data"
      v-bind="$attrs"
      :disabled="disabled"
      :class="[
        'sm-textarea',
        'sm-scrollbar',
        sizeClass,
        { 'sm-input-error': showError },
        { 'sm-input-disabled': disabled },
      ]"
      @focusout="onFocusOut"
    ></textarea>
    <sm-hint v-if="showError && textareaElement && errorListContent" :to="() => textareaElement">
      <template #content>
        <sm-error-list :error-messages="(errorListContent as Array<string>)" />
      </template>
    </sm-hint>
  </sm-label>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { SmLabel, SmHint } from '../index'
import { useValidate } from '../../composables'

const props = defineProps<{
  label?: string
  modelValue?: string
  error?: boolean
  size?: 'small' | 'medium' | 'large'
  required?: boolean
  disabled?: boolean
  errorMessages?: Array<string>
  rules?: Array<(value: any) => boolean | string>
}>()

const emit = defineEmits(['update:modelValue', 'on:focusout'])
const data = useVModel(props, 'modelValue', emit)
const textareaElement = ref<HTMLTextAreaElement | null>(null)
const { validate, isInvalid, errorListContent, validateOnFocusout } = useValidate(
  data,
  props.rules || [],
  props.errorMessages
)

const showError = computed(() => {
  return props.error || isInvalid.value
})
const sizeClass = computed(() => {
  let size = props.size || 'medium'
  return `sm-input-${size} sm-text-${size}`
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
@import './SmTextArea.scss';
</style>
