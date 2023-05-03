<template>
  <div class="app_container">
    <sm-alert-stack />
    <div class="m-3">
      <s-stepper
        :steps="['nombre', 'ciudad', 'test', 'label']"
        current-step-has-error
        v-model="step"
        @click-step="step = $event"
      />
    </div>

    <s-breadcrumb label="Hola mundo" active></s-breadcrumb>

    <s-tabs filled>
      <template #selectors>
        <s-tab-label target="1" selected> Label </s-tab-label>
        <s-tab-label target="2"> Label </s-tab-label>
        <s-tab-label target="3"> Label </s-tab-label>
      </template>
      <s-tab-content name="1" style="width: 200px; height: 200px"> Tab Content 1 </s-tab-content>
      <s-tab-content name="2" style="width: 200px; height: 200px"> Tab Content 2 </s-tab-content>
      <s-tab-content name="3" style="width: 200px; height: 200px"> Tab Content 3 </s-tab-content>
    </s-tabs>

    <s-page-heading title="[Heading Title]" description="Description......">
      <template #actions>
        <s-button>Label</s-button>
        <s-button>Label</s-button>
        <s-button>Label</s-button>
      </template>
    </s-page-heading>

    <s-modal v-model="modal" header-text="Modal Title">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, adipisci velit ab aliquam
      veniam odit vitae non ipsam dolorem quaerat, totam quia ut vel error ducimus eveniet
      accusantium enim quam!
    </s-modal>

    <s-empty-state />
    <sm-card class="mt-1">
      <sm-form ref="smFormEl" validation-mode="on-focusout">
        <template #default="{ validate, reset }">
          <s-input
            v-model="text"
            icon-right="view-eye"
            :rules="sRules"
            :leading="{ label: 'Leading', icon: 'accounting', actionable: true }"
          />
          <s-input
            v-model="text"
            icon-left="search"
            :rules="sRules"
            :trailing="{ icon: 'close', actionable: true, inline: true }"
          />
          <s-dropdown v-model="text" />
          <s-number-input v-model="number" icon-left="accounting" />
          <sm-button type="primary" @click="validate()">Submit</sm-button>
          <sm-button type="primary" @click="reset">Reset</sm-button>
        </template>
      </sm-form>
    </sm-card>
    <sm-card>
      <sm-form ref="smFormEl" validation-mode="on-type" container-is-form @submit="onSubmit">
        <template #default="{ isValid, reset }">
          <h4>El formulario es: {{ isValid ? 'válido' : 'no válido' }}</h4>
          <div class="flex flex-col">
            <s-radio
              v-model="radio"
              label="test"
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
                  return val.length > 0 || 'Debe escoger al menos una opción'
                },
              ]"
            />
          </div>
          <sm-button type="primary" native-type="submit">Submit</sm-button>
          <sm-button type="primary" @click="reset">Reset</sm-button>
        </template>
      </sm-form>
    </sm-card>
    <!-- <sm-modal v-model="modal">
      <template v-slot:header>Header</template>
      <template v-slot:body>
        <div class="w-[500px]">
          <s-tooltip placement="bottom-end">
            <template #content>
              <p>Nuevo tooltip</p>
            </template>
            <p>Nuevo tooltip</p>
          </s-tooltip>
        </div>
      </template>
      <template v-slot:footer>
        <s-button size="small" label="hola" loading></s-button>
      </template>
    </sm-modal> -->
    <sm-table
      ref="testSmTable"
      :filter-config="{
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
      <template #head.a>
        <input v-model="selectAll" type="checkbox" name="test" id="test" />
      </template>
      <template #bodyRow.a="{ row }">
        <input v-model="selected" :value="row.a" type="checkbox" name="test" id="test" />
      </template>
      <template #actionsCol>
        <sm-select v-model="select" :options="options" />
      </template>
    </sm-table>
  </div>
</template>

<script setup lang="ts">
import { SmForm, SmTable } from './index'
import { $SmAlert, ISmAlertProvide } from '../utils/alerts'
import { smTableChangeEvent, smTableColumn } from '~/interfaces'

interface radioTest {
  card: string
}
const selectAll = ref(false)
const selected = ref([])
const step = ref(1)
const modal = ref(true)
const check = ref([])
const radio = ref('')
const number = ref(3)
const text = ref('')
const select = ref([])
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
  (v: string) => {
    return !!v || 'El valor es requerido'
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
