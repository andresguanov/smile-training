<docs lang="md">
## SWizard

Este componente permite mostrar un wizard con pasos y un menú de usuario.

### Props

- `steps`: Pasos del wizard.
  - <strong>Estructura de los objetos:</strong>
    - `title`: Título del paso.
    - `description`: Descripción del paso.
    - `label`: Label que se mostrará en el stepper.
    - `components`: Componentes que se mostrarán en el paso.
- `menu`: User menu <strong>Ejemplo:</strong>
  ```ts
  interface sUserMenu {
    userName: string;
    userId: string;
    onlyAvatar?: boolean;
    hasLogout?: boolean;
    showElectronicInvoicingStatus?: boolean;
    electronicInvoicingText?: {
      label: string;
      active: string;
    };
    items: {
      id: string;
      text: string;
      icon: IconType;
      external?: boolean;
    }[];
  }
  /*En este caso estamos tomando la key `code`
  como value de cada option*/
  ```

### Slots

- `leading`: Permite agregar un icono o texto al inicio del dropdown.
- `label-icon`: Permite agregar un ícono en el label.
- `supportive-icon`: Permite agregar un ícono en el supportive.
- `beforeOptions`: Permite agregar un contenido antes de las opciones.
- `afterOptions`: Permite agregar un contenido después de las opciones.
- `append-item`: Permite agregar un contenido al inicio de las opciones.
- `item`: Permite customizar el elemento de cada option, recibe valores como el `índice` y la `option`.
- `prepend-item`: Permite agregar un contenido al final de las opciones.
</docs>

<template>
  <Story title="s-wizard" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-wizard
          v-model="initState['v-model']"
          v-bind="initState"
          @clickMenu="() => logEvent('ClickMenu')"
          @close="() => logEvent('Close')"
          @menu:avatarClick="() => logEvent('AvatarClick')"
          @menu:logout="() => logEvent('Logout')"
          @menu:optionClick="$event => logEvent('OptionClick', $event)"
        ></s-wizard>
      </template>
      <template #controls>
        <template v-for="control in controls">
          <component
            v-model="initState[control.key]"
            :is="`Hst${control.input}`"
            :title="control.key"
            v-bind="control.props"
          />
        </template>
      </template>
    </Variant>
  </Story>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { icons } from '../config/utils/IconOptions';
import { logEvent } from 'histoire/client';

/**
 * Puede usar la función render de Vue 3:
 * @link https://vuejs.org/guide/extras/render-function.html#creating-vnodes
 *
 * o directamente importando el componente que desea usar:
 * `import step1 from "components/step1"`
 */
const step1 = h('div', [h('p', 'Formulario 1'), h('input', { placeholder: 'User' })]);
const step2 = h('div', [h('p', 'Formulario 2'), h('input', { placeholder: 'Email' })]);
const step3 = h('div', [
  h('p', 'Formulario 2'),
  h('input', { placeholder: 'Fecha', type: 'date' }),
]);

const initState = reactive({
  'v-model': 0,
  backText: 'Atrás',
  continueText: 'Continuar',
  steps: [
    {
      title: 'STEP 1',
      description: 'Descripción del step 1',
      label: 'user',
      components: [step1],
    },
    {
      title: 'STEP 2',
      description: 'Descripción del step 2',
      label: 'email',
      components: [step2],
    },
    {
      title: 'STEP 3',
      description: 'Descripción del step 3',
      label: 'date',
      components: [step3],
    },
  ],
  menu: {
    userName: 'Alegra',
    userId: '123',
    onlyAvatar: false,
    hasLogout: true,
    showElectronicInvoicingStatus: true,
    electronicInvoicingText: {
      label: 'Factura como pro',
      active: 'Activo',
    },
    items: [
      {
        id: 'item-1',
        text: 'Mi perfil',
        icon: icons[12],
      },
      {
        id: 'item-2',
        text: 'Ayuda',
        icon: icons[5],
        external: true,
      },
    ],
  },
});

const controls = [
  {
    key: 'v-model',
    input: 'Number',
    props: {},
  },
  {
    key: 'hasBackButton',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'disabledBack',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'disabledNext',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'backText',
    input: 'Text',
    props: {},
  },
  {
    key: 'continueText',
    input: 'Text',
    props: {},
  },
  {
    key: 'isOnComponent',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'menu',
    input: 'Json',
    props: {},
  },
];
</script>
