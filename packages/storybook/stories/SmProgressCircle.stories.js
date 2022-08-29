import { SmProgressCircle } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmProgress',
  component: SmProgressCircle,
  argTypes: {
    max: {
      defaultValue: '100',
      control: { type: 'number' },
    },
    value: {
      defaultValue: '0',
      control: { type: 'number' },
    },
    showPercentage: {
      defaultValue: true,
      options: [true, false],
      control: { type: 'inline-radio' },
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
  },
}

const Template = args => ({
  components: { SmProgressCircle },
  setup() {
    return { args }
  },
  template: `<sm-progress-circle v-bind="args" />`,
})

export const ProgressCircle = Template.bind({})
