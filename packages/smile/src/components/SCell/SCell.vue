<template>
  <div class="s-cell" :class="{ 'right-content': rightContent }">
    <s-avatar
      v-if="avatar"
      :image="avatar"
      :text="text.toString()"
      size="xs"
      class="s-cell__avatar"
    />
    <div class="s-cell__text">
      <p class="s-cell__text__main">{{ text }}</p>
      <p class="s-cell__text__secondary">{{ secondLine }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  text: string | number;
  avatar?: string;
  secondLine?: string;
  rightContent?: boolean;
}>();
</script>

<style scoped lang="scss" src="./SCell.scss" />
