import { SmTextarea } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmInputs',
  component: SmTextarea,
  argTypes: {
    'v-model': {
      control: { type: 'text' },
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
  },
}

const Template = args => ({
  components: { SmTextarea },
  setup() {
    return { args }
  },
  template: `
    <div style="width:200px; margin:30px auto">
      <sm-textarea v-model="args['v-model']" v-bind="args" > </sm-textarea>
    </div>
  `,
})

export const Textarea = Template.bind({})
Textarea.args = {
  errorMessages: ['Lorem ipsum dolor'],
}