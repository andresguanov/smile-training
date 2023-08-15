<template>
  <div class="app_container">
    <sm-alert-stack />
    <s-wizard v-model="step" :steps="steps" has-back-button :is-on-component="true" />
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
          <s-chip label="test" selected avatar="Carlos" />
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
    <sm-card>
      <sm-form ref="smFormEl" validation-mode="on-type" container-is-form @submit="onSubmit">
        <template #default="{ isValid, reset }">
          <h4>El formulario es: {{ isValid ? 'válido' : 'no válido' }}</h4>
          <div class="flex flex-col">
            <s-radio
              v-model="radio"
              label="test"
              show-mark
              orientation="horizontal"
              :options="[
                { value: { card: '1' }, label: 'card-1' },
                { value: { card: '2' }, label: 'card-2' },
              ]"
              :rules="[
                val => {
                  return (val as radioTest).card === '1' || 'Debe escoger el valord card 1';
                },
              ]"
            />
            <s-checkbox
              v-model="check"
              name="test"
              label="test"
              orientation="horizontal"
              :options="[
                { value: '1', label: 'card-1' },
                { value: '2', label: 'card-2', disabled: true },
                { value: '3', label: 'card-3', disabled: true, indeterminate: true },
                { value: '4', label: 'card-4', indeterminate: true },
              ]"
              :rules="[
                val => {
                  return val.length > 0 || 'Debe escoger al menos una opción';
                },
              ]"
            />
          </div>
          <s-button emphasis="subtle" native-type="submit">Submit</s-button>
          <s-button emphasis="outline" @click="reset">Reset</s-button>
        </template>
      </sm-form>
    </sm-card>
    <sm-table
      ref="testSmTable"
      :filter-config="{
        a: {
          type: 'input',
        },
        b: {
          type: 'select',
          options: [
            { text: '1', value: 1 },
            { text: '2', value: 2 },
          ],
          attrs: {
            multiple: true,
          },
        },
      }"
      :rows="items"
      :column-config="cols"
      actions-col-width="100px"
      class="my-table"
      is-fixed
      @refresh="onChange"
      @change="onChange"
      @filter="onChange"
    >
      <template #head.a>
        <input v-model="selectAll" type="checkbox" name="test" id="test" />
      </template>
      <template #bodyRow.a="{ row }">
        <input v-model="selected" :value="row.a" type="checkbox" name="test" id="test" />
      </template>
    </sm-table>
  </div>
</template>

<script setup lang="ts">
import { SButton, SmForm, SmTable } from './index';
import { $SmAlert, ISmAlertProvide } from '../utils/alerts';
import { smStepWizard, smTableChangeEvent, smTableColumn } from '~/interfaces';

interface radioTest {
  card: string;
}
const selectAll = ref(false);
const selected = ref([]);
const modal = ref(true);
const check = ref([]);
const radio = ref('');
const number = ref(3);
const text = ref('');
const text2 = ref([]);
const text3 = ref('');
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
const step = ref(1);
const step1 = h('div', [h('p', 'Formulario 1'), h('input', { placeholder: 'User' })]);
const step2 = h('div', [h('p', 'Formulario 2'), h('input', { placeholder: 'Email' })]);
const step3 = h('div', [
  h('p', 'Formulario 2'),
  h('input', { placeholder: 'Fecha', type: 'date' }),
]);
const steps: smStepWizard[] = [
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
const onSubmit = (e?: string) => {
  console.log({ e });
};
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
  smFormEl.value?.validateInputs(true);
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
