<template>
  <div class="app_container">
    <sm-alert-stack />
    <sm-card>
      <sm-form validation-mode="on-type">
        <h4>On Submit</h4>
        <sm-radio v-model="radio" label="Nombre A" native-value="A" :rules="rRules" />
        <sm-radio v-model="radio" label="Nombre B" native-value="B" :rules="rRules" />
        <sm-radio v-model="radio" label="Nombre C" native-value="C" :rules="rRules" />
        <sm-checkbox label="test" />
        <sm-datepicker v-model="datepicker" label="Nombre" :rules="sRules" range size="large" />
        <sm-select v-model="select" :options="options" label="Nombre" multiple size="large" />
        <sm-number-input
          v-model="number"
          :rules="numberRules"
          :max="3"
          :min="0"
          :data-sufix="'%'"
          :data-prefix="'$'"
        />
        <template #footer="{ isValid }">
          <sm-button type="primary" native-type="submit" :disabled="!isValid">Submit</sm-button>
        </template>
      </sm-form>
    </sm-card>
    <sm-table :rows="data" :column-config="config" :filter-config="filter">
      <template #actionsCol> Acciones </template>
    </sm-table>
    <sm-modal v-model="modal">
      <template v-slot:header>Header</template>
      <template v-slot:body>Body</template>
      <template v-slot:footer>
        <sm-button>Cancelar</sm-button>
        <sm-button type="primary">Aceptar</sm-button>
      </template>
    </sm-modal>
    <sm-tabs>
      <sm-tab-selectors>
        <sm-tab-selector target="1">
          <sm-icon color="red" hover-color="blue" /> Tab 1
        </sm-tab-selector>
        <sm-tab-selector target="2"> Tab 2 </sm-tab-selector>
        <sm-tab-selector target="3"> Tab 3 </sm-tab-selector>
      </sm-tab-selectors>
      <sm-tab-content name="1" style="width: 200px; height: 200px"> Tab Content 1 </sm-tab-content>
      <sm-tab-content name="2" style="width: 200px; height: 200px"> Tab Content 2 </sm-tab-content>
      <sm-tab-content name="3" style="width: 200px; height: 200px"> Tab Content 2 </sm-tab-content>
    </sm-tabs>
  </div>
</template>

<script setup lang="ts">
import { columnConfigProps, filterConfigProps } from '../interfaces'
import { $SmAlert, ISmAlertProvide } from '../utils/alerts'

const modal = ref(true)
const radio = ref('')
const number = ref(2)
const select = ref([])
const datepicker = ref('')
const options = ref([
  { text: '1', value: '1' },
  { text: '2', value: '2' },
  { text: '3', value: '3' },
])
const sRules = ref([
  (v: any) => {
    return !!v || 'Nombre es requerido'
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

const filter = ref<{ [key: string]: filterConfigProps }>({
  age: {
    type: 'input',
    attrs: {
      placeholder: 'Escribe edad a filtrar',
    },
  },
  name: {
    type: 'checkbox',
  },
  skills: {
    type: 'datepicker',
    attrs: {
      range: true,
    },
  },
  id: {
    type: 'select',
    options: [
      { text: '1', value: '1' },
      { text: '2', value: '2' },
      { text: '3', value: '3' },
    ],
  },
})
const config = ref<columnConfigProps[]>([
  {
    name: 'age',
    label: 'edad',
    format: (s: string) => s.toUpperCase(),
    width: '70px',
    order: true,
    filterable: true,
  },
  {
    name: 'skills',
    bodyAlign: 'right',
    headerAlign: 'right',
    label: 'Aptitudes',
    width: '270px',
    bodyClass: 'PRUEBA',
    filterable: true,
  },
  {
    name: 'name',
    label: 'nombre:',
    firstToUpper: true,
    headerAlign: 'center',
    filterable: true,
    order: true,
  },
  { name: 'id', filterable: true, firstToUpper: true, order: false, headerClass: 'TEST' },
])
const data = ref([
  { id: 1, name: 'Nacho', age: 33, skills: ['Vue', 'Php'] },
  { id: 2, name: 'Lian', age: 25, skills: ['Vue', 'React'] },
  { id: 3, name: 'Seba', age: 60, skills: ['Node'] },
  { id: 4, name: 'Martin', age: 54, skills: ['Php'] },
  { id: 5, name: 'Carlos', age: 18, skills: ['Python'] },
  { id: 6, name: 'Ariana', age: 23, skills: ['Javascript'] },
  { id: 7, name: 'Juan', age: 46, skills: ['Php'] },
  { id: 8, name: 'Pedro', age: 55, skills: ['Python'] },
  { id: 9, name: 'Diana', age: 66, skills: ['Javascript'] },
  { id: 10, name: 'Zeta', age: 21, skills: ['Php'] },
  { id: 11, name: 'Guillermo', age: 19, skills: ['Python'] },
  { id: 12, name: 'Edgardo', age: 57, skills: ['Javascript'] },
  { id: 13, name: 'Nacho', age: 33, skills: ['Vue', 'Php'] },
  { id: 14, name: 'Lian', age: 25, skills: ['Vue', 'React'] },
  { id: 15, name: 'Seba', age: 60, skills: ['Node'] },
  { id: 16, name: 'Martin', age: 54, skills: ['Php'] },
  { id: 17, name: 'Carlos', age: 18, skills: ['Python'] },
  { id: 18, name: 'Ariana', age: 23, skills: ['Javascript'] },
  { id: 19, name: 'Juan', age: 46, skills: ['Php'] },
  { id: 20, name: 'Pedro', age: 55, skills: ['Python'] },
  { id: 21, name: 'Diana', age: 66, skills: ['Javascript'] },
  { id: 22, name: 'Zeta', age: 21, skills: ['Php'] },
  { id: 23, name: 'Guillermo', age: 19, skills: ['Python'] },
  { id: 24, name: 'Edgardo', age: 57, skills: ['Javascript'] },
])
const smAlert = inject<ISmAlertProvide>($SmAlert)
onMounted(() => {
  smAlert?.success('Hola mundo')
  smAlert?.error('Hola mundo')
  smAlert?.warning('Hola mundo')
  smAlert?.info('Hola mundo', { title: 'Titulo de info', persistent: true })
})
</script>

<style>
.app_container {
  display: flex;
  flex-direction: column;
  margin: 20px;
}
</style>
