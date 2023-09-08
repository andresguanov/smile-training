<template>
  <div v-if="data" class="s-slideover-area">
    <div :class="['s-slideover', size]">
      <div class="s-slideover-title">
        {{ headerText }}

        <sm-icon class="cursor-pointer" size="small" icon="close" @click="data = false"></sm-icon>
      </div>
      <div class="s-slideover-body">
        <slot></slot>
      </div>
      <slot v-if="slots['footer']" name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    size?: 'regular' | 'medium';
    headerText: string;
  }>(),
  {
    size: 'regular',
  }
);

const slots = useSlots();

const emits = defineEmits<{
  (event: 'update:modelValue', value: number): void;
}>();

const data = useVModel(props, 'modelValue', emits);
</script>

<style scoped lang="scss" src="./SSlideover.scss"></style>
