import { SmErrorList } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmErrorList',
  component: SmErrorList,
  argTypes: {
    errorMessages: {
      control: { type: 'array' },
    },
  },
}

const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SmErrorList },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<sm-error-list v-bind="args" />',
})

export const ErrorList = Template.bind({})
ErrorList.args = {
  errorMessages: ['Lorem ipsum dolor', 'Phasellus id dolor non', 'Phasellus at ex vitae massa'],
}
