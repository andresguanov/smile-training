<template>
  <div class="s-checkbox">
    <p v-if="label" class="s-checkbox__label">{{ label }}</p>
    <div class="s-checkbox__group" :class="[orientation]">
      <label
        v-for="(option, i) in options"
        :key="i"
        :class="{ 's-checkbox__checkbox--disabled': option.disabled }"
        class="s-checkbox__checkbox"
      >
        <input
          v-model="internalValue"
          :value="option.value"
          :disabled="option.disabled"
          :name="name"
          :indeterminate="option.indeterminate"
          type="checkbox"
          class="s-checkbox__checkbox__input"
        />
        <span class="s-checkbox__checkbox__label"> {{ option.label }} </span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string[]
    options?: {
      value: string
      label: string
      disabled?: boolean
      indeterminate?: boolean
    }[]
    /**
     * Identificador para los checkbox, se usa para diferenciar un grupo de checkbox de otro
     */
    name: string
    label?: string
    orientation?: 'horizontal' | 'vertical'
  }>(),
  { orientation: 'vertical', options: () => [] }
)
const emit = defineEmits<{
  (event: 'update:modelValue', value: string[]): void
}>()

const internalValue = useVModel(props, 'modelValue', emit)
if (props.options.length < 1) {
  console.warn('Missing data in %coptions', 'color: red;font-weight: bold;padding: 1px', 'prop.')
}
</script>

<style scoped lang="scss" src="./SCheckbox.scss"></style>
