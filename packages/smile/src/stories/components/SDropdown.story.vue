<docs lang="md">
## SDropdown

Este componente permite seleccionar una opción de una lista desplegable, en las últimas
versiones se ha mejorado la usabilidad y accesibilidad del componente, además que se integró
Lazy load para un mejor rendimiento ante cargas grandes.

### Tipos de validación

Estas validaciones se dan en base a las propiedades establecidas en el component padre
SForm, por lo que es necesario que el componente padre tenga la propiedad `containerIsForm`

Para ello se debe agregar la prop `rules` la cual recibe un array de callback con las validaciones.

### Slots

- leading: Permite agregar un icono o texto al inicio del dropdown.
- beforeOptions: Permite agregar un contenido antes de las opciones.
- afterOptions: Permite agregar un contenido después de las opciones.
- append-item: Permite agregar un contenido al inicio de las opciones.
- prepend-item: Permite agregar un contenido al final de las opciones.

### Metodos expuestos

1. <strong>A través de Slot</strong>

- index: Permite obtener el índice de la opción seleccionada.
- option: Permite obtener la key de la option.

2. <strong>Mediante Ref</strong>

- toggleOverflow: Permite abrir o cerrar el dropdown, recibe un booleano para abrirlo en modo
  búsqueda.
- itemsRef: Es la cantidad de items cargados como referencia para la carga lazy de las
  opciones.
</docs>

<template>
  <Story title="s-dropdown" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-dropdown
          v-model="initState['v-model']"
          v-bind="initState"
          @search="logEvent('search', $event)"
          @open="logEvent('open')"
          @select="logEvent('select', $event)"
        >
        </s-dropdown>
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
import { ref, reactive } from 'vue';
// import { icons } from '../config/utils/IconOptions';
import { logEvent } from 'histoire/client';

const initState = reactive({
  label: 'Label',
  options: [
    { text: 'Javascript', code: 'js', icon: 'flag-3' },
    { text: 'PHP', code: 'php', icon: 'flag-3' },
    { text: 'Python', code: 'py', icon: 'flag-3' },
    { text: 'C++', code: 'cc', icon: 'flag-3' },
  ],
});

const controls = [
  {
    key: 'v-model',
    input: 'Text',
    props: {},
  },
  {
    key: 'label',
    input: 'Text',
    props: {},
  },
  {
    key: 'id',
    input: 'Text',
    props: {},
  },
  {
    key: 'size',
    input: 'Select',
    props: { options: ['medium', 'small', 'large'] },
  },
  {
    key: 'hint',
    input: 'Text',
    props: {},
  },
  {
    key: 'magic',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'placeholder',
    input: 'Text',
    props: {},
  },
  {
    key: 'disabled',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'success',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'loading',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'loadingText',
    input: 'Text',
    props: {},
  },
  {
    key: 'autocompleteText',
    input: 'Text',
    props: {},
  },
  {
    key: 'maxHeight',
    input: 'Text',
    props: {},
  },
  {
    key: 'options',
    input: 'Json',
    props: {},
  },
  {
    key: 'object',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'textKey',
    input: 'Text',
    props: {},
  },
  {
    key: 'valueKey',
    input: 'Text',
    props: {},
  },
  {
    key: 'multiple',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'canDeselect',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'required',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'markType',
    input: 'Select',
    props: { options: ['required', 'optional'] },
  },
  {
    key: 'optionalText',
    input: 'Text',
    props: {},
  },
];
</script>
