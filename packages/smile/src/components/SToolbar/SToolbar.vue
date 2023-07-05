<template>
  <div class="s-toolbar">
    <div class="s-toolbar__actions">
      <div class="s-toolbar__actions__left">
        <s-input
          v-model="search"
          :placeholder="searchPlaceholder"
          class="s-toolbar__actions__search"
          size="small"
          icon-left="search"
        />
        <s-button emphasis="filled" type="reversed" size="small" @click="toggleFilters()">
          <sm-icon icon="filter" size="small" />
          <span>{{ filterLabel }}</span>
        </s-button>
        <slot name="actions">
          <s-button
            v-for="action in actions"
            :key="action.name"
            :label="action.label"
            :icon-left="action.icon"
            emphasis="filled"
            type="reversed"
            size="small"
            @click="emit('action', action.name)"
          />
        </slot>
      </div>
      <div class="s-toolbar__actions__right">
        <slot name="rightContent" />
      </div>
    </div>
    <div v-show="filtersOpen" class="s-toolbar__filters">
      <div class="s-toolbar__filters__chips">
        <s-chip :label="'dasd'" type="filter" />
        <s-button only-icon="plus" emphasis="filled" type="reversed" size="small" />
      </div>
      <s-button :label="removeFiltersLabel" emphasis="filled" type="reversed" size="small" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IconType } from '~/interfaces';

withDefaults(
  defineProps<{
    searchPlaceholder?: string;
    filterLabel?: string;
    removeFiltersLabel?: string;
    /**
     * Acciones secundarias para el toolbar,
     * cada una emite un evento `action` el cual devuelve
     * la propiedad name como parámetro.
     */
    actions?: {
      name: string;
      label: string;
      icon?: IconType;
    }[];
  }>(),
  {
    filterLabel: 'Filtrar',
    searchPlaceholder: 'Buscar',
    removeFiltersLabel: 'Remover filtros',
    actions: () => [],
  }
);
const emit = defineEmits<{
  (event: 'action', value: string): void;
}>();

const search = ref('');
const [filtersOpen, toggleFilters] = useToggle(false);
</script>

<style scoped lang="scss" src="./SToolbar.scss"></style>
