<template>
  <div :class="TapClass" v-sm-option="target">
    <div v-if="isFilled" class="s-tab-label-filled__text">
      <slot></slot>
    </div>

    <slot v-else></slot>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue'
import { SmOption as vSmOption } from '../../directives'

const props = defineProps<{ target: string; selected?: boolean }>()

if (props.selected) {
  ;(inject('selected') as Ref<String>).value = props.target
}

const isFilled = inject('STabType')

const TapClass = computed(() => (isFilled ? 's-tab-label-filled' : 's-tab-label'))
</script>

<style lang="scss" scoped>
@import './STabLabel.scss';
</style>
