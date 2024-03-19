<template>
  <div class="s-divider" :class="padding">
    <hr class="w-full" />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  padding: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large', 'huge'].includes(value),
  },
});
</script>

<style scoped lang="scss" src="./SDivider.scss" />
