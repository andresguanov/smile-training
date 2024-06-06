<template>
  <div class="app_container">
    <p>{{ text }}</p>
    <s-table
      :rows="rows"
      :column-config="cols"
      :total="total"
      pagination-full-mode
      @change="onChange"
    >
      <template #toolbar>
        <s-toolbar
          :filters="[
            {
              key: 'date',
              label: 'fecha',
              icon: 'clock',
            },
          ]"
          hide-search
          @filter="v => console.log({ v })"
        >
          <template #rightContent> rightContent </template>
          <template #filter(date)="{ value, updateFilterValue }">
            <s-datepicker-base
              :model-value="value"
              inline
              @update:model-value="v => updateFilterValue('date', v)"
            />
            <s-datepicker
              :model-value="value"
              @update:model-value="v => updateFilterValue('date', v)"
            />
          </template>
        </s-toolbar>
      </template>
      <template #rowCell(avatar)="{ row }">
        <s-cell :text="row.text.toString()" :avatar="row.avatar.toString()" />
      </template>
    </s-table>
  </div>
</template>

<script setup lang="ts">
import { TableChangeEvent, TableColumn } from '~/interfaces';

interface Row {
  id: number;
  text: string;
  avatar: string;
}

const total = ref(33);
const text = ref('Hello World');
const paginationData = ref({
  start: 0,
  to: 10,
});
const rows = computed(() => {
  const obj: Row[] = [];
  const maxValue = Math.min(paginationData.value.to, total.value);
  console.log({ maxValue });

  for (let i = paginationData.value.start; i < maxValue; i++) {
    obj.push({
      id: i,
      text: 'Dato ' + i,
      avatar: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        i + 1
      }.png`,
    });
  }
  return obj;
});
const cols: TableColumn[] = reactive([
  {
    bodyAlign: 'left',
    headerAlign: 'left',
    filterable: true,
    order: true,
    name: 'id',
    width: '100px',
  },
  {
    filterable: false,
    order: false,
    label: 'información',
    name: 'text',
    width: '200px',
    bodyClass: 'text-slate-900 font-bold',
  },
  {
    bodyAlign: 'left',
    headerAlign: 'left',
    format: (value: string) => `${value.toUpperCase()} +`,
    label: 'Avatar',
    name: 'avatar',
    width: '300px',
  },
]);
const onChange = (data: TableChangeEvent) => {
  paginationData.value.start = data.start;
  paginationData.value.to = data.to;
};
</script>

<style lang="scss" scoped>
.app_container {
  @apply flex flex-col p-4;
}
</style>
