<template>
  <div class="s-carousel-actions">
    <SButton
      size="small"
      emphasis="text"
      only-icon="arrow-left"
      :disabled="ctasDisabled['left']"
      @click="handleAction('back')"
    />
    <p>{{ currentPage }} de {{ totalPages }}</p>
    <SButton
      size="small"
      emphasis="text"
      only-icon="arrow-right"
      :disabled="ctasDisabled['right']"
      @click="handleAction('next')"
    />
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (event: 'update:currentPage', page: number): void;
}>();

const ctasDisabled = computed(() => ({
  left: props.currentPage === 1,
  right: props.currentPage === props.totalPages,
}));

type Action = 'next' | 'back';

const actions: Record<Action, (page: number, totalPages: number) => void> = {
  next: (page, totalPages) => page < totalPages && updatePage(page + 1),
  back: (page, totalPages) => page > 0 && updatePage(page - 1),
};

const handleAction = (action: Action) => {
  actions[action](props.currentPage, props.totalPages);
};

const updatePage = (page: number) => {
  emit('update:currentPage', page);
};
</script>
<style lang="scss" scoped>
.s-carousel-actions {
  @apply flex p-[6px] gap-[6px] items-center justify-center;
  @apply text-slate-500 text-xs font-normal;
  .sm-icon {
    &:not(.disabled) {
      @apply cursor-pointer;
    }
  }
}
</style>
