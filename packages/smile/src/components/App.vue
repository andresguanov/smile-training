<template>
  <div class="app_container">
    <SPopOver
      v-model="showPopOver"
      title="Título del popover"
      description="Los popovers son desplegados al hacer click o un tap en lugar de hacer hover, como un tooltip"
    >
      <span>Paragraph with PopOver</span>
      <template #actions>
        <div style="display: flex; justify-content: flex-end">
          <s-button type="reversed" size="small" emphasis="text" @click="showPopOver = false">
            Cerrar
          </s-button>
          <s-button type="reversed" size="small">Label</s-button>
        </div>
      </template>
    </SPopOver>
    <br />
    <sm-alert-stack />
    <s-modal
      v-model="modal"
      header-text="Carga un archivo o documento"
      success-text="Cargar Archivo"
      cancel-text="Cancelar"
    >
    </s-modal>
    <sm-card class="mt-1">
      <s-form ref="smFormEl" validate-on="focusout">
        <template #default="{ validate, reset, isValid }">
          {{ isValid }}
          <div id="popover-target-1" @click="showPopOver = true">
            <s-chip label="test" selected avatar="Carlos" />
          </div>
          <s-datepicker v-model="date" label="fecha test" />
          <s-chip label="test" disabled selected />
          {{ text2 }}
          <s-dropdown
            v-model="text2"
            label="elije"
            placeholder="dasdasd"
            multiple
            search
            id="dropdown-test"
            :rules="selectRules"
            :options="options"
            :leading="{
              label: 'Leading',
              leadingIcon: 'accounting',
            }"
            @select="logEvent"
            @open="logEvent"
            @search="logEvent"
          >
            <template #leading>
              <p>🏴</p>
              yo
            </template>
          </s-dropdown>
          <s-input
            v-model="text"
            supportive-text="dasdasd"
            native-type="password"
            icon-right="bolt"
            label="password"
            mark-type="optional"
            :rules="sRules"
          >
            <template #leading>
              <p>dasdasd</p>
            </template>
          </s-input>
          <s-input
            v-if="number === 3"
            v-model="text"
            icon-left="search"
            label="label"
            hint="hint"
            :rules="sRules"
            :leading="{
              label: 'Leading',
              leadingIcon: 'accounting',
              actionable: true,
            }"
            @blur="logEvent"
            @focus="logEvent"
            @click-trailing="number = 3"
          />
          <s-dropdown
            v-model="text3"
            label="Lenguaje favorito"
            can-deselect
            object
            mark-type="required"
            required
            placeholder="Escoge tu lenguaje favorito"
            :options="options"
            :loading="isLoadingOptions"
            max-height="125px"
            @search="logEvent"
            @select="logEvent"
            @open="openLanguajes"
          >
            <template #beforeOptions>
              <button>Añadir lenguaje</button>
            </template>
          </s-dropdown>
          {{ text3 }}
          <s-number-input
            v-model="number"
            label="number"
            show-mark
            icon-left="accounting"
            :leading="{
              label: '$',
              inline: true,
            }"
          />
          <sm-button type="primary" @click="validate()">Submit</sm-button>
          <sm-button type="primary" @click="reset">Reset</sm-button>
        </template>
      </s-form>
    </sm-card>
    <sm-table
      ref="testSmTable"
      :rows="items"
      :filter-config="{
        b: {
          type: 'datepicker',
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
        <s-cell :text="row.a" second-line="Second Line" avatar="Hola Mundo" right-content />
      </template>
    </sm-table>
    <!-- <s-table /> -->
  </div>
</template>

<script setup lang="ts">
import type { smTableChangeEvent, smTableColumn } from '~/interfaces';
import { SButton, SmForm } from './index';
import { $SmAlert, ISmAlertProvide } from '../utils/alerts';

const selectAll = ref(false);
const modal = ref(false);
const number = ref(3);
const text = ref('');
const date = ref('');
const text2 = ref([]);
const text3 = ref('');
const showPopOver = ref(true);
const options = ref<any[]>([
  {
    text: 'Javascript Javascript Javascript Javascript Javascript Javascript',
    description: 'Javascript Javascript Javascript Javascript Javascript Javascript',
    code: 'js',
    icon: 'flag-3',
  },
  { text: 'PHP', code: 'php', icon: 'flag-3' },
  { text: 'Python', code: 'py', icon: 'flag-3' },
  { text: 'C++', code: 'cc', icon: 'flag-3' },
]);

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
    width: '100px',
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
const sRules = ref([
  (v: string) => {
    return !!v || 'El valor es requerido';
  },
]);
const selectRules = ref([
  (v: any) => {
    return Boolean(v?.length) || 'Algo falta';
  },
]);
const smFormEl = ref<InstanceType<typeof SmForm> | null>();
const isLoadingOptions = ref(false);
const openLanguajes = () => {
  isLoadingOptions.value = true;
  setTimeout(() => {
    options.value = [...options.value];
    isLoadingOptions.value = false;
  }, 3000);
};

const smAlert = inject<ISmAlertProvide>($SmAlert);
onMounted(() => {
  smAlert?.success('Hola mundo');
  smAlert?.error('Hola mundo');
  smAlert?.warning('Hola mundo', { title: '<h2>Grande</h2> pequeño' });
  smAlert?.info(
    `
  Errores:
    <ul class="flex gap-4">
      <li>1: Error al cargar los datos bla bla bla...</li>
      <li>2: No se pudo generar la factura de venta a por los sig. motivos...</li>
    </ul>
    `,
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
