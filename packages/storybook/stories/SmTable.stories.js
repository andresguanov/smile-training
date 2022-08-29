import { SmTable } from '@alegradev/smile-ui-next'
import { dataTable, columnConfigTable, filterConfigTable } from '../options/TableData'

export default {
  title: 'Smile UI/SmTable',
  component: SmTable,
  argTypes: {
    hoverable: {
      defaultValue: true,
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    loading: {
      defaultValue: false,
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    itemsPerPage: {
      defaultValue: 10,
      options: [10, 20, 30],
      control: { type: 'select' },
    },
    loadingText: {
      control: { type: 'text' },
    },
    noContentText: {
      control: { type: 'text' },
    }
  },
}

const Template = args => ({
  components: { SmTable },
  setup() {
    const data = dataTable
    const columnConfig = columnConfigTable
    const filterConfig = filterConfigTable
    return { args, data, columnConfig, filterConfig }
  },
  template: `
    <sm-table
        v-bind="args"
        :rows="data"
        :total="data.length"
        :column-config="columnConfig"
        :filter-config="filterConfig"
    >
        <template #bodyRow.skills="{ row }">
            <span>{{ row.skills.join(', ') }}</span>
        </template>
    </sm-table>
  `,
})
const TemplateWithActions = args => ({
  components: { SmTable },
  setup() {
    const data = dataTable
    const columnConfig = columnConfigTable
    const filterConfig = filterConfigTable
    return { args, data, columnConfig, filterConfig }
  },
  template: `
      <sm-table
          v-bind="args"
          :rows="data"
          :total="data.length"
          :column-config="columnConfig"
          :filter-config="filterConfig"
      >
          <template #actionsCol="{ row }"> Prueba: {{ row.id }} </template>
      </sm-table>
    `,
})
const TemplateEmpty = args => ({
  components: { SmTable },
  setup() {
    const columnConfig = columnConfigTable
    return { args, columnConfig }
  },
  template: `
      <sm-table v-bind="args" :rows="[]" :column-config="columnConfig" />
    `,
})

export const Table = Template.bind({})
export const TableWithActions = TemplateWithActions.bind({})
export const TableEmpty = TemplateEmpty.bind({})
