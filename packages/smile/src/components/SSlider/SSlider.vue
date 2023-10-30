<template>
  <div class="s-slider">
    <p class="s-slider-label">{{ label }}</p>
    <div class="s-slider-content">
      <input
        v-model="data"
        type="range"
        min="0"
        max="100"
        class="s-slider-input"
        ref="slider"
        @input="showTippy"
        @change="closeTippy"
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
import { useTippy } from 'vue-tippy';
const props = withDefaults(
  defineProps<{
    modelValue: String;
    label: String;
  }>(),
  {}
);

const emits = defineEmits<{
  (event: 'update:modelValue', value: number): void;
}>();

const tippy = ref();
const slider = ref<HTMLInputElement | any>();
const cursorValues = ref({ mouse: 0, x: 0 });
// const sliderWidth = ref();
// const tippyRef = ref();

const data = useVModel(props, 'modelValue', emits);

onMounted(() => {
  tippy.value = useTippy(slider.value, {
    content: 'Tooltip Text',
    theme: 'smile-next',
    appendTo: () => document.body,
    placement: 'top',
    followCursor: 'horizontal',
    trigger: 'manual',
    // onAfterUpdate(instance, partialProps) {
    //   sliderWidth.value = instance.popper.getBoundingClientRect();
    //   tippyRef.value = instance.popper;
    // },
  });

  const thumb = slider.value?.querySelector('::-webkit-slider-thumb');

  console.log(thumb);

  // thumb.addEventListener('mouseenter', () => {
  //   // Ejecutar la función que desees cuando se haga hover sobre el slider-thumb
  //   console.log('Hover sobre el slider-thumb');
  // });
});

const showTippy = (e: Event) => {
  tippy.value.setContent(data.value);
  // tippy.value.setProps({ offset: [cursorValues.value.mouse - slider.value.clientWidth / 2, 10] });
  tippy.value.show();
};

const closeTippy = () => {
  tippy.value.hide();
};
</script>

<style scoped lang="scss" src="./SSlider.scss"></style>
