import { SmNameAvatar } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmNameAvatar',
  component: SmNameAvatar,
  argTypes: {
    name: {
      defaultValue: 'Test',
      control: { type: 'text' },
    },
  },
}

const Template = args => ({
  components: { SmNameAvatar },
  setup() {
    return { args }
  },
  template: `<sm-name-avatar v-bind="args" />`,
})

export const Pagination = Template.bind({})
