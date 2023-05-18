<template>
  <div class="sm-error" style="position: relative">
    <sm-icon icon="info" type="error" />
    <ul>
      <li v-for="(error, i) in errorMessages" :key="i">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import SmIcon from '../SmIcon/SmIcon.vue';

defineProps<{
  errorMessages: String[];
}>();
</script>

<style scoped lang="scss">
@import './SmErrorList.scss';
</style>
