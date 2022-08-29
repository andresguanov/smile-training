import { SmInput } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmInputs',
  component: SmInput,
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
  // Components used in your story `template` are defined in the `components` object
  components: { SmInput },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object

    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: `
    <div style="width:160px; margin:30px auto">
      <sm-input v-model="args['v-model']" v-bind="args" > </sm-input>
    </div>
  `,
})

export const Input = Template.bind({})
Input.args = {
  errorMessages: ['Lorem ipsum dolor'],
}