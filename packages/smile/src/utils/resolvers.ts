import { ComponentResolver, ComponentResolveResult } from 'unplugin-vue-components';

export function SmComponentsResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string): ComponentResolveResult => {
      // return { name: name, from: '@smile-ui/vue' };
      return { name: name, from: '@alegradev/smile-ui-next' };
    },
  };
}

export function SmDirectiveResolver(): ComponentResolver {
  return {
    type: 'directive',
    resolve: (name: string): ComponentResolveResult => {
      return { name: name, from: '@alegradev/smile-ui-next' };
    },
  };
}
