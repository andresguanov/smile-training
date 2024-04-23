<template>
  <div class="s-input" :class="{ disabled, readonly, error: hasError, magic }">
    <div v-if="label" class="s-input__header">
      <label :for="id" class="s-input__label" :class="{ required: markType === 'required' }">
        {{ label }}<span v-if="markType" class="s-input__mark">{{ textMark }}</span>
      </label>
      <small class="s-input__helper">{{ hint }}</small>
    </div>
    <div class="s-input__container" :class="size">
      <s-input-leading
        v-if="Boolean(leading)"
        v-bind="leading"
        :size="size"
        class="s-input__leading"
        @click="e => emit('clickLeading', e)"
      >
        <slot name="leading" />
      </s-input-leading>
      <div v-if="iconLeft" class="s-input__icon leading">
        <sm-icon :icon="iconLeft" :width="iconSize" :height="iconSize" />
      </div>
      <div
        v-if="magic"
        class="s-input__magic"
        :style="{ paddingLeft: $slots['leading'] || iconLeft ? '2rem' : '' }"
      >
        <sm-loader label="Autocompletando..." is-inline magic></sm-loader>
      </div>
      <input
        v-model="value"
        class="s-input__input"
        :type="nativeType"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :id="id"
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
        v-bind="trailing"
        :size="size"
        class="s-input__trailing"
        trailing
        @click="e => emit('clickTrailing', e)"
      >
        <slot name="trailing" />
      </s-input-leading>
    </div>
    <div class="s-input__footer" v-if="helperText">
      <p class="s-input__helper">{{ helperText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import SmLoader from '../SLoader/SLoader.vue';
import { useSmileValidate } from '~/composables';
import type { IconType, InputAddon } from '../../interfaces';

const props = withDefaults(
  defineProps<{
    modelValue: string;
    size?: 'small' | 'medium' | 'large';
    leading?: InputAddon;
    trailing?: InputAddon;
    iconLeft?: IconType;
    iconRight?: IconType;
    hint?: string;
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
    magic?: boolean;
  }>(),
  {
    size: 'medium',
    nativeType: 'text',
    rules: () => [],
    optionalText: 'Opcional',
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
  toRef(props, 'error'),
  props.id
);
const textMark = computed(() => (props.markType === 'required' ? '*' : `(${props.optionalText})`));
const iconSize = computed(() => (props.size === 'small' ? '16px' : '20px'));
const helperText = computed(() => currentError.value || props.supportiveText);

const onBlur = (event: FocusEvent) => {
  if (validateOnFocusout.value) {
    validate();
  }
  emit('blur', event);
};
</script>

<style scoped lang="scss" src="./SInput.scss"></style>
