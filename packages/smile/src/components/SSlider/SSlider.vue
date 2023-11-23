<template>
  <div class="s-slider-container">
    <div class="s-slider">
      <p class="s-slider-label">{{ label }}</p>
      <div class="s-slider-content" @mouseover="showTooltip = true" @mouseout="showTooltip = false">
        <div class="s-slider-value">
          <transition name="fade">
            <div
              v-if="showTooltip"
              class="s-slider-tooltip"
              :style="{
                left: `${-(sliderValue?.offsetWidth / 2) + (data / max) * slider?.offsetWidth}px`,
              }"
            >
              <span ref="sliderValue">{{ data }}</span>
              <div class="s-slider-tooltip-arrow"></div>
            </div>
          </transition>
        </div>
        <input
          v-model="data"
          type="range"
          :min="min"
          :max="max"
          class="s-slider-input"
          ref="slider"
        />
      </div>

      <div class="s-slider-footer">
        <span>min</span>
        <span>max</span>
      </div>
    </div>

    <div class="s-slider-sinput">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * SSlider component represents a slider input control that allows users to select a value from a range of values.
 *
 * @component SSlider
 *
 * @prop {number|string} modelValue - The value of the slider.
 * @prop {string} label - The label of the slider.
 * @prop {number} [min=0] - The minimum value of the slider.
 * @prop {number} [max=100] - The maximum value of the slider.
 *
 * @emits update:modelValue - Emitted when the value of the slider changes.
 */

const props = withDefaults(
  defineProps<{
    modelValue: number | string;
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
  (event: 'update:modelValue', value: number | string): void;
}>();
const slider = ref<HTMLInputElement | any>();
const sliderValue = ref<HTMLInputElement | any>();
const showTooltip = ref(false);

const data = useVModel(props, 'modelValue', emits);
</script>

<style scoped lang="scss" src="./SSlider.scss"></style>
