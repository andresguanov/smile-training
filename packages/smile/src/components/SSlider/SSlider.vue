<template>
  <div class="s-slider">
    <p class="s-slider-label">{{ label }}</p>
    <div class="s-slider-content">
      <div class="s-slider-value">
        <div
          class="s-slider-tooltip"
          :style="{
            left: `${-(sliderValue?.offsetWidth / 2) + (data / 100) * slider?.offsetWidth}px`,
          }"
        >
          <span ref="sliderValue">{{ data }}</span>
          <div class="s-slider-tooltip-arrow"></div>
        </div>
      </div>
      <input
        v-model="data"
        type="range"
        :min="min"
        :max="max"
        class="s-slider-input"
        ref="slider"
        @input="showTooltip = true"
        @mousemove="e => (cursorValues.mouse = e.pageX)"
      />
    </div>

    <div class="s-slider-footer">
      <span>min</span>
      <span>max</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: number;
    label: String;
    min?: number;
    max?: number;
  }>(),
  {
    min: 0,
    max: 100,
  }
);

const emits = defineEmits<{
  (event: 'update:modelValue', value: number): void;
}>();
const slider = ref<HTMLInputElement | any>();
const cursorValues = ref({ mouse: 0, x: 0 });
const sliderValue = ref<HTMLInputElement | any>();
const showTooltip = ref(false);

const data = useVModel(props, 'modelValue', emits);
</script>

<style scoped lang="scss" src="./SSlider.scss"></style>
