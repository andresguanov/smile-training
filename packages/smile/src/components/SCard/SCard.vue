<template>
  <div class="s-card">
    <div class="s-card-header">
      <slot name="header">
        <card-header
          @click-btn-header="emit('clickBtnHeader')"
          :title="title"
          :subtitle="subtitle"
          :icon="iconHeader"
          :modal-active="modal"
        />
      </slot>
    </div>
    <div class="w-full h-full">
      <slot></slot>
    </div>
    <div v-if="activeBtnFooter" class="w-full flex flex-nowrap gap-x-4 border-t-[1px] pt-6">
      <slot name="footer">
        <card-footer
          :label-btn="labelFooter"
          :icon="iconFooter"
          @click-btn="emit('clickBtnFooter')"
        />
      </slot>
    </div>
    <slot v-else name="footer"></slot>
  </div>
</template>
<script setup lang="ts">
import { IconType } from '~/interfaces';
import CardHeader from './SCardHeader.vue';
import CardFooter from './SCardFooter.vue';

defineProps<{
  title: string;
  subtitle?: string;
  iconHeader?: IconType;
  modal?: boolean;
  activeBtnFooter?: boolean;
  labelFooter?: string;
  iconFooter?: IconType;
}>();

const emit = defineEmits<{
  (e: 'clickBtnFooter'): void;
  (e: 'clickBtnHeader'): void;
}>();
</script>
<style scoped src="./SCard.scss"></style>
