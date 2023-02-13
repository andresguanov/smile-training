<template>
  <div class="app_container">
    <sm-alert-stack />
    <sm-card>
      <sm-form ref="smFormEl" validation-mode="on-focusout">
        <template #default="{ validate, reset }">
          <sm-datepicker v-model="datepicker" label="Nombre" :rules="sRules" range size="large" />
          <sm-button type="primary" @click="validate()">Submit</sm-button>
          <sm-button type="primary" @click="reset">Reset</sm-button>
        </template>
      </sm-form>
    </sm-card>
    <sm-card>
      <sm-form ref="smFormEl" validation-mode="on-type" container-is-form @submit="onSubmit">
        <template #default="{ isValid, reset }">
          <h4>El formulario es: {{ isValid ? 'válido' : 'no válido' }}</h4>
          <sm-radio v-model="radio" label="Nombre A" native-value="A" :rules="rRules" />
          <sm-radio v-model="radio" label="Nombre B" native-value="B" :rules="rRules" />
          <sm-radio v-model="radio" label="Nombre C" native-value="C" :rules="rRules" />
          <sm-number-input v-model="number" :rules="numberRules" :min="0" :data-prefix="'$'" />
          <sm-button type="primary" native-type="submit">Submit</sm-button>
          <sm-button type="primary" @click="reset">Reset</sm-button>
          <sm-checkbox
            v-model="check"
            label-to-left
            label="Acepto que la información que he sumistrado es correcta y verdadera"
          />
        </template>
      </sm-form>
    </sm-card>
    <sm-modal v-model="modal">
      <template v-slot:header>Header</template>
      <template v-slot:body>
        <sm-hint comment="asdadasdas">
          <p>Body</p>
        </sm-hint>
      </template>
      <template v-slot:footer>
        <sm-button>Cancelar</sm-button>
        <sm-hint comment="asdadasdas">
          <sm-button type="primary">Aceptar</sm-button>
        </sm-hint>
      </template>
    </sm-modal>
    <sm-table
      :filter-config="{
        a: {
          type: 'input',
        },
        b: {
          type: 'datepicker',
        },
      }"
      :rows="items"
      :column-config="cols"
      is-fixed
    />
    <sm-button type="primary" @click="valid = !valid">Submit</sm-button>
    <sm-select v-model="selectedItem" :options="options" @filter="filter" multiple> </sm-select>
    {{ selectedItem }}
  </div>
</template>

<script setup lang="ts">
import {
  SmAlertStack,
  SmButton,
  SmDatepicker,
  SmRadio,
  SmCard,
  SmCheckbox,
  SmForm,
  SmModal,
  SmHint,
  SmSelect,
  SmTable,
  $SmAlert,
  ISmAlertProvide,
  smTableColumn,
} from '@alegradev/smile-ui-next';
import { computed, inject, onMounted, reactive, ref } from 'vue';
const filter = (text: string) => {
  console.log(text);
};
const modal = ref(true);
const check = ref(false);
const radio = ref('');
const number = ref(3);
const selectedItem = ref([3, 2, 1]);
const datepicker = ref('');
const options = ref([
  {
    text: 'A',
    value: 3,
  },
  {
    text: 'Ab',
    value: 2,
  },
  {
    text: 'casadjhkbsahjd',
    value: 3,
  },
  {
    text: 'dsadjhgasdjhgxc',
    value: 4,
    disabled: true,
  },
]);

const cols: smTableColumn[] = reactive([
  {
    bodyAlign: 'left',
    headerAlign: 'left',
    filterable: true,
    format: (value: string) => value.toUpperCase(),
    label: 'A',
    name: 'a',
    width: '200px',
  },
  {
    bodyAlign: 'left',
    headerAlign: 'left',
    filterable: true,
    format: (value: string) => value.toUpperCase(),
    label: 'B',
    name: 'b',
    width: '100px',
  },
  {
    bodyAlign: 'left',
    headerAlign: 'left',
    format: (value: string) => value.toUpperCase(),
    label: 'C',
    name: 'c',
    width: '300px',
  },
]);

// const totalItems = computed(() => (valid.value ? 25 : 5))
const items = computed(() => {
  const totalItems = 35;
  const obj: any[] = [];
  for (let i = 0; i < totalItems; i++) {
    obj.push({ a: i, b: 'a'.repeat(totalItems / 2), c: 'test' });
  }
  return obj;
});

const valid = ref(false);

const sRules = ref([
  (v: any) => {
    return !!v || 'Fecha es requerida';
  },
]);
const numberRules = ref([
  (v: any) => {
    return !!v || 'Número es requerido';
  },
  (v: any) => {
    return v < 2 || 'Número debe ser menor a 2';
  },
]);
const rRules = ref([
  (v: any) => {
    return !!v || 'Nombre es requerido';
  },
  (v: any) => {
    return v === 'B' || 'Nombre debe ser B';
  },
]);
const smFormEl = ref<InstanceType<typeof SmForm> | null>();
const onSubmit = (e?: string) => {
  console.log({ e });
};

const smAlert = inject<ISmAlertProvide>($SmAlert);
onMounted(() => {
  document.documentElement.setAttribute('sm-data-theme', 'sm-primary-alegra');
  smFormEl.value?.validateInputs(true);
  smAlert?.success('Hola mundo');
  smAlert?.error('Hola mundo');
  smAlert?.warning('Hola mundo');
  smAlert?.info('Hola mundo', { title: 'Titulo de info', persistent: true });
});
</script>

<style lang="scss" scoped>
.app_container {
  @apply flex flex-col;
  @apply m-5;
  @apply max-w-5xl;
}
</style>
