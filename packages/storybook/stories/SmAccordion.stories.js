import {
  SmAccordion,
  SmAccordionItem,
  SmAccordionItemHeader,
  SmAccordionItemBody,
} from '@alegradev/smile-ui-next'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Smile UI/SmAccordion',
  component: SmAccordion,
}

const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SmAccordion, SmAccordionItem, SmAccordionItemHeader, SmAccordionItemBody },
  // The story"s `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: `
  <sm-accordion v-bind="args" >
    <sm-accordion-item :selected="true">
      <sm-accordion-item-header>
        Lorem ipsum dolor sit amet
      </sm-accordion-item-header>
      <sm-accordion-item-body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec magna vel urna pulvinar vestibulum eleifend ut purus. Curabitur nec mauris venenatis, volutpat eros ac, feugiat purus. In velit orci, hendrerit vitae semper non, tempor ac dolor. Donec vehicula dolor mauris, sed ultrices dolor blandit id. Ut nec molestie ligula. Aliquam eu libero sed est mattis ornare. Phasellus ut tempus nibh, sit amet malesuada nibh.
      </sm-accordion-item-body>
    </sm-accordion-item>
    <sm-accordion-item>
      <sm-accordion-item-header>
        Lorem ipsum dolor sit amet
      </sm-accordion-item-header>
      <sm-accordion-item-body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec magna vel urna pulvinar vestibulum eleifend ut purus. Curabitur nec mauris venenatis, volutpat eros ac, feugiat purus. In velit orci, hendrerit vitae semper non, tempor ac dolor. Donec vehicula dolor mauris, sed ultrices dolor blandit id. Ut nec molestie ligula. Aliquam eu libero sed est mattis ornare. Phasellus ut tempus nibh, sit amet malesuada nibh.
      </sm-accordion-item-body>
    </sm-accordion-item>
    <sm-accordion-item>
      <sm-accordion-item-header>
        Lorem ipsum dolor sit amet
      </sm-accordion-item-header>
      <sm-accordion-item-body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec magna vel urna pulvinar vestibulum eleifend ut purus. Curabitur nec mauris venenatis, volutpat eros ac, feugiat purus. In velit orci, hendrerit vitae semper non, tempor ac dolor. Donec vehicula dolor mauris, sed ultrices dolor blandit id. Ut nec molestie ligula. Aliquam eu libero sed est mattis ornare. Phasellus ut tempus nibh, sit amet malesuada nibh.
      </sm-accordion-item-body>
    </sm-accordion-item>
  </sm-accordion>
  `,
})

export const accordion = Template.bind({})
