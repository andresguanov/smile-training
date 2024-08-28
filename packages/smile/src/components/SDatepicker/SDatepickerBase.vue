<template>
  <date-picker
    ref="datepickerEl"
    v-model="date"
    :uid="id"
    :format="format"
    :locale="locale"
    :clearable="false"
    :auto-apply="autoApply"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :disabled-dates="disabledDates"
    :range="rangeMode"
    :text-input="textInput"
    :multi-calendars="multiCalendars"
    :enable-time-picker="enableTimePicker"
    :min-date="minDate"
    :max-date="maxDate"
    :inline="inline"
    :position="position"
    :menu-class-name="`s-datepicker__calendar__menu ${inline ? 'is-inline' : ''}`"
    class="s-datepicker__calendar"
  >
    <template #dp-input="{ value, onBlur, isMenuOpen, onInput }">
      <slot
        name="s-dp-trigger"
        :value="value"
        :is-menu-open="isMenuOpen"
        :on-blur="onBlur"
        :on-input="onInput"
      />
    </template>
    <template #action-row="{ selectDate, closePicker, internalModelValue }">
      <div class="s-datepicker__calendar__actions">
        <s-button v-if="hasToday" emphasis="text" label="Hoy" size="small" @click="selectToday" />
        <s-button
          class="cancel-button"
          emphasis="text"
          label="Cancelar"
          size="small"
          @click="closePicker"
        />
        <s-button
          label="Aplicar"
          size="small"
          :disabled="!canApplyInternalValueDate(internalModelValue)"
          @click="selectDate"
        />
      </div>
    </template>
    <template
      v-if="sidebarOptions && sidebarOptions.length"
      #left-sidebar="{ presetDate, selectDate }"
    >
      <s-menu-item
        v-for="option in sidebarOptions"
        :key="option.id"
        :title="option.title"
        :description="option.description"
        text-style="block"
        @click="emit('clickOption', option.id, { presetDate, selectDate })"
      />
    </template>
    <template #time-picker="{ time, updateTime }">
      <div class="s-datepicker__calendar__timepicker">
        <label>{{ timeLabel }}</label>
        <date-picker
          format="HH:mm"
          time-picker
          :model-value="time"
          auto-apply
          :clearable="false"
          @update:modelValue="(val: Time) => onNestedTimeUpdate(val, updateTime)"
          class="s-datepicker__calendar__timepicker__selector"
        >
          <template #input-icon> </template>
        </date-picker>
      </div>
    </template>
  </date-picker>
</template>

<script lang="ts" setup>
import type { DatePickerInstance } from '@vuepic/vue-datepicker';
import type { SDatepickerBaseProps } from './props';
import { SDatepickerValue, Time } from '~/interfaces';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const props = withDefaults(defineProps<SDatepickerBaseProps>(), {
  locale: 'es',
  format: 'dd/MM/yyyy',
  enableTimePicker: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', v: SDatepickerValue): void;
  (
    e: 'clickOption',
    v: string,
    settings: {
      selectDate: (day: { value: Date; current: boolean }) => void;
      presetDate: (dates: Date[] | string[]) => void;
    }
  ): void;
}>();
const date = useVModel(props, 'modelValue', emit);

const datepickerEl = ref<DatePickerInstance>(null);

const canApplyInternalValueDate = (value: unknown) => {
  if (!props.rangeMode) return true;
  return Array.isArray(value) && value.length >= 2;
};
const selectToday = () => {
  if (!datepickerEl.value) {
    console.error('[Smile SDatepicker]: The element Datepicker norendered');
    return;
  }
  datepickerEl.value.updateInternalModelValue(
    props.rangeMode ? [new Date(), new Date()] : new Date()
  );
};

const onNestedTimeUpdate = (
  newValue: Time,
  updateTime: (value: number | number[], isHours: boolean, isSeconds: boolean) => void
): void => {
  if (newValue) {
    const { hours, minutes } = newValue;
    updateTime(hours, true, false);
    updateTime(minutes, false, false);
  }
};
</script>

<style scoped lang="scss" src="./SDatepickerBase.scss"></style>
