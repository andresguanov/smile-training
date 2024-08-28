<template>
  <div class="s-textarea" :class="{ disabled, readonly, error: hasError, magic }">
    <div v-if="label" class="s-textarea__header">
      <label :for="id" class="s-textarea__label">
        <span v-if="labelIcon" class="s-textarea__label-icon">
          <slot name="label-icon"><sm-icon :icon="labelIcon" size="small" type="primary" /></slot>
        </span>
        <p>
          {{ label }}<span v-if="markType" class="s-textarea__mark">{{ textMark }}</span>
        </p>
      </label>
      <small class="s-textarea__helper">{{ hint }}</small>
    </div>
    <div class="s-textarea__container">
      <div v-if="magic" class="s-textarea__magic">
        <s-loader :label="autocompleteText" is-inline magic />
      </div>
      <textarea
        name="test"
        v-model="value"
        class="s-textarea__textarea"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :id="id"
        @blur="onBlur"
        @focus="onFocus"
        @keypress="(e: KeyboardEvent) => emit('keypress', e)"
      >
      </textarea>
      <!-- <span
        role="textbox"
        contenteditable
        @input="handleUpdateTextarea"
        class="s-textarea__textarea"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :id="id"
        @blur="onBlur"
        @focus="onFocus"
        @keypress="(e: KeyboardEvent) => emit('keypress', e)"
      >
      </span> -->
      <template v-if="!hasError">
        <div v-if="success" class="s-textarea__icon success">
          <sm-icon icon="success" :width="iconSize" :height="iconSize" />
        </div>
        <div v-if="loading" class="s-textarea__icon loading">
          <sm-progress-circle size="small"></sm-progress-circle>
        </div>
      </template>
      <div v-if="hasError" class="s-textarea__icon error">
        <sm-icon icon="alert-circle" :width="iconSize" :height="iconSize" />
      </div>
    </div>
    <div class="s-textarea__footer" v-if="helperText">
      <span class="s-textarea__helper-icon" v-if="supportiveIcon && !hasError">
        <slot name="supportive-icon">
          <sm-icon :icon="supportiveIcon" size="small" type="primary" />
        </slot>
      </span>
      <p class="s-textarea__helper">{{ helperText }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSmileValidate } from '~/composables';
import type { IconType } from '~/interfaces';

const props = withDefaults(
  defineProps<{
    id?: string; // Id, del input. Cuando se usa con SForm actúa como identificación de su validación.
    label?: string;
    labelIcon?: IconType;
    placeholder?: string;
    modelValue: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    size?: 'small' | 'medium' | 'large';
    hint?: string;
    markType?: 'required' | 'optional';
    optionalText?: string;
    supportiveText?: string;
    supportiveIcon?: IconType | false;
    success?: boolean;
    loading?: boolean;
    magic?: boolean;
    autocompleteText?: string;
    /**
     * Disponible solo cuando el componente está dentro de SmForm.
     * Permite establecer las validaciones del componente.
     */
    rules?: Array<(value: string | number | null) => boolean | string>;
    /**
     * Mensaje de error, los mensajes de error proporcionados por rules tendrán
     * prioridad sobre este.
     */
    error?: string;
  }>(),
  {
    size: 'medium',
    nativeType: 'text',
    rules: () => [],
    optionalText: 'Opcional',
    autocompleteText: 'Autocompletando...',
  }
);

const emit = defineEmits<{
  (event: 'blur' | 'focus', value: FocusEvent): void;
  (event: 'keypress', value: KeyboardEvent): void;
  (event: 'clickLeading' | 'clickTrailing' | 'clickIconRight', value: PointerEvent): void;
  (event: 'update:modelValue', value: string): void;
}>();

const value = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});

const textMark = computed(() => (props.markType === 'required' ? '*' : `(${props.optionalText})`));
const helperText = computed(() => currentError.value || props.supportiveText);
const iconSize = computed(() => (props.size === 'small' ? '16px' : '20px'));

const { rules, validate, validateOnFocusout, hasError, currentError } = useSmileValidate<
  string | number | null
>(value, toRef(props, 'error'), props.id);

const showSuggestion = ref(false);
const onBlur = (event: FocusEvent) => {
  if (validateOnFocusout.value) {
    validate();
  }
  emit('blur', event);
  showSuggestion.value = false;
};
const onFocus = (event: FocusEvent) => {
  emit('focus', event);
  if (!props.readonly) showSuggestion.value = true;
};

// const acceptSuggestion = async () => {
//   if (props.suggestion) {
//     if (props.mask) {
//       unmaskedValue.value = props.suggestion.value;
//       value.value = new Mask(props.mask).masked(props.suggestion.value);
//     } else {
//       value.value = props.suggestion.value;
//     }
//   }
// };

watch(
  () => props.rules,
  () => {
    rules.value = props.rules ?? [];
  },
  { immediate: true }
);

// TODO: En caso se requiera el uso de contenteditable descomentar esta function
// const handleUpdateTextarea = (val: Event) => {
//   console.log(val);
//   const value: string = (val.target as HTMLInputElement).textContent ?? '';
//   emit('update:modelValue', value);
// };
</script>
<style lang="scss" scoped src="./STextarea.styles.scss"></style>
