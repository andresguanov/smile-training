<template>
  <Story title="s-wizard" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-wizard
          v-model="initState['v-model']"
          v-bind="initState"
          @clickMenu="() => console.log('ClickMenu')"
          @close="() => console.log('Close')"
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
