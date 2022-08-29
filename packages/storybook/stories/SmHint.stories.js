import { SmHint } from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmHint',
  component: SmHint,
  argTypes: {
    comment: {
      control: { type: 'text' },
    },
    allowHTML: {
      defaultValue: true,
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    placement: {
      defaultValue: 'top',
      options: ['top', 'right', 'bottom', 'left'],
      control: {
        type: 'inline-radio',
      },
    },
  },
}

const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SmHint },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: `
    <div style="width:160px; margin:30px auto">
      <sm-hint v-bind="args">
        <h1>Paragraph with tooltip</h1>
      </sm-hint>
    </div>
    <div style="width:160px; margin:60px auto 30px">
      <sm-hint v-bind="args">
        <h1>Paragraph with tooltip</h1>
        <template #content>
          <p>
            Usando slot content, El slot NO TIENE PRIORIDAD sobre la prop comment!
          </p>
        </template>
      </sm-hint>
    </div>
  `,
})

export const Hint = Template.bind({})
