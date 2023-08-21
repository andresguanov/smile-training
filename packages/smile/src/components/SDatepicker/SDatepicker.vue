<template>
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
    :range="range"
    :disabled-dates="disabledDates"
    :uid="inputId"
    :enable-time-picker="false"
    class="sm-datepicker__calendar"
    text-input
  >
    <template #dp-input="{ value, onBlur }">
      <s-input
        :id="`dp-input-${inputId}`"
        :model-value="value"
        :placeholder="placeholder"
        @blur="onBlur"
      />
    </template>
  </date-picker>
</template>

<script lang="ts" setup>
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
</script>

<style scoped lang="scss" src="./SDatepicker.scss"></style>
