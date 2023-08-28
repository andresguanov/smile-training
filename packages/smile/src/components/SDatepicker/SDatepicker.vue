<template>
  <div class="s-datepicker">
    <div v-if="label" class="s-datepicker__header">
      <label
        :for="`dp-input-${inputId}`"
        class="s-datepicker__label"
        :class="{ required: markType === 'required' }"
      >
        {{ label }}<span v-if="markType" class="s-datepicker__mark">{{ textMark }}</span>
      </label>
      <small class="s-datepicker__helper">{{ hint }}</small>
    </div>
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
        <div class="s-datepicker__calendar__actions left">
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
      <template v-if="sidebarOptions && sidebarOptions.length" #left-sidebar="{}">
        <s-menu-item
          v-for="option in sidebarOptions"
          :key="option.id"
          :title="option.title"
          :description="option.description"
          text-style="block"
          @click="emit('clickOption', option.title)"
        />
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
    sidebarOptions?: { id: string; title: string; description?: string }[];
    /**
     * Disponible solo cuando el componente está dentro de SmForm.
     * Permite establecer las validaciones del componente.
     */
    rules?: Array<(value: string) => boolean | string>;
    /**
     * Mensaje de error, los mensajes de error proporcionados por rules tendrán
     * prioridad sobre este.
     */
    error?: string;
    mode?: 'simple' | 'range';
    multiCalendars?: boolean;
    autoApply?: boolean;
    /**
     * Al pasar esta prop indicas que deseas mostrar al lado del label la marca
     * que indica si el input es requerido u opcional.
     */
    markType?: 'required' | 'optional';
    /**
     * Texto que se mostrará cuando `markType` es `optional`
     * @default Opcional
     */
    optionalText?: string;
    hint?: string;
    supportiveText?: string;
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
  (e: 'clickOption', v: string): void;
}>();
const date = useVModel(props, 'modelValue', emit);

const datepickerEl = ref<DatePickerInstance>(null);
const internalAutoApply = computed(() => props.mode === 'simple' || props.autoApply);
const inputId = computed(() => props.uid || simpleUid());
const textMark = computed(() => (props.markType === 'required' ? '*' : `(${props.optionalText})`));

const selectToday = () => {
  if (!datepickerEl.value) {
    console.error('[Smile SDatepicker]: The element Datepicker norendered');
    return;
  }
  datepickerEl.value.updateInternalModelValue(
    props.mode === 'simple' ? new Date() : [new Date(), new Date()]
  );
};
</script>

<style scoped lang="scss" src="./SDatepicker.scss"></style>
