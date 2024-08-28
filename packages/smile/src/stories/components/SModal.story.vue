<docs lang="md">
## SModal

Este componente permite mostrar un modal con un contenido personalizado, además de permitir
personalizar el header y footer del modal.

### Slots

- `default`: Permite agregar contenido al modal.
- `footer`: Permite agregar customizar el footer.

### Events

- `close`: Se emite cuando se cierra el modal.
- `success`: Se emite cuando se presiona el botón de éxito.
- `back`: Se emite cuando se presiona el botón de regresar.
- `clickOutside`: Se emite cuando se hace click fuera del modal.
</docs>

<template>
  <Story title="s-modal" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-modal
          v-bind="initState"
          @close="logEvent('close')"
          @success="logEvent('success')"
          @clickOutside="logEvent('clickOutside')"
          @back="logEvent('back')"
          >{{ initState['content-slot'] }}</s-modal
        >
      </template>

      <template #controls>
        <component
          v-model="initState[control.key]"
          v-for="control in controls"
          :is="`Hst${control.input}`"
          :title="control.key"
          v-bind="control.props"
        />
      </template>
    </Variant>
  </Story>
</template>

<script setup>
import { logEvent } from 'histoire/client';
import { ref, reactive } from 'vue';
import { icons } from '../config/utils/IconOptions';

const initState = reactive({
  modelValue: true,
  showCloseIcon: true,
  backBtn: false,
  scrollable: false,
  headerText: '[Modal Title]',
  cancelText: 'Cancelar',
  successText: 'Guardar',
  'content-slot': 'Modal Content',
});

const controls = [
  {
    key: 'modelValue',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'headerText',
    input: 'Text',
    props: {},
  },
  {
    key: 'size',
    input: 'Select',
    props: { options: ['small', 'medium', 'large'] },
  },
  {
    key: 'showCloseIcon',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'backBtn',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'cancelText',
    input: 'Text',
    props: {},
  },
  {
    key: 'successText',
    input: 'Text',
    props: {},
  },
  {
    key: 'footer-slot',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'scrollable',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'content-slot',
    input: 'Text',
    props: {},
  },
];
</script>
