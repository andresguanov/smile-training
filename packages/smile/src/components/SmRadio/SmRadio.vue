<template>
  <div class="sm-input-container">
    <span ref="radioElement" v-sm-simple-uid>
      <sm-label
        v-bind="$props"
        :class="[
          'sm-radio',
          sizeClass,
          { 'sm-radio-disabled': disabled },
          { 'label-to-left': labelToLeft },
        ]"
        :error="hasError"
      >
        <input
          v-model="data"
          v-bind="$attrs"
          :value="nativeValue"
          :disabled="disabled"
          type="radio"
        />
        <span class="sm-radio-circle"></span>
      </sm-label>
    </span>
    <sm-hint v-if="radioElement && hasError && errorListContent" :to="`#${radioElement.id}`">
      <template #content>
        <sm-error-list :error-messages="(errorListContent as Array<string>)" />
      </template>
    </sm-hint>
  </div>
</template>
<!-- TODO: crear un form para revisar reactividad de la implementacion -->
<script lang="ts" setup>
import { smSimpleUid as vSmSimpleUid } from '../../directives';
import { useVModel } from '@vueuse/core';
import { SmHint, SmLabel } from '../index';
import { useValidate } from '../../composables';

const props = defineProps<{
  nativeValue: any;
  label: string;
  modelValue?: any;
  error?: boolean;
  size?: 'small' | 'medium' | 'large';
  required?: boolean;
  errorMessages?: Array<string>;
  disabled?: boolean;
  labelToLeft?: boolean;
  rules?: Array<(value: any) => boolean | string>;
}>();

const emit = defineEmits(['update:modelValue']);
const data = useVModel(props, 'modelValue', emit);
const radioElement = ref<HTMLSpanElement | null>(null);
const { validate, hasError, errorListContent } = useValidate(
  data,
  props.rules || [],
  props.error,
  props.errorMessages
);

const sizeClass = computed(() => {
  let size = props.size || 'medium';
  return `sm-radio-${size}`;
});

defineExpose({ validate });
</script>

<style lang="scss" scoped>
@import './SmRadio.scss';
</style>
