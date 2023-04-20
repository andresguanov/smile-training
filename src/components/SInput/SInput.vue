<template>
  <div class="s-input" :class="{ disabled, readonly, error }">
    <div class="s-input__header">
      <p class="s-input__label">Label</p>
      <small class="s-input__helper">{{ cornerHelper }}</small>
    </div>
    <div class="s-input__container" :class="[size, { filled: Boolean(value) }]">
      <s-input-leading
        class="s-input__leading"
        label="label"
        :size="size"
        :icon="iconLeft"
        actionable
      />
      <div v-if="iconLeft" class="s-input__icon leading">
        <sm-icon :icon="iconLeft" :width="iconSize" :height="iconSize" />
      </div>
      <input
        v-model="value"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        class="s-input__input"
      />
      <div v-if="success" class="s-input__icon success">
        <sm-icon icon="success" :width="iconSize" :height="iconSize" />
      </div>
      <div v-if="loading" class="s-input__icon loading">
        <sm-icon icon="loading" :width="iconSize" :height="iconSize" />
      </div>
      <div v-if="error" class="s-input__icon error">
        <sm-icon icon="alert-circle" :width="iconSize" :height="iconSize" />
      </div>
      <div v-if="iconRight" class="s-input__icon trailing">
        <sm-icon :icon="iconRight" :width="iconSize" :height="iconSize" />
      </div>
      <s-input-leading
        class="s-input__trailing"
        label="label"
        :size="size"
        inline
        :icon="iconLeft"
        actionable
        trailing
      />
    </div>
    <div class="s-input__footer">
      <small class="s-input__helper">{{ helper }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IconType } from '../../interfaces'

const props = withDefaults(
  defineProps<{
    modelValue: string
    size?: 'small' | 'medium' | 'large'
    leading?: boolean
    trailing?: boolean
    iconLeft?: IconType
    iconRight?: IconType
    helper?: string
    cornerHelper?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    error?: boolean
    success?: boolean
    loading?: boolean
  }>(),
  {
    placeholder: 'Placeholder',
    size: 'medium',
    helper: 'Supportive text',
  }
)
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const value = useVModel(props, 'modelValue', emit)
const iconSize = computed(() => (props.size === 'small' ? '16px' : '20px'))
</script>

<style scoped lang="scss" src="./SInput.scss"></style>
