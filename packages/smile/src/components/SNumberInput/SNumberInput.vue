<template>
  <div class="s-number" :class="{ disabled, readonly, error: hasError }">
    <div v-if="label" class="s-number__header">
      <label :for="id" class="s-number__label" :class="{ required: markType === 'required' }">
        <span class="s-number__label-icon" v-if="labelIcon">
          <slot name="label-icon">
            <sm-icon :icon="labelIcon" size="small" type="primary" />
          </slot>
        </span>
        <p>
          {{ label }}<span v-if="markType" class="s-number__mark">{{ textMark }}</span>
        </p>
      </label>
    </div>
    <div class="s-number__container" :class="size">
      <s-input-leading
        v-if="Boolean(leading)"
        v-bind="leading"
        :size="size"
        class="s-number__leading"
        @click="(e: PointerEvent) => emit('clickLeading', e)"
      >
        <slot name="leading" />
      </s-input-leading>
      <input
        v-model="value"
        type="number"
        class="s-number__input"
        :step="step"
        :id="id"
        :required="required"
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
        trailing-icon="minus"
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
        class="s-number__trailing"
        leading-icon="plus"
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
import type { IconType, InputAddon } from '../../interfaces';

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    size?: 'small' | 'medium' | 'large';
    leading?: InputAddon;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    /**
     * Id, del input. Cuando se usa con SForm actúa como identificación de su validación.
     */
    id?: string;
    success?: boolean;
    loading?: boolean;
    label?: string;
    labelIcon?: IconType | boolean;
    supportiveText?: string;
    supportiveIcon?: IconType | boolean;
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
  }>(),
  {
    placeholder: '0',
    step: 1,
    size: 'medium',
    rules: () => [],
    optionalText: 'Opcional',
  }
);
const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number): void;
  (event: 'blur' | 'focus', value: FocusEvent): void;
  (event: 'keypress', value: KeyboardEvent): void;
  (event: 'clickPlus' | 'clickMinus' | 'clickLeading', value: PointerEvent): void;
}>();

const value = useVModel(props, 'modelValue', emit);
const { rules, validate, validateOnFocusout, hasError, currentError } = useSmileValidate<
  string | number
>(value, toRef(props, 'error'), props.id);
const textMark = computed(() => (props.markType === 'required' ? '*' : `(${props.optionalText})`));
const iconSize = computed(() => (props.size === 'small' ? '16px' : '20px'));

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

watch(
  () => props.rules,
  () => {
    rules.value = props.rules ?? [];
  },
  { immediate: true }
);
</script>

<style scoped lang="scss" src="./SNumberInput.scss"></style>
