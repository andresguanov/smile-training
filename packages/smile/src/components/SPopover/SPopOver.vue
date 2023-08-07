<template>
  <sm-tooltip ref="tippyOptions" theme="smile-next" trigger="manual" :hideOnClick="false">
    <template #content>
      <div class="s-popover">
        <p class="s-popover-title">
          {{ title }}
          <sm-icon @click="data = false" size="small" icon="close"></sm-icon>
        </p>
        <p class="s-popover-description">
          {{ description }}
        </p>
        <div v-if="hasSlot('actions')">
          <slot name="actions"></slot>
        </div>
      </div>
    </template>
    <div @click="data = true">
      <slot></slot>
    </div>
  </sm-tooltip>
</template>

<script lang="ts" setup>
// import 'tippy.js/dist/tippy.css'
import { Tippy as SmTooltip } from 'vue-tippy';
import { ref, computed, watch } from 'vue';

const slots = useSlots();
const props = defineProps<{
  modelValue: boolean;
  title?: string;
  description?: string;
}>();

const emits = defineEmits<{
  (event: 'update:modelValue', value: number): void;
}>();
const hasSlot = (slotName: string) => {
  return slots[slotName] && typeof slots[slotName] === 'function';
};

const data = useVModel(props, 'modelValue', emits);
const tippyOptions = ref();

const openTippy = () => tippyOptions.value?.show();
const closeTippy = () => tippyOptions.value?.hide();

watch(data, value => (value ? openTippy() : closeTippy()));

if (data.value) {
  setTimeout(() => {
    openTippy();
  }, 2000);
}
</script>

<style lang="scss" src="./SPopOver.scss"></style>
