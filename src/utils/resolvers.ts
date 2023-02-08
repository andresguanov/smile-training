import { ComponentResolver, ComponentResolveResult } from 'unplugin-vue-components'

export function SmComponentsResolver(): ComponentResolver {
    return {
      type: 'component',
      resolve: (name: string): ComponentResolveResult => {
        if (/^Sm[A-Z]/.test(name))
            return { name, from: '@smile-ui/vue' }
      },
    }
}

export function SmDirectiveResolver(): ComponentResolver {
  return {
    type: 'directive',
    resolve: (name: string): ComponentResolveResult => {
      if (/^Sm[A-Z]/.test(name))
          return { name, from: '@smile-ui/vue' }
    },
  }
}
