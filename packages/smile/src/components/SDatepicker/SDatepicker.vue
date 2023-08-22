<template>
  <div class="s-datepicker">
    <date-picker
      ref="datepickerEl"
      :uid="inputId"
      v-model="date"
      :format="format"
      :locale="locale"
      :clearable="clearable"
      :placeholder="placeholder"
      :auto-apply="internalAutoApply"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :disabled-dates="disabledDates"
      :text-input="mode === 'simple'"
      :range="mode === 'range'"
      :multi-calendars="multiCalendars"
      :enable-time-picker="false"
      class="s-datepicker__calendar"
      menu-class-name="s-datepicker__calendar__menu"
    >
      <template #dp-input="{ value, onBlur }">
        <s-input
          :id="`dp-input-${inputId}`"
          :model-value="value"
          :placeholder="placeholder"
          :size="size"
          icon-left="calendar"
          @blur="onBlur"
        />
      </template>
      <template #action-row="{ selectDate, closePicker }">
        <div class="s-datepicker__calendar__actions">
          <s-button
            emphasis="text"
            label="Hoy"
            size="small"
            class="select-button"
            @click="selectToday"
          />
        </div>
        <div class="s-datepicker__calendar__actions">
          <s-button
            emphasis="text"
            label="Cancelar"
            size="small"
            class="select-button"
            @click="closePicker"
          />
          <s-button label="Aplicar" size="small" class="select-button" @click="selectDate" />
        </div>
      </template>
    </date-picker>
  </div>
</template>

<script lang="ts" setup>
import type { DatePickerInstance } from '@vuepic/vue-datepicker';
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
    disabledDates?: Date[] | string[] | ((date: Date) => boolean);
    error?: boolean;
    errorMessages?: Array<string>;
    rules?: Array<(value: any) => boolean | string>;
    mode?: 'simple' | 'range';
    multiCalendars?: boolean;
    autoApply?: boolean;
  }>(),
  {
    locale: 'es',
    format: 'dd/MM/yyyy',
    size: 'medium',
    clearable: true,
    mode: 'simple',
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', v: Date | string | Date[] | string[]): void;
}>();
const date = useVModel(props, 'modelValue', emit);

const datepickerEl = ref<DatePickerInstance>(null);
const internalAutoApply = computed(() => props.mode === 'range' || props.autoApply);
const inputId = computed(() => props.uid || simpleUid());

const selectToday = () => {
  if (!datepickerEl.value) {
    console.error('[Smile SDatepicker]: The element Datepicker norendered');
    return;
  }
  datepickerEl.value.updateInternalModelValue(new Date());
};
</script>

<style scoped lang="scss" src="./SDatepicker.scss"></style>
