<template>
  <div class="app_container">
    <s-notify-stack />
    <div>
      <s-slider v-model="sSilderModel" label="Label"></s-slider>
    </div>
    <s-tag label="Demorado" type="primary" leading-icon="cloud-download" />
    <s-tag label="Completado" type="slate" leading-icon="checks" />
    <s-datepicker v-model="selected" />
    <div class="relative">
      <s-input
        v-model="search"
        icon-right="search"
        placeholder="Buscar..."
        @click.stop="open = !open"
      />
      <s-overflow-menu
        v-if="open"
        top="100%"
        left="0"
        right="0"
        bubbling
        @click-outside="open = false"
      >
        <template #header>
          <div class="px-2 pt-2">
            <p>Resultados de la busqueda:</p>
          </div>
        </template>
        <s-menu-item title="Test 1" />
        <s-menu-item title="Test 2" />
        <s-menu-item title="Test 3" />
      </s-overflow-menu>
    </div>
    <s-wizard
      v-model="step"
      :steps="steps"
      has-back-button
      :is-on-component="true"
      :menu="{
        userName: 'Carlos Quispe',
        userId: '123213',
        items: [
          {
            icon: 'add',
            id: 'add',
            text: 'dasads',
          },
        ],
        hasLogout: true,
        onlyAvatar: true,
      }"
    />
    <s-table
      ref="testSmTable"
      :rows="items"
      :filters="[{ key: 'date', label: 'fecha', type: 'datepicker', icon: 'clock' }]"
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
    </s-table>
  </div>
</template>

<script setup lang="ts">
import type { smTableChangeEvent, smTableColumn } from '~/interfaces';
import { SButton } from './index';
import { $SmAlert, ISmAlertProvide } from '../utils/alerts';

const selected = ref('');
const search = ref('');
const open = ref(false);
const step = ref(1);
const sSilderModel = ref(0);
const step1 = h('div', [h('p', 'Formulario 1'), h('input', { placeholder: 'User' })]);
const step2 = h('div', [h('p', 'Formulario 2'), h('input', { placeholder: 'Email' })]);
const step3 = h('div', [
  h('p', 'Formulario 2'),
  h('input', { placeholder: 'Fecha', type: 'date' }),
]);
const steps = [
  {
    title: 'STEP 1',
    description: 'Descripción del step 1',
    label: 'user',
    components: [step1, SButton],
  },
  {
    title: 'STEP 2',
    description: 'Descripción del step 2',
    label: 'email',
    components: [step2],
  },
  {
    title: 'STEP 3',
    description: 'Descripción del step 3',
    label: 'date',
    components: [step3],
  },
];
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

const smAlert = inject<ISmAlertProvide>($SmAlert);
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
