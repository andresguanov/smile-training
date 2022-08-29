import { SmInnerLoading } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmProgress',
  component: SmInnerLoading,
  argTypes: {
    loadingText: {
      control: { type: 'text' },
    },
  },
}

const Template = args => ({
  components: { SmInnerLoading },
  setup() {
    return { args }
  },
  template: `<div style="width: 400px; height: 200px; position: relative; background: black;">
    <sm-inner-loading v-bind="args" />
  </div>`,
})

export const InnerLoading = Template.bind({})
