import { SmSelect } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmInputs',
  component: SmSelect,
  argTypes: {
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
    multiple: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
}

const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SmSelect },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    args.options = [
      { text: '1', value: '1' },
      { text: '2', value: '2' },
      { text: '3', value: '3' },
    ]
    return { args }
  },
  data() {
    return {
      value: '',
    }
  },
  // Then, the spread values can be accessed directly in the template
  template: `
    <div style="width:160px; margin:30px auto">
      <sm-select v-model="value" v-bind="args"></sm-select>
    </div>
  `,
})

export const Select = Template.bind({})
Select.args = {
  errorMessages: ['Lorem ipsum dolor'],
}
