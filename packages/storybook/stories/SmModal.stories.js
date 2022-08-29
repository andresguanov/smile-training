import { SmModal, SmButton } from '@alegradev/smile-ui-next'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Smile UI/SmModal',
  component: SmModal,
  argTypes: {
    'v-model': {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
}

const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SmModal, SmButton },
  // The story"s `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: `
    <sm-modal v-model="args['v-model']">
      <template v-slot:header>Header</template>
      <template v-slot:body>Body</template>
      <template v-slot:footer>
        <sm-button>Cancelar</sm-button>
        <sm-button type="primary">Aceptar</sm-button>
      </template>
    </sm-modal>
  `,
})

export const Modal = Template.bind({})
