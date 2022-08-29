import { SmDatepicker } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmInputs',
  component: SmDatepicker,
  argTypes: {
    label: {
      defaultValue: 'Fecha de nacimiento',
      control: { type: 'text' },
    },
    placeholder: {
      defaultValue: 'Seleccione',
      control: { type: 'text' },
    },
    required: {
      defaultValue: true,
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    size: {
      defaultValue: 'small',
      options: ['small', 'medium', 'large'],
      control: {
        type: 'inline-radio',
        labels: {
          small: 'small',
          medium: 'medium',
          large: 'large',
        },
      },
    },
    locale: {
      defaultValue: 'es',
      options: ['es', 'en'],
      control: {
        type: 'inline-radio',
        labels: {
          es: 'Español',
          en: 'Inglés',
        },
      },
    },
    required: {
      defaultValue: true,
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    error: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    errorMessages: {
      control: { type: 'array' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
}

const Template = args => ({
  components: { SmDatepicker },
  setup() {
    return { args }
  },
  data() {
    return { value: '' }
  },
  template: `
    <div style="width:160px; margin:30px auto">
      <sm-datepicker v-model="value" v-bind="args" ></sm-datepicker>
    </div>
  `,
})

const TemplateWithRange = args => ({
  components: { SmDatepicker },
  setup() {
    return { args }
  },
  data() {
    return { value: '' }
  },
  template: `
      <div style="width:160px; margin:30px auto">
        <sm-datepicker v-model="value" v-bind="args" :range="true">
          <template #sidebar>
            <ul>
              <li><strong>Usando Sidebar</strong></li>
              <li>Hoy</li>
              <li>Ayer</li>
              <li>Este mes</li>
            </ul>
          </template>
          <template #footer>
            <button>Footer action</button>
          </template>
        </sm-datepicker>
      </div>
    `,
})

export const Datepicker = Template.bind({})
export const DatepickerWithRange = TemplateWithRange.bind({})
