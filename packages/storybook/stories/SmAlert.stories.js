import { SmAlertStack, useSmAlert } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmAlert',
  component: SmAlertStack,
  argTypes: {},
}

const Template = arg => ({
  components: { SmAlertStack },
  setup() {
    /*
    const smAlert = inject($SmAlert)
    */
    const smAlert = useSmAlert()
    smAlert.success('Success')
    smAlert.error('Error')
    smAlert.warning('Warning')
    setTimeout(() => {
      smAlert.info('Info')
    }, 1000)
    return { arg }
  },
  template: `<sm-alert-stack />`,
})

export const Alert = Template.bind({})
