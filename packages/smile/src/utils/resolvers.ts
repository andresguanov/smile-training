import { ComponentResolver } from 'unplugin-vue-components/dist/types';

export function SmComponentsResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      return { importName: name, path: '@smile-ui/vue' };
    },
  };
}

export function SmDirectiveResolver(): ComponentResolver {
  return {
    type: 'directive',
    resolve: (name: string) => {
      return { importName: name, path: '@smile-ui/vue' };
    },
  };
}
