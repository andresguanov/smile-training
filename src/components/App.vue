<template>
  <div class="app_container">
    <sm-alert-stack />
    <sm-table
      :rows="list"
      :hoverable="true"
      :column-config="columnConfig"
      :filter-config="filterConfig"
      :items-per-page="20"
      :text-pagination="textPagination"
      @change="onchangetest"
      @filter="onchangetest"
    >
    </sm-table>
  </div>
</template>

<script setup lang="ts">
import { SmTable } from './index'
import { $SmAlert, ISmAlertProvide } from '../utils/alerts'
import { smTableColumn, smTableFilter } from '~/interfaces'

const columnConfig = ref<smTableColumn[]>([
  {
    name: 'number',
    label: 'remissionListing.columns.number' as string,
    filterable: true,
    order: true,
    width: '100px',
    headerAlign: 'left',
    bodyAlign: 'left',
  },
  {
    name: 'client',
    label: 'remissionListing.columns.client' as string,
    filterable: true,
    order: true,
    width: '400px',
    headerAlign: 'left',
    bodyAlign: 'left',
  },
  {
    name: 'initDate',
    label: 'remissionListing.columns.initDate' as string,
    filterable: true,
    order: true,
    width: '130px',
    headerAlign: 'center',
    bodyAlign: 'center',
  },
  {
    name: 'dueDate',
    label: 'remissionListing.columns.dueDate' as string,
    filterable: true,
    order: true,
    width: '130px',
    headerAlign: 'center',
    bodyAlign: 'center',
  },
  {
    name: 'state',
    label: 'remissionListing.columns.state' as string,
    filterable: true,
    order: true,
    width: '130px',
    headerAlign: 'center',
    bodyAlign: 'center',
  },
  {
    name: 'total',
    label: 'remissionListing.columns.total' as string,
    width: '170px',
    headerAlign: 'left',
    bodyAlign: 'left',
  },
])
const list = ref([
  { number: '1', client: 'cliente', initDate: '', dueDate: '', state: 'open' },
  { number: '2', client: 'cliente', initDate: '', dueDate: '', state: 'open' },
  { number: '3', client: 'cliente', initDate: '', dueDate: '', state: 'open' },
  { number: '4', client: 'cliente', initDate: '', dueDate: '', state: 'open' },
])

const filterConfig = ref<{ [key: string]: smTableFilter }>({
  number: { type: 'input' },
  client: { type: 'input' },
  initDate: { type: 'datepicker' },
  dueDate: { type: 'datepicker' },
  state: {
    type: 'select',
    attrs: {
      multiple: true,
    },
    options: [
      {
        text: 'open',
        value: 'open',
      },
      {
        text: 'closed',
        value: 'closed',
      },
      {
        text: 'void',
        value: 'void',
      },
    ],
  },
})

const textPagination = ref({
  page: 'remissionListing.textPagination.page',
  of: 'remissionListing.textPagination.of',
  showing: 'remissionListing.textPagination.showing',
  resultsPerPage: 'remissionListing.textPagination.resultsPerPage',
})
const onchangetest = (data: any) => {
  console.log({ data })
}

const smAlert = inject<ISmAlertProvide>($SmAlert)
onMounted(() => {
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
