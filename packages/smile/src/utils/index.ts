import { App, Component } from 'vue';
import * as components from '../components';
import { smAlertProvide } from '../interfaces/sm-alert.interface';
import { $SmAlert, useSmAlert } from './alerts';

export * from './resolvers';
export * from './theme';
export * from './alerts';

export function install(app: App): App {
  Object.keys(components).forEach(comp => {
    app.component(comp, { ...(components as unknown as Record<string, Component>) }[comp]);
  });
  app.provide<smAlertProvide>($SmAlert, useSmAlert());
  return app;
}
