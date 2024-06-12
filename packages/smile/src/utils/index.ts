import type { smAlertProvide } from '../interfaces/sm-alert.interface';
import { App, Component } from 'vue';
import { $SmAlert, useSmAlert } from './alerts';
import * as components from '../components';

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
