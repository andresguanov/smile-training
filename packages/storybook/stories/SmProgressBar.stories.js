import { SmProgressBar } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmProgress',
  component: SmProgressBar,
  argTypes: {
    max: {
      defaultValue: 100,
      control: { type: 'number' },
    },
    value: {
      defaultValue: 50,
      control: { type: 'number' },
    },
  },
}

const Template = args => ({
  components: { SmProgressBar },
  setup() {
    return { args }
  },
  template: `<div>
    <sm-progress-bar v-bind="args" />
    <p style="margin-top: 20px">Indeterminado</p>
    <sm-progress-bar />
  </div>
  `,
})

export const ProgressBar = Template.bind({})
