<template>
  <div class="s-divider" :class="padding">
    <hr />
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
