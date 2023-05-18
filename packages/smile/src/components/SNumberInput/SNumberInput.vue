<template>
  <div class="s-number" :class="{ disabled, readonly, error: hasError }">
    <p v-if="label" class="s-number__label">{{ label }}</p>
    <div class="s-number__container" :class="[size, { filled }]">
      <div v-if="iconLeft" class="s-number__icon leading">
        <sm-icon :icon="iconLeft" :width="iconSize" :height="iconSize" />
      </div>
      <input
        v-model="value"
        type="number"
        class="s-number__input"
        :step="step"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @blur="onBlur"
        @focus="e => emit('focus', e)"
        @keypress="e => emit('keypress', e)"
      />
      <div v-if="success" class="s-number__icon success">
        <sm-icon icon="success" :width="iconSize" :height="iconSize" />
      </div>
      <div v-if="loading" class="s-number__icon loading">
        <sm-icon icon="loading" :width="iconSize" :height="iconSize" />
      </div>
      <div v-if="hasError" class="s-number__icon error">
        <sm-icon icon="alert-circle" :width="iconSize" :height="iconSize" />
      </div>
      <s-input-leading
        icon="minus"
        class="s-number__trailing"
        :size="size"
        :disabled="disabledMinus"
        inline
        actionable
        trailing
        @click="clickMinus"
      />
      <div class="s-number__divider" />
      <s-input-leading
        icon="plus"
        class="s-number__trailing"
        :size="size"
        :disabled="disabledPlus"
        inline
        actionable
        trailing
        @click="clickPlus"
      />
    </div>
    <div class="s-number__footer">
      <p class="s-number__helper">{{ currentError }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSmileValidate } from '~/composables';
import type { IconType } from '../../interfaces';

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    size?: 'small' | 'medium' | 'large';
    iconLeft?: IconType;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    success?: boolean;
    loading?: boolean;
    label?: string;
    disabledPlus?: boolean;
    disabledMinus?: boolean;
    /**
     * Define el número a incrementar/disminuir de los botones,
     * adicional funciona como step del propio input.
     * @default 1
     */
    step?: number;
    /**
     * Disponible solo cuando el componente está dentro de SmForm.
     * Permite establecer las validaciones del componente.
     */
    rules?: Array<(value: string | number) => boolean | string>;
    error?: string;
  }>(),
  {
    placeholder: '0',
    step: 1,
    size: 'medium',
    rules: () => [],
  }
);
const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number): void;
  (event: 'blur' | 'focus', value: FocusEvent): void;
  (event: 'keypress', value: KeyboardEvent): void;
  (event: 'clickPlus' | 'clickMinus', value: PointerEvent): void;
}>();

const value = useVModel(props, 'modelValue', emit);
const { validate, validateOnFocusout, hasError, currentError } = useSmileValidate<string | number>(
  value,
  props.rules,
  props.error
);

const iconSize = computed(() => (props.size === 'small' ? '16px' : '20px'));
const filled = computed(() => typeof value.value === 'number');

const onBlur = (event: FocusEvent) => {
  if (validateOnFocusout.value) {
    validate();
  }
  emit('blur', event);
};
const clickPlus = (event: PointerEvent) => {
  if (props.disabledPlus) return;
  emit('clickPlus', event);
  value.value = Number(value.value || 0) + props.step;
};
const clickMinus = (event: PointerEvent) => {
  if (props.disabledMinus) return;
  emit('clickMinus', event);
  value.value = Number(value.value || 0) - props.step;
};
</script>

<style scoped lang="scss" src="./SNumberInput.scss"></style>
