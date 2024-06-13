<template>
  <div class="s-toolbar__menu__container">
    <slot name="toggle" :toggle-menu="toggleMenu" />
    <s-overflow-menu
      v-if="isOpen"
      class="s-toolbar__menu"
      :class="{ 's-toolbar__menu--limited': isLimited }"
      max-height="auto"
      bubbling
      @click-outside="toggleMenu()"
    >
      <div v-if="headerText" class="s-toolbar__menu__header">
        <p>{{ headerText }}</p>
        <s-button
          v-if="hasDeleteButton"
          only-icon="delete"
          emphasis="text"
          type="ghost"
          size="small"
          @click="emit('selectDelete')"
        />
      </div>
      <slot name="content" />
    </s-overflow-menu>
  </div>
</template>

<script setup lang="ts">
import { SToolbarMenuProps } from './props';

defineProps<SToolbarMenuProps>();
const emit = defineEmits<{
  (event: 'selectDelete'): void;
}>();

const [isOpen, toggleMenu] = useToggle(false);
</script>

<style scoped lang="scss">
.s-toolbar__menu {
  @apply left-0 mt-1;

  &--limited {
    @apply w-60;
  }
  &__header {
    @apply px-2 text-xs text-slate-500 mb-2;
    @apply flex justify-between items-center;
  }
  &__container {
    @apply relative;
  }
}
</style>
