<template>
  <div class="app_container">
    <s-accordion>
      <s-accordion-item title="Option 1" description="Description 1" icon="banks" selected>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi laboriosam non laborum?
          Possimus id quis, incidunt magni modi nesciunt laboriosam reprehenderit sed ut praesentium
          nisi vitae a error minima ratione.
        </p>
      </s-accordion-item>
    </s-accordion>
    <br /><br />
    <div>
      <s-slider v-model="sSilderModel" label="Label"></s-slider>
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
    <<<<<<< HEAD =======

    <SSlideover v-model="showSlideOver" header-text="Este es el titulo"></SSlideover>
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
          <s-file-upload
            v-model:files="files"
            label="Invoices"
            description="Only PDF, JPG or PNG less than 500mb"
            multiple
            @update:files="logEvent"
          />
          <s-datepicker
            v-model="selectedDate"
            label="fecha test"
            mark-type="required"
            :text-input="true"
            :range-mode="true"
            multi-calendars
            :sidebar-options="[
              { id: '1', title: 'Semana pasada' },
              { id: '2', title: 'TEST test' },
              { id: '3', title: 'S-TEST' },
            ]"
            required
          />
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
          <s-button @click="validate()">Submit</s-button>
          <s-button type="destructive" @click="reset">Reset</s-button>
        </template>
      </s-form>
    </sm-card>
    >>>>>>> feature/crear-slider-smile
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
