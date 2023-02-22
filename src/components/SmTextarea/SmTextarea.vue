<template>
  <sm-label v-bind="$props" :error="hasError">
    <textarea
      ref="textareaElement"
      v-model="data"
      :disabled="disabled"
      :placeholder="placeholder"
      :required="required"
      :class="[
        'sm-textarea',
        'sm-scrollbar',
        sizeClass,
        { 'sm-input-error': hasError },
        { 'sm-input-disabled': disabled },
      ]"
      v-sm-simple-uid
      @focusout="onFocusOut"
    ></textarea>
    <sm-hint v-if="hasError && textareaElement && errorListContent" :to="`#${textareaElement.id}`">
      <template #content>
        <sm-error-list :error-messages="(errorListContent as Array<string>)" />
      </template>
    </sm-hint>
  </sm-label>
</template>

<script lang="ts" setup>
import { smSimpleUid as vSmSimpleUid } from '../../directives'
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
  placeholder?: string
  errorMessages?: Array<string>
  rules?: Array<(value: any) => boolean | string>
}>()

const emit = defineEmits(['update:modelValue', 'on:focusout'])
const data = useVModel(props, 'modelValue', emit)
const { validate, hasError, errorListContent, validateOnFocusout } = useValidate(
  data,
  props.rules || [],
  props.error,
  props.errorMessages
)
const textareaElement = ref<HTMLTextAreaElement | null>(null)
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
