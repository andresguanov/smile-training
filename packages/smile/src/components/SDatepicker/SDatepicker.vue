<template>
  <div class="s-datepicker" :class="{ error: hasError }">
    <div v-if="label" class="s-datepicker__header">
      <label
        :for="`dp-input-${uid}`"
        class="s-datepicker__label"
        :class="{ required: markType === 'required' }"
      >
        {{ label }}<span v-if="markType" class="s-datepicker__mark">{{ textMark }}</span>
      </label>
      <small class="s-datepicker__helper">{{ hint }}</small>
    </div>
    <s-datepicker-base
      v-model="date"
      :uid="uid"
      :locale="locale"
      :format="format"
      :readonly="readonly"
      :required="required"
      :disabled="disabled"
      :disabled-dates="disabledDates"
      :sidebar-options="sidebarOptions"
      :auto-apply="autoApply"
      :text-input="textInput"
      :range-mode="rangeMode"
      :multi-calendars="multiCalendars"
    >
      <template #s-dp-trigger="{ value, onBlur, onInput }">
        <s-input
          :id="`dp-input-${uid}`"
          :model-value="value"
          :placeholder="placeholder"
          :disabled="disabled"
          :size="size"
          :icon-right="canClear ? 'close' : 'calendar'"
          @blur="onBlur"
          @update:model-value="onInput"
          @click-icon-right.stop="onClear"
        />
      </template>
    </s-datepicker-base>
    <div class="s-datepicker__footer" v-if="helperText">
      <p class="s-datepicker__helper">{{ helperText }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSmileValidator } from '~/composables';

type SDatepickerValue = Date | string | Date[] | string[];

const props = withDefaults(
  defineProps<{
    modelValue: SDatepickerValue;
    locale?: 'es' | 'en';
    format?: string;
    placeholder?: string;
    clearable?: boolean;
    readonly?: boolean;
    /**
     * No mutable.
     */
    id?: string;
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
    rules?: Array<(value?: SDatepickerValue) => boolean | string>;
    /**
     * Mensaje de error, los mensajes de error proporcionados por rules tendrán
     * prioridad sobre este.
     */
    error?: string;
    textInput?: boolean;
    rangeMode?: boolean;
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
    rules: () => [],
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', v: SDatepickerValue): void;
  (e: 'clickOption', v: string): void;
}>();
const date = useVModel(props, 'modelValue', emit);

const {
  hasError,
  currentError,
  id: uid,
} = useSmileValidator<SDatepickerValue>({
  rules: props.rules,
  data: date,
  externalError: toRef(props, 'error'),
  id: props.id,
});

const textMark = computed(() => (props.markType === 'required' ? '*' : `(${props.optionalText})`));
const helperText = computed(() => currentError.value || props.supportiveText);
const canClear = computedEager(() => props.clearable && date.value);

const onClear = () => {
  if (canClear.value) date.value = '';
};
</script>

<style scoped lang="scss" src="./SDatepicker.scss"></style>
