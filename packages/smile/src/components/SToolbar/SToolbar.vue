<template>
  <div class="s-toolbar">
    <div class="s-toolbar__actions">
      <div class="s-toolbar__actions__left">
        <s-input
          v-if="!hideSearch"
          v-model="search"
          :placeholder="toolbarTexts.searchPlaceholder"
          class="s-toolbar__actions__search"
          size="small"
          icon-left="search"
          @update:model-value="emit('search', search)"
        />
        <s-toolbar-menu
          v-if="filters.length"
          :header-text="`${toolbarTexts.filter} ${toolbarTexts.by}`"
          is-limited
        >
          <template #toggle="{ toggleMenu }">
            <s-button emphasis="text" type="ghost" size="small" @click.stop="toggleMenu()">
              <sm-icon icon="filter" size="small" />
              <span>{{ toolbarTexts.filter }}</span>
            </s-button>
          </template>
          <template #content>
            <s-menu-item
              v-for="filter in filters"
              :key="filter.key"
              :title="filter.label"
              :icon="filter.icon"
              @click="onSelectFilter(filter)"
            />
          </template>
        </s-toolbar-menu>
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
        {{ filterValues }}
        <slot name="rightContent" />
      </div>
    </div>
    <div v-show="showToolbarFilters" class="s-toolbar__filters">
      <div class="s-toolbar__filters__chips">
        <s-toolbar-menu
          v-for="activeFilter in activeFilters"
          :header-text="activeFilter.label"
          has-delete-button
          @select-delete="deleteFilter(activeFilter.key)"
        >
          <template #toggle="{ toggleMenu }">
            <s-chip
              :key="activeFilter.key"
              :label="activeFilter.label"
              :icon="activeFilter.icon"
              type="filter"
              @click.stop="toggleMenu()"
            />
          </template>
          <template #content>
            <slot
              :name="`filter(${activeFilter.key})`"
              :value="filterValues[activeFilter.key]"
              :update-filter-value="updateFilterValue"
            />
          </template>
        </s-toolbar-menu>
        <s-toolbar-menu :header-text="`${toolbarTexts.filter} ${toolbarTexts.by}`" is-limited>
          <template #toggle="{ toggleMenu }">
            <s-button
              only-icon="plus"
              emphasis="text"
              type="ghost"
              size="small"
              @click.stop="toggleMenu()"
            />
          </template>
          <template #content>
            <s-menu-item
              v-for="filter in filters"
              :key="filter.key"
              :title="filter.label"
              :icon="filter.icon"
              @click="onSelectFilter(filter)"
            />
          </template>
        </s-toolbar-menu>
      </div>
      <s-button
        :label="toolbarTexts.removeFilters"
        emphasis="filled"
        type="reversed"
        size="small"
        @click="resetFilters()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ToolbarFilter } from '~/interfaces';
import { SToolbarProps } from './props';

withDefaults(defineProps<SToolbarProps>(), {
  searchPlaceholder: 'Buscar',
  filters: () => [],
  actions: () => [],
  toolbarTexts: () => ({
    by: 'por',
    filter: 'Filtrar',
    removeFilters: 'Remover filtros',
  }),
});
const emit = defineEmits<{
  (event: 'action', value: string): void;
  (event: 'search', value: string): void;
  (event: 'filter', value: Record<string, unknown>): void;
}>();
const search = ref('');
const activeFilters = ref<ToolbarFilter[]>([]);
const filterValues = ref<Record<string, unknown>>({});
const showToolbarFilters = computedEager(() => activeFilters.value.length);

const findFilterIndex = (key: string) => activeFilters.value.findIndex(el => el.key === key);
const onSelectFilter = (filter: ToolbarFilter) => {
  if (findFilterIndex(filter.key) === -1) {
    activeFilters.value.push(filter);
    filterValues.value[filter.key] = filter.initialValue || '';
  }
};
const deleteFilter = (key: string) => {
  const index = findFilterIndex(key);
  if (index >= 0) {
    activeFilters.value.splice(index, 1);
    delete filterValues.value[key];
  }
};
const resetFilters = () => {
  activeFilters.value = [];
  filterValues.value = {};
};
const updateFilterValue = (key: string, value: unknown) => {
  filterValues.value[key] = value;
  emit('filter', filterValues.value);
};

defineExpose({
  resetFilters,
  deleteFilter,
});
</script>

<style scoped lang="scss" src="./SToolbar.scss"></style>
