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
      :max-date="maxDate"
      :min-date="minDate"
      :multi-calendars="multiCalendars"
      :position="position"
      :has-today="hasToday"
      :enable-time-picker="enableTimePicker"
      :time-label="timeLabel"
      @click-option="(key, settings) => emit('clickOption', key, settings)"
      v-bind="$attrs"
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
          @click-icon-right="onClear"
        />
      </template>
    </s-datepicker-base>
    <div class="s-datepicker__footer" v-if="helperText">
      <p class="s-datepicker__helper">{{ helperText }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSmileValidate } from '~/composables';
import { SDatepickerValue } from '~/interfaces';
import { SDatepickerProps } from './props';

const props = withDefaults(defineProps<SDatepickerProps>(), {
  locale: 'es',
  format: 'dd/MM/yyyy',
  size: 'medium',
  clearable: true,
  enableTimePicker: false,
  rules: () => [],
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

const {
  id: uid,
  hasError,
  currentError,
  rules,
} = useSmileValidate<SDatepickerValue>(date, toRef(props, 'error'), props.id);

const textMark = computed(() => (props.markType === 'required' ? '*' : `(${props.optionalText})`));
const helperText = computed(() => currentError.value || props.supportiveText);
const canClear = computedEager(() => props.clearable && date.value);

const onClear = (event: PointerEvent) => {
  if (canClear.value) {
    event.stopPropagation();
    date.value = '';
  }
};

watch(
  () => props.rules,
  () => {
    rules.value = props.rules ?? [];
  },
  { immediate: true }
);
</script>

<style scoped lang="scss" src="./SDatepicker.scss"></style>
