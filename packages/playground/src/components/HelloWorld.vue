<template>
  <div class="app_container">
    <s-notify-stack />
    <sm-table
      ref="testSmTable"
      :rows="items"
      :filters="[{ key: 'date', label: 'fecha', type: 'datepicker', icon: 'clock' }]"
      :filterConfig="{
        a: {
          type: 'select',
          options: [
            {
              text: 'Test 1 Test 1 Test 1 Test 1 Test 1 Test 1 Test 1 Test 1 Test 1 Test 1 Test 1 ',
              value: 'test1',
            },
            { text: 'Test 2', value: 'test2' },
            { text: 'Test 3', value: 'test3' },
          ],
          attrs: {
            multiple: true,
          },
        },
      }"
      :column-config="cols"
      class="my-table"
      :actions="[{ label: 'Test', name: 'test', icon: 'add' }]"
      pagination-full-mode
      @refresh="onChange"
      @change="onChange"
      @filter="onChange"
      @toolbar-action="logEvent"
    >
      <template #head.a>
        <input v-model="selectAll" type="checkbox" name="test" id="test" />
      </template>
      <template #rowCell(a)="{ row }">
        <s-cell
          :text="row.a"
          :avatar="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            row.a + 1
          }.png`"
          right-content
          second-line="Second Line"
        />
      </template>
    </sm-table>
  </div>
</template>

<script setup lang="ts">
import {
  STable,
  SmTable,
  SNotifyStack,
  useSmAlert,
  smTableChangeEvent,
  SCell,
} from '@alegradev/smile-ui-next';
import { ref, reactive, onMounted, inject, computed } from 'vue';

const selectAll = ref(false);

const cols: smTableColumn[] = reactive([
  {
    bodyAlign: 'left',
    headerAlign: 'left',
    filterable: true,
    order: true,
    format: (value: string) => value.toUpperCase(),
    label: 'A',
    name: 'a',
    width: '100px',
  },
  {
    bodyAlign: 'left',
    headerAlign: 'left',
    filterable: true,
    order: true,
    format: (value: string) => value.toUpperCase(),
    label: 'B es un nombre muy largo lorem ipsum -----',
    name: 'b',
    width: '200px',
    bodyClass: 'b-column whitespace-nowrap text-ellipsis overflow-x-hidden',
  },
  {
    bodyAlign: 'left',
    headerAlign: 'left',
    format: (value: string) => value.toUpperCase(),
    label: 'C',
    name: 'c',
    width: '100px',
  },
]);
const items = computed(() => {
  const totalItems = 35;
  const obj = [];
  for (let i = 0; i < totalItems; i++) {
    obj.push({ a: i, b: 'a'.repeat(totalItems), c: 'test test test test test test' });
  }
  return obj;
});
const onChange = (data: smTableChangeEvent) => {
  console.log({ data });
};
const logEvent = (event: any) => {
  console.log({ event });
};
const smAlert = useSmAlert();

onMounted(() => {
  smAlert?.success('Hola mundo');
  smAlert?.error('Hola mundo');
  smAlert?.warning('Hola mundo', { title: '<h2>Grande</h2> pequeño' });
  smAlert?.neutral('Hola mundo', { label: 'dasdasd' });
  smAlert?.info(
    `Errores:
    <ul class="flex gap-4">
      <li>1: Error al cargar los datos bla bla bla...</li>
      <li>2: No se pudo generar la factura de venta a por los sig. motivos...</li>
    </ul>`,
    {
      title: 'Titulo de info',
      persistent: true,
    }
  );
});
</script>

<style lang="scss" scoped>
.app_container {
  @apply flex flex-col;
  @apply m-5;
  @apply max-w-5xl;
}
</style>
