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
        <s-button emphasis="filled" type="reversed" size="small" @click="toggleMenu()">
          <sm-icon icon="filter" size="small" />
          <span>{{ toolbarTexts.filter }}</span>
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
        <s-button
          only-icon="plus"
          emphasis="filled"
          type="reversed"
          size="small"
          @click="toggleMenu()"
        />
      </div>
      <s-button
        :label="toolbarTexts.removeFilters"
        emphasis="filled"
        type="reversed"
        size="small"
        @click="toggleFilters(false)"
      />
    </div>
    <s-overflow-menu v-if="menuOpen" class="s-toolbar__menu" @click-outside="toggleMenu()">
      <p class="s-toolbar__menu__label">{{ toolbarTexts.filter }} {{ toolbarTexts.by }}</p>
      <s-menu-item
        v-for="filter in filters"
        :title="filter.label"
        :icon="icons[filter.type]"
        @click="toggleFilters(true)"
      />
    </s-overflow-menu>
  </div>
</template>

<script setup lang="ts">
import type { IconType, ToolbarFilterType, ToolbarFilter } from '~/interfaces';

withDefaults(
  defineProps<{
    searchPlaceholder?: string;
    toolbarTexts?: {
      filter: string;
      by: string;
      removeFilters: string;
    };
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
    filters: ToolbarFilter[];
  }>(),
  {
    searchPlaceholder: 'Buscar',
    actions: () => [],
    toolbarTexts: () => ({
      by: 'por',
      filter: 'Filtrar',
      removeFilters: 'Remover filtros',
    }),
  }
);
const emit = defineEmits<{
  (event: 'action', value: string): void;
}>();

const search = ref('');
const [filtersOpen, toggleFilters] = useToggle(false);
const [menuOpen, toggleMenu] = useToggle(false);

const icons: Record<ToolbarFilterType, IconType> = {
  checkbox: 'circle',
  datepicker: 'calendar',
  input: 'edit',
  select: 'view-list',
};
</script>

<style scoped lang="scss" src="./SToolbar.scss"></style>
