<docs lang="md">
  ## SModal
  
  Este componente permite mostrar un modal con un contenido personalizado, además de permitir
  personalizar el header, footer y otros aspectos del modal.
  
  ### Props
  
  - `modelValue`: Controla la visibilidad del modal.
  - `cancelText`: El texto del botón de cancelación.
  - `showCloseIcon`: Determina si se muestra el icono de cerrar.
  - `successText`: El texto del botón de éxito.
  - `headerText`: El texto del encabezado del modal.
  - `srcImage`: URL de la imagen a mostrar en el modal.
  - `altImage`: Texto alternativo para la imagen.
  - `contentText`: El texto del contenido del modal.
</docs>

<template>
  <Story title="SNewComponent" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <SNewComponent
          v-bind="initState"
          @close="logEvent('close')"
          @success="logEvent('success')"
          @clickOutside="logEvent('clickOutside')"
          @back="logEvent('back')"
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
import { reactive } from 'vue';

const initState = reactive({
  modelValue: true,
  headerText: '[Modal Title]',
  cancelText: 'Cancelar',
  successText: 'Guardar',
  contentText: 'Contenido del Modal',
  srcImage: 'https://via.placeholder.com/500x250.jpg',
  altImage: 'Imagen de ejemplo',
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
    key: 'srcImage',
    input: 'Text',
    props: {},
  },
  {
    key: 'altImage',
    input: 'Text',
    props: {},
  },
  {
    key: 'contentText',
    input: 'Text',
    props: {},
  },
];

</script>
