<template>
  <div :class="{ 's-empty--in-component': isOnComponent }" class="s-empty">
    <slot name="illustration">
      <sm-icon v-if="isOnComponent" :icon="generalIcon" class="s-empty__icon" />
      <img
        v-else
        :src="emptyStateIllustration"
        alt="No hubo resultados"
        class="s-empty__image"
        aria-hidden
      />
    </slot>
    <h3 class="s-empty__title">{{ title }}</h3>
    <p class="s-empty__message" v-html-sanitized="description"></p>
    <s-button
      :label="action.label"
      :icon-left="action.icon"
      size="small"
      class="s-empty__action"
      @click="emit('clickAction')"
    />
    <s-button
      v-if="secondaryAction"
      :label="secondaryAction"
      emphasis="text"
      size="small"
      class="s-empty__action--secondary"
      @click="emit('clickSecondaryAction')"
    />
  </div>
</template>

<script setup lang="ts">
import emptyStateIllustration from '../../assets/empty-state-illustration.svg';
import type { IconType } from '../../interfaces';
import { vHtmlSanitized } from '~/directives';

withDefaults(
  defineProps<{
    isOnComponent?: boolean;
    title?: string;
    description?: string;
    generalIcon?: IconType;
    action?: {
      label: string;
      icon: IconType;
    };
    secondaryAction?: string;
  }>(),
  {
    title: 'Ningun resultado encontrado',
    generalIcon: 'search',
    description:
      'Pidele al dueño que te otorgue acceso, o contrata un hacker y entra. De paso le robas bitcoins.',
    action: () => ({
      icon: 'home',
      label: 'Regresar',
    }),
  }
);

const emit = defineEmits<{
  (event: 'clickAction'): void;
  (event: 'clickSecondaryAction'): void;
}>();
</script>

<style scoped lang="scss" src="./SEmptyState.scss"></style>
