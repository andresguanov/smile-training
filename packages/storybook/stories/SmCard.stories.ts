import { SmCard } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmCard',
  component: SmCard,
  argTypes: {
    elevation: {
      options: ['0', '1', '2', '3', '4'],
      control: { type: 'inline-radio' },
    },
  },
}

const Template = (args: any) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SmCard },
  // The story"s `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: `
  <sm-card v-bind="args" >
    <template v-slot:header> Lorem Ipsum </template>
    Praesent eget lobortis tortor, quis auctor justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras a ipsum luctus, maximus turpis ac, faucibus tellus. Sed dapibus efficitur turpis, a condimentum ex facilisis id. Nulla euismod neque a nibh feugiat ultrices. Donec tincidunt nunc sed odio ullamcorper vulputate. Donec auctor lacinia felis, placerat volutpat metus mollis nec. In vitae diam feugiat, vestibulum nibh quis, pretium dolor.
    <template v-slot:footer> Pellentesque vel dapibus elit. </template>
  </sm-card>
  `,
})

export const Card: any = Template.bind({})
