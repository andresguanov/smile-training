<template>
  <date-picker
    ref="datepickerEl"
    v-model="date"
    :uid="uid"
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
    :enable-time-picker="false"
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
    <template #action-row="{ selectDate, closePicker }">
      <div v-if="hasToday" class="s-datepicker__calendar__actions left">
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
  </date-picker>
</template>

<script lang="ts" setup>
import type { DatePickerInstance } from '@vuepic/vue-datepicker';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

type SDatepickerValue = Date | string | Date[] | string[];

const props = withDefaults(
  defineProps<{
    modelValue: SDatepickerValue;
    locale?: 'es' | 'en';
    format?: string;
    readonly?: boolean;
    uid?: string;
    required?: boolean;
    disabled?: boolean;
    disabledDates?: Date[] | string[] | ((date: Date) => boolean);
    sidebarOptions?: { id: string; title: string; description?: string }[];
    multiCalendars?: boolean;
    autoApply?: boolean;
    textInput?: boolean;
    rangeMode?: boolean;
    minDate?: Date | string;
    maxDate?: Date | string;
    inline?: boolean;
    position?: 'left' | 'center' | 'right';
    hasToday?: boolean;
  }>(),
  {
    locale: 'es',
    format: 'dd/MM/yyyy',
  }
);

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

const selectToday = () => {
  if (!datepickerEl.value) {
    console.error('[Smile SDatepicker]: The element Datepicker norendered');
    return;
  }
  datepickerEl.value.updateInternalModelValue(
    props.rangeMode ? [new Date(), new Date()] : new Date()
  );
};
</script>

<style scoped lang="scss" src="./SDatepickerBase.scss"></style>
