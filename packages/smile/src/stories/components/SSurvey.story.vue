<docs lang="md">
## SSurvey

Este componente permite mostrar un modal de encuesta con un contenido personalizado, además de permitir
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
  <Story title="s-survey-modal" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-survey-modal
          v-model="initState['v-model']"
          v-bind="initState"
          @omit="logEvent('omit')"
          @send="logEvent('send', $event)"
        />
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
import { reactive } from 'vue';

const initState = reactive({
  'v-model': true,
  title: 'Título',
  subtitle: 'Subtítulo',
  sendText: 'Enviar',
  omitText: 'Omitir',
});

const controls = [
  {
    key: 'v-model',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'title',
    input: 'Text',
    props: {},
  },
  {
    key: 'subtitle',
    input: 'Text',
    props: {},
  },
  {
    key: 'sendText',
    input: 'Text',
    props: {},
  },
  {
    key: 'omitText',
    input: 'Text',
    props: {},
  },
];
</script>
