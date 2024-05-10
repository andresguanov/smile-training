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
      :uid="inputId"
      v-model="date"
      :format="format"
      :locale="locale"
      :clearable="clearable"
      :placeholder="placeholder"
      :auto-apply="autoApply"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :disabled-dates="disabledDates"
      :text-input="!range"
      :range="range"
      :multi-calendars="range"
      :enable-time-picker="false"
      :min-date="minDate"
      :max-date="maxDate"
      class="sm-datepicker__calendar"
    >
      <template #dp-input="{ value, onBlur, onInput }">
        <div
          ref="inputElement"
          :class="[
            'sm-input',
            `sm-input-${size}`,
            `sm-text-${size}`,
            { 'sm-input-error': hasError },
            { 'sm-input-disabled': disabled },
          ]"
        >
          <input
            class="input"
            :id="`dp-input-${inputId}`"
            :value="value"
            :disabled="disabled"
            :placeholder="placeholder"
            :required="required"
            type="text"
            @input="onInput"
            @blur="onFocusOut(onBlur)"
          />
          <SmIcon v-if="showCaretDownIcon" class="icon" icon="caret-down" size="small" />
        </div>
      </template>
    </date-picker>
    <sm-hint v-if="hasError && errorListContent" :to="`#dp-input-${inputId}`">
      <template #content>
        <sm-error-list :error-messages="errorListContent" />
      </template>
    </sm-hint>
  </div>
</template>

<script lang="ts" setup>
import { SmIcon } from '..';
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
    minDate?: Date | string;
    maxDate?: Date | string;
    showCaretDownIcon?: boolean;
  }>(),
  {
    locale: 'es',
    label: '',
    format: 'dd/MM/yyyy',
    showCaretDownIcon: false,
    size: 'medium',
    clearable: true,
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', v: Date | string | Date[] | string[]): void;
}>();
const date = useVModel(props, 'modelValue', emit);

const autoApply = computed(() => true);
const inputId = computed(() => props.uid || simpleUid());

const { validate, rules, hasError, errorListContent, validateOnFocusout } = useValidate(
  date,
  props.error,
  props.errorMessages
);

const onFocusOut = (event: any) => {
  if (validateOnFocusout.value) {
    validate();
  }
  if (event && typeof event === 'function') event();
};

watch(
  () => props.rules,
  () => {
    rules.value = props.rules ?? [];
  },
  { immediate: true }
);

defineExpose({ validate });
</script>

<style scoped lang="scss" src="./SmDatepicker.scss"></style>
<style scoped lang="scss">
.icon {
  position: absolute;
  top: 50%;
  right: 5px; /* Ajusta la posición del icono según tus necesidades */
  transform: translateY(-50%);
  font-size: 20px; /* Tamaño del icono (ajusta según tus necesidades) */
  fill: gray;
}
.input::placeholder {
  font-family: Inter, Roboto, sans-serif;
  line-height: 18px;
  font-size: 12px;
  font-weight: 600;
  @apply text-slate-400  #{!important};
}
</style>
