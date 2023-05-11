<template>
  <div class="s-chip" :class="[type, { disabled, selected }]">
    <sm-icon v-if="type === 'filter'" size="small" :icon="icon" />
    <div v-else class="s-chip__avatar">{{ avatarText }}</div>
    <p class="s-chip__label">{{ label }}</p>
    <sm-icon class="s-chip__trailing" size="small" :icon="trailingIcon" />
  </div>
</template>

<script setup lang="ts">
import type { IconType } from '../../interfaces'

const props = withDefaults(
  defineProps<{
    label: string
    type?: 'input' | 'filter'
    disabled?: boolean
    selected?: boolean
    icon?: IconType
    avatar?: string
  }>(),
  { type: 'input', avatar: 'BM' }
)

const trailingIcon = computed<IconType>(() => (props.type === 'input' ? 'close' : 'chevron-down'))
const avatarText = computed(() => props.avatar.substring(0, 2))
</script>

<style lang="scss" scoped src="./SChip.scss"></style>
