import { SmRadio } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmInputs',
  component: SmRadio,
  argTypes: {
    'v-model': {
      control: { type: 'text' },
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
  components: { SmRadio },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: `
    <br/>
    <br/>
    <sm-radio v-model="args['v-model']" v-bind="args" native-value="A" size="small"></sm-radio>
    <sm-radio v-model="args['v-model']" v-bind="args" native-value="B"></sm-radio>
    <sm-radio v-model="args['v-model']" v-bind="args" native-value="C" size="large"></sm-radio>
  `,
})

export const Radio = Template.bind({})
Radio.args = {
  errorMessages: ['Lorem ipsum dolor'],
}
