<template>
  <div class="sm-datepicker">
    <sm-label
      v-if="label"
      v-bind="$props"
      class="sm-datepicker__label"
      :error="hasError"
      :for="`dp-input-${inputId}`"
    />
    <date-picker
      v-model="date"
      :format="format"
      :locale="locale"
      :clearable="clearable"
      :placeholder="placeholder"
      :auto-apply="autoApply"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :text-input="!range"
      :range="range"
      :disabled-dates="disabledDates"
      :uid="inputId"
      :enable-time-picker="false"
      :class="[
        'sm-datepicker__input',
        'sm-input',
        `sm-input-${size}`,
        'sm-datepicker-input',
        { 'sm-input-error': hasError },
        { 'sm-input-disabled': disabled },
      ]"
    />
    <sm-hint v-if="hasError && errorListContent" :to="`#dp-input-${inputId}`">
      <template #content>
        <sm-error-list :error-messages="errorListContent" />
      </template>
    </sm-hint>
  </div>
</template>

<script lang="ts" setup>
import { useValidate } from '../../composables';
import { simpleUid } from '~/utils/uid';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const props = withDefaults(
  defineProps<{
    modelValue: Date | string | Date[] | string[];
    locale?: 'es' | 'en';
    format?: string;

    placeholder?: string;
    clearable?: boolean;
    readonly?: boolean;
    uid?: string;

    label?: string;
    required?: boolean;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    range?: boolean;
    disabledDates?: Date[] | string[] | ((date: Date) => boolean);

    error?: boolean;
    errorMessages?: Array<string>;
    rules?: Array<(value: any) => boolean | string>;
  }>(),
  {
    locale: 'es',
    label: '',
    format: 'dd/MM/yyyy',
    size: 'medium',
    appendToBody: false,
    clearable: true,
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', v: Date | string | Date[] | string[]): void;
}>();
const date = useVModel(props, 'modelValue', emit);

const autoApply = computed(() => true);
const inputId = computed(() => props.uid || simpleUid());

const { validate, hasError, errorListContent } = useValidate(
  date,
  props.rules || [],
  props.error,
  props.errorMessages
);

defineExpose({ validate });
</script>

<style scoped lang="scss" src="./SDatepicker.scss"></style>
