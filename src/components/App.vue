<template>
  <div class="app_container">
    <sm-alert-stack />
    <sm-card>
      <sm-form ref="smFormEl" validation-mode="on-focusout">
        <template #default="{ validate, reset }">
          <sm-datepicker v-model="datepicker" label="Nombre" :rules="sRules" range size="large" />
          <sm-select v-model="select" :options="options" label="Nombre" search :rules="sRules" />
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
          <sm-checkbox label="test" />
          <sm-datepicker v-model="datepicker" label="Nombre" :rules="sRules" range size="large" />
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
        <div class="w-[500px]">
          <sm-hint comment="asdadasdas">
            <p>Body</p>
          </sm-hint>
          <sm-datepicker
            v-model="datepicker"
            label="Nombre"
            error
            :error-messages="['test error']"
            :rules="sRules"
            range
            size="large"
          />
        </div>
      </template>
      <template v-slot:footer>
        <sm-button-next size="small" loading>Cancelar</sm-button-next>
        <sm-button-next type="destructive">Cancelar</sm-button-next>
        <sm-button-next size="large" type="reversed">Cancelar</sm-button-next>
        <sm-button-next emphasis="outline" disabled>Cancelar</sm-button-next>
        <sm-button-next emphasis="subtle" loading>Cancelar</sm-button-next>
        <sm-button-next emphasis="text" disabled loading>Cancelar</sm-button-next>
      </template>
    </sm-modal>
    <sm-table
      ref="testSmTable"
      :filter-config="{
        a: {
          type: 'input',
          attrs: {
            label: 'name',
          },
        },
        b: {
          type: 'datepicker',
        },
      }"
      :rows="items"
      :column-config="cols"
      :items-per-page="20"
      actions-col-width="100px"
      class="my-table"
      is-fixed
      @refresh="onChange"
      @change="onChange"
      @filter="onChange"
    >
      <template #actionsCol>
        <sm-select v-model="select" :options="options" />
      </template>
    </sm-table>
    <!-- <sm-button type="primary" @click="testSmTable?.onRefresh()">Submit</sm-button> -->
  </div>
</template>

<script setup lang="ts">
import { SmForm, SmTable } from './index'
import { $SmAlert, ISmAlertProvide } from '../utils/alerts'
import { smTableChangeEvent, smTableColumn } from '~/interfaces'

const modal = ref(true)
const check = ref(false)
const radio = ref('')
const number = ref(3)
const select = ref([])
const datepicker = ref('')
const options = ref([
  { text: '1', value: '1' },
  { text: '2', value: '2' },
  { text: '3', value: '3' },
])

const cols: smTableColumn[] = reactive([
  {
    bodyAlign: 'left',
    headerAlign: 'left',
    filterable: true,
    order: false,
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
])

const items = computed(() => {
  const totalItems = 35
  const obj = []
  for (let i = 0; i < totalItems; i++) {
    obj.push({ a: i, b: 'a'.repeat(totalItems), c: 'test test test test test test' })
  }
  return obj
})
const testSmTable = ref(null)
const onChange = (data: smTableChangeEvent) => {
  console.log({ data })
}

const sRules = ref([
  (v: any) => {
    return !!v || 'Fecha es requerida'
  },
])
const numberRules = ref([
  (v: any) => {
    return !!v || 'Número es requerido'
  },
  (v: any) => {
    return v < 2 || 'Número debe ser menor a 2'
  },
])
const rRules = ref([
  (v: any) => {
    return !!v || 'Nombre es requerido'
  },
  (v: any) => {
    return v === 'B' || 'Nombre debe ser B'
  },
])
const smFormEl = ref<InstanceType<typeof SmForm> | null>()
const onSubmit = (e?: string) => {
  console.log({ e })
}

const smAlert = inject<ISmAlertProvide>($SmAlert)
onMounted(() => {
  smFormEl.value?.validateInputs(true)
  smAlert?.success('Hola mundo')
  smAlert?.error('Hola mundo')
  smAlert?.warning('Hola mundo', { title: '<h2>Grande</h2> pequeño' })
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
  )
})
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
