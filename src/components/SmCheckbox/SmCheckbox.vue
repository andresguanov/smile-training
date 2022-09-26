<template>
  <div class="sm-input-container">
    <span ref="checkboxElement">
      <sm-label
        v-bind="$props"
        :class="[
          'sm-checkbox',
          sizeClass,
          { 'sm-checkbox-disabled': disabled },
          { 'label-to-left': labelToLeft },
        ]"
        :error="showError"
      >
        <input
          v-model="data"
          v-bind="$attrs"
          :disabled="disabled"
          type="checkbox"
          @focusout="onFocusOut"
        />
        <span class="sm-checkbox-box"></span>
      </sm-label>
    </span>
    <sm-hint v-if="checkboxElement && showError && errorListContent" :to="checkboxElement">
      <template #content>
        <sm-error-list :error-messages="(errorListContent as Array<string>)" />
      </template>
    </sm-hint>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { SmLabel, SmHint, SmErrorList } from '../index'
import { useValidate } from '../../composables'

const props =
  defineProps<{
    label: string
    modelValue?: boolean
    error?: boolean
    size?: 'small' | 'medium' | 'large'
    required?: boolean
    errorMessages?: Array<string>
    disabled?: boolean
    labelToLeft?: boolean
    rules?: Array<(value: any) => boolean | string>
  }>()

const emit = defineEmits(['update:modelValue', 'on:focusout'])
const data = useVModel(props, 'modelValue', emit)
const checkboxElement = ref<HTMLSpanElement | null>(null)
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
  return `sm-checkbox-${size}`
})

const onFocusOut = () => {
  if (validateOnFocusout.value) {
    validate()
  }
  emit('on:focusout')
}

defineExpose({ validate })
</script>

<style scoped lang="scss">
@import './SmCheckbox.scss';
</style>
