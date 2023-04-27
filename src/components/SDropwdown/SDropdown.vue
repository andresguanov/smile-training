<template>
  <div class="s-dropdown">
    <s-input
      v-model="value"
      :size="size"
      :icon-left="search ? 'search' : undefined"
      :icon-right="trailingIcon"
      @click="open = !open"
    />
    <div v-if="open" ref="menuEl" class="s-dropdown__menu"></div>
  </div>
</template>

<script setup lang="ts">
import type { IconType, smInputAddon } from '../../interfaces'

const props = withDefaults(
  defineProps<{
    modelValue: string
    size?: 'small' | 'medium' | 'large'
    leading?: smInputAddon
    trailing?: smInputAddon
    iconLeft?: IconType
    iconRight?: IconType
    hint?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    success?: boolean
    loading?: boolean
    search?: boolean
    /**
     * Disponible solo cuando el componente está dentro de SmForm.
     * Permite establecer las validaciones del componente.
     */
    rules?: Array<(value: string) => boolean | string>
    error?: string
  }>(),
  {
    placeholder: 'Placeholder',
    size: 'medium',
    rules: () => [],
  }
)
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'focusOut', value: FocusEvent): void
}>()

const value = useVModel(props, 'modelValue', emit)

const open = ref(false)
const trailingIcon = computed<IconType>(() => {
  if (props.search) return 'close'
  return open.value ? 'chevron-up' : 'chevron-down'
})
</script>

<style scoped lang="scss" src="./SDropdown.scss"></style>
