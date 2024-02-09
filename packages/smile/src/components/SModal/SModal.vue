<template>
  <div v-if="data" class="sn-modal-area">
    <div :class="['s-modal', size]">
      <div class="s-modal-title">
        <span v-if="backBtn" class="title-back-arrow" @click="emits('back')">
          <img :src="ArrowLeftIcon" alt="" />
        </span>
        <span>
          {{ headerText }}
        </span>
      </div>
      <div class="s-modal-body scroll_beautifull">
        <slot></slot>
      </div>
      <slot v-if="slots['footer']" name="footer" />

      <div v-else class="s-modal-footer">
        <s-button size="small" emphasis="outline" @click="close">{{ cancelText }}</s-button>
        <s-button size="small" @click="success"> {{ successText }}</s-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
// eslint-disable-next-line import/no-unresolved
import ArrowLeftIcon from '../../assets/arrow-left.svg';

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

const slots = useSlots();

const emits = defineEmits<{
  (event: 'update:modelValue', value: number): void;
  (event: 'close'): void;
  (event: 'success'): void;
  (event: 'back'): void;
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

<style lang="scss" scoped>
@import './SModal.scss';
</style>
