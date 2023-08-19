<template>
  <div class="sm-datepicker">
    <sm-label
      v-if="label"
      v-bind="$props"
      class="sm-datepicker-label"
      :error="hasError"
      @click="openDatepicker"
    />
    <date-picker
      ref="datePickerElement"
      v-model:value="data"
      v-model:open="open"
      v-bind="$attrs"
      :lang="lang"
      :format="format"
      :append-to-body="appendToBody"
      :disabled="disabled"
      :class="[
        'sm-input',
        `sm-input-${size}`,
        'sm-datepicker-input',
        { 'sm-input-error': hasError },
        { 'sm-input-disabled': disabled },
      ]"
      v-sm-simple-uid
    >
      <template v-for="slot in slotsList" v-slot:[slot]>
        <slot :name="slot as string"></slot>
      </template>
    </date-picker>
    <sm-hint
      v-if="datePickerElement && hasError && errorListContent"
      :to="`#${datePickerElement.id}`"
    >
      <template #content>
        <sm-error-list :error-messages="errorListContent" />
      </template>
    </sm-hint>
  </div>
</template>

<script lang="ts" setup>
import { smSimpleUid as vSmSimpleUid } from '../../directives';
import { useValidate } from '../../composables';
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/locale/en.es.js';
import 'vue-datepicker-next/locale/es.es.js';
import 'vue-datepicker-next/index.css';

const slots = useSlots();
const props = withDefaults(
  defineProps<{
    modelValue?: string | Date | Array<string | Date>;
    locale?: 'es' | 'en';
    format?: string;
    label?: string;
    error?: boolean;
    size?: 'small' | 'medium' | 'large';
    required?: boolean;
    errorMessages?: Array<string>;
    appendToBody?: boolean;
    disabled?: boolean;
    rules?: Array<(value: any) => boolean | string>;
  }>(),
  {
    modelValue: '',
    locale: 'es',
    label: '',
    format: 'DD/MM/YYYY',
    size: 'medium',
    appendToBody: false,
  }
);

const emit = defineEmits(['update:modelValue']);
const data = useVModel(props, 'modelValue', emit);
const lang = ref(props.locale);
const open = ref(false);
const datePickerElement = ref<HTMLDivElement | null>(null);
const { validate, hasError, errorListContent } = useValidate(
  data,
  props.rules || [],
  props.error,
  props.errorMessages
);
const slotsList = computed((): Array<string> => {
  return Object.keys(slots);
});

const openDatepicker = () => {
  open.value = true;
};

watch(props, () => {
  lang.value = props.locale;
});

defineExpose({ validate });
</script>

<style scoped lang="scss">
@import './SmDatepicker.scss';
</style>
