<template>
  <div class="app_container">
    <sm-alert-stack />
    <s-page-heading title="[Heading Title]" description="Description......">
      <template #actions>
        <s-button>Label</s-button>
        <s-button>Label</s-button>
      </template>
    </s-page-heading>
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
            :rules="selectRules"
            :options="[
              { text: 'Javascript', code: 'js', icon: 'flag-3' },
              { text: 'PHP', code: 'php', icon: 'flag-3' },
              { text: 'Python', code: 'py', icon: 'flag-3' },
              { text: 'C++', code: 'cc', icon: 'flag-3' },
            ]"
            @select="logEvent"
            @open="logEvent"
            @search="logEvent"
          />
          <s-input
            v-model="text"
            supportive-text="dasdasd"
            icon-right="bolt"
            :rules="sRules"
            :leading="{ label: 'Leading', icon: 'accounting', actionable: true }"
          />
          <s-input
            v-if="number === 3"
            v-model="text"
            icon-left="search"
            label="label"
            hint="hint"
            :rules="sRules"
            :trailing="{ icon: 'close', actionable: true, inline: true }"
            @blur="logEvent"
            @focus="logEvent"
            @click-trailing="number = 3"
          />
          <s-dropdown
            v-model="text3"
            label="Lenguaje favorito"
            can-deselect
            object
            show-mark
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
          <s-number-input v-model="number" label="number" show-mark icon-left="accounting" />
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
                (val) => {
                  return (val as radioTest).card === '1' || 'Debe escoger el valord card 1'
                }
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
    <s-table
      ref="testSmTable"
      :filter-config="{
        b: {
          type: 'datepicker',
        },
      }"
      :rows="items"
      :column-config="cols"
      :items-per-page="10"
      actions-col-width="100px"
      class="my-table"
      initial-order="DESC"
      is-fixed
      @refresh="onChange"
      @change="onChange"
      @filter="onChange"
    >
      <template #head.a>
        <input v-model="selectAll" type="checkbox" name="test" id="test" />
      </template>
      <template #rowCell(a)="{ row }">
        <s-cell :text="row.a" second-line="Second Line" avatar="Hola Mundo" right-content />
      </template>
    </s-table>
    <!-- <s-table /> -->
  </div>
</template>

<script setup lang="ts">
import { SmForm } from './index';
import { $SmAlert, ISmAlertProvide } from '../utils/alerts';
import { smTableChangeEvent, smTableColumn } from '~/interfaces';

interface radioTest {
  card: string;
}
const selectAll = ref(false);
const check = ref([]);
const radio = ref('');
const number = ref(3);
const text = ref('');
const text2 = ref('');
const text3 = ref('');
const options = ref<any[]>([]);

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
const testSmTable = ref(null);
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
    options.value = [
      { text: 'Javascript', code: 'js', icon: 'flag-3' },
      { text: 'PHP', code: 'php', icon: 'flag-3' },
      { text: 'Python', code: 'py', icon: 'flag-3' },
      { text: 'C++', code: 'cc', icon: 'flag-3' },
    ];
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
.my-table:deep() {
  .b-column {
    @apply whitespace-nowrap text-ellipsis overflow-x-hidden;
  }
  [data-name='b'] {
    @apply whitespace-nowrap text-ellipsis overflow-x-hidden;
  }
}
</style>
