<template>
  <Transition>
    <div v-if="openModal" :class="['survey_wrapper', positionClass[position]]">
      <slot name="card" v-bind="props" @close="handleModal"> </slot>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const positionClass = {
  right: 'justify-end',
  left: 'justify-start',
  center: 'justify-center',
};

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title: string;
    subtitle?: string;
    position?: 'right' | 'left' | 'center';
  }>(),
  {
    subtitle: '',
    position: 'center',
  }
);

const emits = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
  (e: 'handleSuccesfull'): void;
}>();

const openModal = ref(props.modelValue);
const modelValue = computed(() => props.modelValue);

watch(modelValue, value => (openModal.value = value));
watch(openModal, value => emits('update:modelValue', value));

const handleModal = () => {
  openModal.value = !openModal.value;
};
</script>
<style scoped src="./SSurveyWrapper.scss"></style>
