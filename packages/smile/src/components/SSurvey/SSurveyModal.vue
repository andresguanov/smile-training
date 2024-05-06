<template>
  <s-wrapper :title="title" :subtitle="subtitle" v-model="modal">
    <template #card="props_slot">
      <SurveyCard v-bind="props_slot" @close="handleModal" @send="handleSend"></SurveyCard>
    </template>
  </s-wrapper>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import SurveyCard from './SSurveyCard.vue';
import SWrapper from './SSurveyWrapper.vue';
import type { SurveyInputs } from '~/interfaces';

const props = defineProps<{
  modelValue: boolean;
  title: string;
  subtitle: string;
  sendText: string;
  omitText: string;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
  (event: 'omit'): void;
  (event: 'send', data: any): void;
}>();

const modal = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const handleModal = () => {
  emit('omit');
  modal.value = false;
};

const handleSend = (val: SurveyInputs) => {
  emit('send', val);
};
</script>
<style lang="scss" scoped></style>
