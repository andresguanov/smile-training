<template>
  <div class="s-toolbar">
    <div class="s-toolbar__actions">
      <div class="s-toolbar__actions__left">
        <s-input
          v-model="search"
          :placeholder="toolbarTexts.searchPlaceholder"
          class="s-toolbar__actions__search"
          size="small"
          icon-left="search"
          @update:model-value="emit('search', search)"
        />
        <div class="s-toolbar__actions__filter">
          <s-button
            v-if="filters.length"
            emphasis="text"
            type="ghost"
            size="small"
            @click.stop="toggleMenu()"
          >
            <sm-icon icon="filter" size="small" />
            <span>{{ toolbarTexts.filter }}</span>
          </s-button>
          <s-overflow-menu
            v-if="menuOpen"
            class="s-toolbar__menu"
            bubbling
            @click-outside="toggleMenu()"
          >
            <p class="s-toolbar__menu__label">{{ toolbarTexts.filter }} {{ toolbarTexts.by }}</p>
            <slot name="filters">
              <s-menu-item
                v-for="filter in filters"
                :key="filter.key"
                :title="filter.label"
                :icon="filter.icon || DEFAULT_ICONS[filter.type]"
                @click="onSelectFilter(filter)"
              />
            </slot>
          </s-overflow-menu>
        </div>
        <slot name="actions">
          <s-button
            v-for="action in actions"
            :key="action.name"
            :label="action.label"
            :icon-left="action.icon"
            emphasis="text"
            type="ghost"
            size="small"
            @click="emit('action', action.name)"
          />
        </slot>
      </div>
      <div class="s-toolbar__actions__right">
        <slot name="rightContent" />
      </div>
    </div>
    <div v-show="showToolbarFilters" class="s-toolbar__filters">
      <div class="s-toolbar__filters__chips">
        <s-chip
          v-for="activeFilter in activeFilters"
          :key="activeFilter.key"
          :label="activeFilter.label"
          :icon="activeFilter.icon || DEFAULT_ICONS[activeFilter.type]"
          type="filter"
          @click="onDeleteFilter(activeFilter.key)"
        />
        <s-button
          only-icon="plus"
          emphasis="text"
          type="ghost"
          size="small"
          @click.stop="toggleMenu()"
        />
      </div>
      <s-button
        :label="toolbarTexts.removeFilters"
        emphasis="filled"
        type="reversed"
        size="small"
        @click="deleteAllFilters()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IconType, ToolbarFilterType, ToolbarFilter, ToolbarAction } from '~/interfaces';

withDefaults(
  defineProps<{
    toolbarTexts?: {
      filter: string;
      by: string;
      removeFilters: string;
      searchPlaceholder?: string;
    };
    /**
     * Acciones secundarias para el toolbar,
     * cada una emite un evento `action` el cual devuelve
     * la propiedad name como parámetro.
     */
    actions?: ToolbarAction[];
    filters?: ToolbarFilter[];
  }>(),
  {
    searchPlaceholder: 'Buscar',
    filters: () => [],
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
  (event: 'search', value: string): void;
}>();

const search = ref('');
const activeFilters = ref<ToolbarFilter[]>([]);
const filterValues = ref<Record<string, unknown>>({});
const [menuOpen, toggleMenu] = useToggle(false);
const showToolbarFilters = computedEager(() => activeFilters.value.length);

const DEFAULT_ICONS: Record<ToolbarFilterType, IconType> = {
  checkbox: 'circle-dashed',
  datepicker: 'calendar',
  input: 'edit',
  select: 'list',
};
const onSelectFilter = (filter: ToolbarFilter) => {
  if (activeFilters.value.findIndex(el => el.key === filter.key) === -1) {
    activeFilters.value.push(filter);
    filterValues.value[filter.key] = null;
  }
};
const onDeleteFilter = (key: string) => {
  const index = activeFilters.value.findIndex(el => el.key === key);
  if (index >= 0) activeFilters.value.splice(index, 1);
};
const deleteAllFilters = () => {
  activeFilters.value = [];
};
</script>

<style scoped lang="scss" src="./SToolbar.scss"></style>
