import { SmPagination } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmPagination',
  component: SmPagination,
  argTypes: {
    page: {
      defaultValue: '1',
      control: { type: 'number' },
    },
    total: {
      defaultValue: '1',
      control: { type: 'number' },
    },
    refresh: {
      defaultValue: true,
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
}

const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SmPagination },
  // The story"s `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: `<sm-pagination v-bind="args" />`,
})

export const Pagination = Template.bind({})
