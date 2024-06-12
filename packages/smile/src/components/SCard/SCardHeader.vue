<template>
  <div class="s_card_header_title">
    {{ title }}
    <span>
      <SmIcon v-if="icon" :icon="icon" size="small"></SmIcon>
    </span>
    <div v-if="modalActive" class="absolute right-[-8px] top-[-4px]">
      <SButton
        class="cpn_btn_header_card"
        @click="emit('clickBtnHeader')"
        emphasis="text"
        only-icon="close"
        size="medium"
      />
    </div>
  </div>

  <div class="s_card_header_subtitle">
    <slot name="subtitle">
      <div v-if="subtitle" class="w-full" v-html="subtitleText"></div>
    </slot>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { IconType } from '~/interfaces';

const subtitleText = computed(() => props.subtitle);

const props = defineProps<{
  title: string;
  subtitle?: string;
  icon?: IconType;
  modalActive?: boolean;
}>();

const emit = defineEmits<{
  (e: 'clickBtnHeader'): void;
}>();
</script>
<style lang="scss" scoped>
.s_card_header_title {
  @apply relative h-auto flex items-center pt-2 font-semibold text-xl text-slate-700;
}
.s_card_header_subtitle {
  @apply flex text-sm font-normal text-slate-700 max-w-[496px];
}
</style>
