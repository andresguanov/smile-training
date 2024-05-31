<template>
  <div v-if="data" class="sn-modal-area" @click.self="emits('clickOutside')">
    <div :class="['s-modal', size]">
      <div class="s-modal-title">
        <span v-if="backBtn" class="title-back-arrow" @click="emits('back')">
          <sm-icon icon="arrow-alt-left" />
        </span>
        <span>
          {{ headerText }}
        </span>
      </div>
      <div class="s-modal-body scroll_beautifull">
        <slot></slot>
      </div>
      <slot name="footer">
        <div class="s-modal-footer">
          <s-button size="small" emphasis="outline" @click="close">{{ cancelText }}</s-button>
          <s-button size="small" @click="success"> {{ successText }}</s-button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    size?: 'small' | 'medium' | 'large';
    headerText: string;
    cancelText?: string;
    successText?: string;
    backBtn?: boolean;
  }>(),
  {
    size: 'medium',
    cancelText: 'Label',
    successText: 'Label',
  }
);

const emits = defineEmits<{
  (event: 'update:modelValue', value: number): void;
  (event: 'close'): void;
  (event: 'success'): void;
  (event: 'back'): void;
  (event: 'clickOutside'): void;
}>();

const data = useVModel(props, 'modelValue', emits);

const close = () => {
  try {
    emits('close');
    data.value = false;
  } catch (error) {}
};

const success = () => {
  try {
    emits('success');
    data.value = false;
  } catch (error) {}
};
</script>

<style lang="scss" scoped src="./SModal.scss"></style>
