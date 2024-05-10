<template>
  <sm-label v-bind="$props" :error="hasError" :class="[{ magic: magic }]">
    <div v-if="magic" class="sm-textarea__magic">
      <sm-loader :label="autocompleteText" is-inline magic></sm-loader>
    </div>
    <textarea
      ref="textareaElement"
      v-model="data"
      :disabled="disabled"
      :placeholder="placeholder"
      :required="required"
      :class="[
        'sm-textarea',
        'sm-scrollbar',
        sizeClass,
        { 'sm-input-error': hasError },
        { 'sm-input-disabled': disabled },
      ]"
      v-sm-simple-uid
      @focusout="onFocusOut"
    ></textarea>
    <sm-hint v-if="hasError && textareaElement && errorListContent" :to="`#${textareaElement.id}`">
      <template #content>
        <sm-error-list :error-messages="errorListContent" />
      </template>
    </sm-hint>
  </sm-label>
</template>

<script lang="ts" setup>
import SmLoader from '../SLoader/SLoader.vue';
import { smSimpleUid as vSmSimpleUid } from '../../directives';
import { computed } from 'vue';
import { SmLabel, SmHint } from '../index';
import { useValidate } from '../../composables';

const props = defineProps<{
  label?: string;
  modelValue?: string;
  error?: boolean;
  size?: 'small' | 'medium' | 'large';
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  errorMessages?: Array<string>;
  rules?: Array<(value: any) => boolean | string>;
  magic?: boolean;
  autocompleteText?: string;
}>();

const emit = defineEmits(['update:modelValue', 'on:focusout']);
const data = useVModel(props, 'modelValue', emit);
const { validate, hasError, errorListContent, rules, validateOnFocusout } = useValidate(
  data,
  props.error,
  props.errorMessages
);
const textareaElement = ref<HTMLTextAreaElement | null>(null);
const sizeClass = computed(() => {
  let size = props.size || 'medium';
  return `sm-input-${size} sm-text-${size}`;
});

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

defineExpose({ validate });
</script>

<style lang="scss" scoped>
@import './SmTextArea.scss';
</style>
