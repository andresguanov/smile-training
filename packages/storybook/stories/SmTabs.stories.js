import { SmTabs, SmTabSelectors, SmTabSelector, SmTabContent } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmTabs',
  component: SmTabs,
  argTypes: {
    shape: {
      options: ['circle', 'rectangle'],
      control: { type: 'inline-radio' },
    },
    count: {
      defaultValue: '',
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
  components: { SmTabs, SmTabSelectors, SmTabSelector, SmTabContent },
  setup() {
    return { args }
  },
  template: `
    <sm-tabs>
        <sm-tab-selectors>
            <sm-tab-selector target="1"> Tab 1 </sm-tab-selector>
            <sm-tab-selector target="2"> Tab 2 </sm-tab-selector>
            <sm-tab-selector target="3"> Tab 3 </sm-tab-selector>
        </sm-tab-selectors>
        <sm-tab-content name="1" style="width: 200px; height: 200px">
            Tab Content 1
        </sm-tab-content>
        <sm-tab-content name="2" style="width: 200px; height: 200px">
            Tab Content 2
        </sm-tab-content>
        <sm-tab-content name="3" style="width: 200px; height: 200px">
            Tab Content 2
        </sm-tab-content>
    </sm-tabs>
    `,
})

export const Pagination = Template.bind({})
