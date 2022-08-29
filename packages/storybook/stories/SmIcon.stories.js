import { SmIcon } from '@alegradev/smile-ui-next'
import { icons } from '../options/IconOptions'

export default {
  title: 'Smile UI/SmIcon',
  component: SmIcon,
  argTypes: {
    icon: {
      options: icons,
      control: { type: 'select' },
    },
    size: {
      options: ['none', 'small', 'large', 'huge'],
      control: { type: 'inline-radio' },
    },
    type: {
      options: ['none', 'primary', 'secondary'],
      control: { type: 'inline-radio' },
    },
  },
}

const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SmIcon },
  // The story"s `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: `<sm-icon v-bind="args" />`,
})

export const Icon = Template.bind({})
