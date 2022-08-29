// import "@smile-ui/vue/styles"
import "@alegradev/smile-ui-next/styles"
// import { install as SmileUiNext } from '@alegradev/smile-ui-next'

// import { app } from '@storybook/vue3'

// app.use(SmileUiNext)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
