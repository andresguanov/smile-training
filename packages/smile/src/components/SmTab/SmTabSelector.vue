<template>
  <div class="sm-tab-selector" v-sm-option="target">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue';
import { SmOption as vSmOption } from '../../directives';

const props = defineProps<{ target: string; selected?: boolean }>();

if (props.selected) {
  (inject('selected') as Ref<String>).value = props.target;
}
</script>

<style lang="scss" scoped>
@import './SmTabSelector.scss';
</style>
