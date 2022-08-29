import { SmSkeleton } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmSkeleton',
  component: SmSkeleton,
  argTypes: {
    shape: {
      options: ['circle', 'rectangle'],
      control: { type: 'inline-radio' },
    },
    count: {
      defaultValue: '1',
      control: { type: 'number' },
    },
    width: {
      defaultValue: '',
      control: { type: 'text' },
    },
    height: {
      defaultValue: '',
      control: { type: 'text' },
    },
  },
}

const Template = args => ({
  components: { SmSkeleton },
  setup() {
    return { args }
  },
  template: `<sm-skeleton v-bind="args" />`,
})

export const Skeleton = Template.bind({})
