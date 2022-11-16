<template>
  <div class="app_container">
    <sm-alert-stack />
    <sm-card>
      <sm-form ref="smFormEl" validation-mode="on-focusout">
        <template #default="{ isValid, validate, reset }">
          <h4>El formulario es: {{ isValid ? 'válido' : 'no válido' }}</h4>
          <sm-radio v-model="radio" label="Nombre A" native-value="A" :rules="rRules" />
          <sm-radio v-model="radio" label="Nombre B" native-value="B" :rules="rRules" />
          <sm-radio v-model="radio" label="Nombre C" native-value="C" :rules="rRules" />
          <sm-checkbox label="test" />
          <sm-datepicker v-model="datepicker" label="Nombre" :rules="sRules" range size="large" />
          <sm-select v-model="select" :options="options" label="Nombre" multiple size="large" />
          <sm-number-input v-model="number" :rules="numberRules" :min="0" :data-prefix="'$'" />
          <sm-button type="primary" @click="validate()">Submit</sm-button>
          <sm-button type="primary" @click="reset">Reset</sm-button>
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
  </div>
</template>

<script setup lang="ts">
import { SmForm } from './index'
import { $SmAlert, ISmAlertProvide } from '../utils/alerts'

const modal = ref(true)
const radio = ref('')
const number = ref(3)
const select = ref([])
const datepicker = ref('')
const options = ref([
  { text: '1', value: '1' },
  { text: '2', value: '2' },
  { text: '3', value: '3' },
])
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

const smAlert = inject<ISmAlertProvide>($SmAlert)
onMounted(() => {
  smFormEl.value?.validateInputs(true)
  smAlert?.success('Hola mundo')
  smAlert?.error('Hola mundo')
  smAlert?.warning('Hola mundo')
  smAlert?.info('Hola mundo', { title: 'Titulo de info', persistent: true })
})
</script>

<style lang="scss" scoped>
.app_container {
  @apply flex flex-col;
  @apply m-5;
  @apply max-w-5xl;
}
</style>
