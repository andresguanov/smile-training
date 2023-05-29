<template>
  <div class="s-input" :class="{ disabled, readonly, error: hasError }">
    <div v-if="label" class="s-input__header">
      <p class="s-input__label">{{ label }}</p>
      <small class="s-input__helper">{{ hint }}</small>
    </div>
    <div class="s-input__container" :class="[size, { filled: Boolean(value) }]">
      <s-input-leading
        v-if="Boolean(leading)"
        class="s-input__leading"
        :size="size"
        :label="leading?.label"
        :icon="leading?.icon"
        :inline="leading?.inline"
        :actionable="leading?.actionable"
        @click="e => emit('clickLeading', e)"
      />
      <div v-if="iconLeft" class="s-input__icon leading">
        <sm-icon :icon="iconLeft" :width="iconSize" :height="iconSize" />
      </div>
      <input
        v-model="value"
        class="s-input__input"
        :type="nativeType"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @blur="onBlur"
        @focus="e => emit('focus', e)"
        @keypress="e => emit('keypress', e)"
      />
      <div v-if="success" class="s-input__icon success">
        <sm-icon icon="success" :width="iconSize" :height="iconSize" />
      </div>
      <div v-if="loading" class="s-input__icon loading">
        <sm-icon icon="loading" :width="iconSize" :height="iconSize" />
      </div>
      <div v-if="hasError" class="s-input__icon error">
        <sm-icon icon="alert-circle" :width="iconSize" :height="iconSize" />
      </div>
      <div v-if="iconRight" class="s-input__icon trailing">
        <sm-icon
          :icon="iconRight"
          :width="iconSize"
          :height="iconSize"
          @click="e => emit('clickIconRight', e)"
        />
      </div>
      <s-input-leading
        v-if="Boolean(trailing)"
        class="s-input__trailing"
        :size="size"
        :label="trailing?.label"
        :icon="trailing?.icon"
        :inline="trailing?.inline"
        :actionable="trailing?.actionable"
        trailing
        @click="e => emit('clickTrailing', e)"
      />
    </div>
    <div class="s-input__footer">
      <p class="s-input__helper">{{ currentError || supportiveText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSmileValidate } from '~/composables';
import type { IconType, smInputAddon } from '../../interfaces';

const props = withDefaults(
  defineProps<{
    modelValue: string;
    size?: 'small' | 'medium' | 'large';
    leading?: smInputAddon;
    trailing?: smInputAddon;
    iconLeft?: IconType;
    iconRight?: IconType;
    hint?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    success?: boolean;
    loading?: boolean;
    label?: string;
    supportiveText?: string;
    nativeType?:
      | 'text'
      | 'password'
      | 'date'
      | 'month'
      | 'email'
      | 'search'
      | 'time'
      | 'url'
      | 'color'
      | 'week';
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
  }>(),
  {
    size: 'medium',
    nativeType: 'text',
    rules: () => [],
  }
);
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
  (event: 'blur' | 'focus', value: FocusEvent): void;
  (event: 'keypress', value: KeyboardEvent): void;
  (event: 'clickLeading' | 'clickTrailing' | 'clickIconRight', value: PointerEvent): void;
}>();

const value = useVModel(props, 'modelValue', emit);
const { validate, validateOnFocusout, hasError, currentError } = useSmileValidate<string>(
  value,
  props.rules,
  toRef(props, 'error')
);

const iconSize = computed(() => (props.size === 'small' ? '16px' : '20px'));

const onBlur = (event: FocusEvent) => {
  if (validateOnFocusout) {
    validate();
  }
  emit('blur', event);
};
</script>

<style scoped lang="scss" src="./SInput.scss"></style>
