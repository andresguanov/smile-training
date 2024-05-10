<template>
  <sm-label :error="hasError" :label="label" :required="required" :size="buttonSize">
    <div
      @click="initInput"
      ref="inputElement"
      class="flex w-full"
      v-sm-simple-uid
      :class="{ 'sm-file-input-error': hasError }"
    >
      <input
        class="sm-file-input"
        readonly
        :class="{
          'sm-file-input-small': small,
          'sm-file-input-large': large,
        }"
        :placeholder="placeholder"
        :value="inputText"
        @focusout="onFocusOut"
      />
      <sm-button :size="buttonSize" class="sm-file-input-button">
        {{ buttonText }}
      </sm-button>
    </div>
    <sm-hint v-if="hasError && inputElement && errorListContent" :to="`#${inputElement.id}`">
      <template #content>
        <sm-error-list :error-messages="errorListContent" />
      </template>
    </sm-hint>
  </sm-label>
</template>
<script lang="ts" setup>
import { smSimpleUid as vSmSimpleUid } from '../../directives';
import { computed, ref } from 'vue';
import { useValidate } from '~/composables/validate';

const props = withDefaults(
  defineProps<{
    errorMessages?: string[];
    accept?: string;
    error?: boolean;
    buttonText?: string;
    label?: string;
    large?: boolean;
    modelValue?: File | FileList;
    multiple?: boolean;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    rules?: ((v: any) => boolean | string)[];
    small?: boolean;
  }>(),
  {
    accept: '',
    buttonText: 'Elegir',
    error: false,
    label: '',
    large: false,
    placeholder: '',
    multiple: false,
    readonly: true,
    required: false,
    small: false,
  }
);

const inputText = ref('');
const emit = defineEmits<{
  (e: 'update:modelValue', val: File | FileList | undefined): void;
  (e: 'on:focusout'): void;
}>();
const data = useVModel(props, 'modelValue', emit);
const inputElement = ref<HTMLInputElement | null>(null);

const { validate, rules, hasError, errorListContent, validateOnFocusout } = useValidate(
  data,
  props.error,
  props.errorMessages
);

enum sizes {
  small = 'small',
  large = 'large',
}

const buttonSize = computed(() =>
  props.small ? sizes.small : props.large ? sizes.large : undefined
);

const initInput = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  if (props.accept && props.accept !== '') {
    input.setAttribute('accept', props.accept);
  }
  if (props.multiple) {
    input.setAttribute('multiple', '');
  }
  input.click();
  input.addEventListener('change', () => {
    if (input.files) {
      inputText.value = !props.multiple ? input.files[0].name : 'Multiple';
      props.multiple
        ? emit('update:modelValue', input.files)
        : emit('update:modelValue', input.files[0]);
    }
    input.remove();
  });
};

const onFocusOut = () => {
  if (validateOnFocusout.value) {
    validate();
  }
  emit('on:focusout');
};

watch(
  () => props.rules,
  () => {
    rules.value = props.rules ?? [];
  },
  { immediate: true }
);

defineExpose({ validate, hasError: hasError.value });
</script>
<style lang="scss" scoped>
@import './SmFileInput.scss';
</style>
