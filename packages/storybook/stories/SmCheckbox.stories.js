import { SmCheckbox } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmInputs',
  component: SmCheckbox,
  argTypes: {
    'v-model': {
      options: [true, false],
      control: { type: 'select' },
    },
    label: {
      defaultValue: 'Nombre',
      control: { type: 'text' },
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
  // Components used in your story `template` are defined in the `components` object
  components: { SmCheckbox },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: `
    <br/>
    <br/>
    <h1 class="sm-tooltip">Value: {{args['v-model']}}</h1>
    <sm-checkbox v-model="args['v-model']" v-bind="args" ></sm-checkbox>
  `,
})

export const Checkbox = Template.bind({})
Checkbox.args = {
  errorMessages: ['Lorem ipsum dolor'],
}
