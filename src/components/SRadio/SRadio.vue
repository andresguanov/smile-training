<template>
  <div class="s-radio">
    <p v-if="label" class="s-radio__label">{{ label }}</p>
    <div class="s-radio__group" :class="[orientation]">
      <label class="s-radio__radio" v-for="(option, i) in options" :key="i">
        <input
          v-model="internalValue"
          :value="option.value"
          :disabled="option.disabled"
          type="radio"
          class="s-radio__radio__input"
        />
        <span class="s-radio__radio__label"> {{ option.label }} </span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: any
    options?: {
      value: any
      label: string
      disabled?: boolean
    }[]
    label?: string
    orientation?: 'horizontal' | 'vertical'
  }>(),
  { orientation: 'vertical', options: () => [] }
)
const emit = defineEmits<{
  (event: 'update:modelValue', value: any): void
}>()

const internalValue = useVModel(props, 'modelValue', emit)
if (props.options.length < 1) {
  console.warn('Missing data in %coptions', 'color: red;font-weight: bold;padding: 1px', 'prop.')
}
</script>

<style scoped lang="scss" src="./SRadio.scss"></style>
