import { SmToggle } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmInputs',
  component: SmToggle,
  argTypes: {
    'v-model': {
      options: [true, false],
      control: { type: 'select' },
    },
    label: {
      defaultValue: 'Nombre',
      control: { type: 'text' },
    },
    size: {
      defaultValue: 'small',
      options: ['medium', 'small', 'large'],
      control: {
        type: 'inline-radio',
        labels: {
          medium: 'medium',
          small: 'small',
          large: 'large',
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
    labelToLeft: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
}

const Template = args => ({
  components: { SmToggle },
  setup() {
    return { args }
  },
  template: `
    <div style="width:200px; margin:30px auto">
      <sm-toggle v-model="args['v-model']" v-bind="args" > </sm-toggle>
    </div>
  `,
})

export const Toggle = Template.bind({})
Toggle.args = {
  errorMessages: ['Lorem ipsum dolor'],
}