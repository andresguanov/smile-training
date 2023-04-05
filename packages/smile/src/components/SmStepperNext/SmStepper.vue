<template>
  <div class="sm-stepper">
    <sm-step
      v-for="(item, index) in steps"
      :key="index"
      :label="!hideLabels ? item : ''"
      :state="getStepState(index)"
      class="sm-stepper__step"
      @click="emit('click-step', index)"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: number;
  steps: string[];
  hideLabels?: boolean;
  currentStepHasError?: boolean;
}>();

const emit = defineEmits(['click-step', 'update:modelValue']);

const currentStep = useVModel(props, 'modelValue', emit);

const getStepState = (index: number): 'pending' | 'progress' | 'completed' | 'error' => {
  if (index > currentStep.value) return 'pending';
  if (index === currentStep.value) return props.currentStepHasError ? 'error' : 'progress';
  return 'completed';
};
</script>

<style scoped lang="scss" src="./SmStepper.scss"></style>
