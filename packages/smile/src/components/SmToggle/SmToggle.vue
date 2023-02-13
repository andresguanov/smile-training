<template>
  <div class="sm-input-container">
    <span ref="toggleElement" v-sm-simple-uid>
      <sm-label
        v-bind="$props"
        :class="[
          'sm-toggle',
          { 'sm-toggle-no-label': !label },
          { 'sm-toggle-disabled': disabled },
          `sm-toggle-${size}`,
          { 'label-to-left': labelToLeft },
        ]"
        :error="hasError"
      >
        <input
          v-model="data"
          v-bind="$attrs"
          :disabled="disabled"
          type="checkbox"
          @focusout="onFocusOut"
        />
        <span class="sm-toggle-slider"></span>
      </sm-label>
    </span>
    <sm-hint v-if="toggleElement && hasError && errorListContent" :to="`#${toggleElement.id}`">
      <template #content>
        <sm-error-list :error-messages="(errorListContent as Array<string>)" />
      </template>
    </sm-hint>
  </div>
</template>

<script lang="ts" setup>
import { smSimpleUid as vSmSimpleUid } from '../../directives'
import { useVModel } from '@vueuse/core'
import { SmHint, SmLabel, SmErrorList } from '~/components/index'
import {
  LabelProps as labelProps,
  InputProps as inputProps,
  ValidateProps as validateProps,
  ToggleProps as toggleProps,
  useValidate,
} from '../../composables'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  ...labelProps,
  ...inputProps,
  ...toggleProps,
  ...validateProps,
})
const emit = defineEmits(['update:modelValue', 'on:focusout'])
const data = useVModel(props, 'modelValue', emit)
const toggleElement = ref<HTMLSpanElement | null>(null)
const { validate, hasError, errorListContent, validateOnFocusout } = useValidate(
  data,
  props.rules || [],
  props.error,
  props.errorMessages
)

const onFocusOut = () => {
  if (validateOnFocusout.value) {
    validate()
  }
  emit('on:focusout')
}

defineExpose({ validate })
</script>

<style lang="scss" scoped>
@import './SmToggle.scss';
</style>
