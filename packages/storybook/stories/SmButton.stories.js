import { SmButton } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmButton',
  component: SmButton,
  argTypes: {
    size: {
      options: ['none', 'small', 'large'],
      control: { type: 'inline-radio' },
    },
    type: {
      options: ['none', 'primary', 'secondary', 'ghost', 'text'],
      control: { type: 'inline-radio' },
    },
    loading: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
}

const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SmButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<sm-button v-bind="args" >Button rounded</sm-button>',
})

export const Button = Template.bind({})
