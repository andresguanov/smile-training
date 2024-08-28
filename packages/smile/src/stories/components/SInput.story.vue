<docs lang="md">
## SInput

Este componente permite la captura de texto, con la posibilidad de agregar un icono al inicio y al final del input.
Además se pueden agregar sugerencias y máscaras de texto.

### Tipos de validación

Estas validaciones se dan en base a las propiedades establecidas en el component padre
SForm, por lo que es necesario que el componente padre tenga la propiedad `containerIsForm`

Para ello se debe agregar la prop `rules` la cual recibe un array de callback con las validaciones.

### Slots

- leading: Permite agregar un icono o texto al inicio del input.
- trailing: Permite agregar un icono o texto al final del input.
- label-icon: Permite agregar un icono al label.
- supportive-icon: Permite agregar un icono al texto de soporte.

### Metodos expuestos

2. <strong>Mediante Ref</strong>

- unmaskedValue: Retorna el valor sin la máscara.
</docs>

<template>
  <Story title="s-input" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-input v-model="value" v-bind="initState"></s-input>
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

const value = ref('');
const initState = reactive({
  label: 'Label',
  size: 'medium',
  optionalText: 'Opcional',
  trailing: {
    inline: true,
    actionable: true,
    label: 'Trailing',
  },
  leading: {
    trailingIcon: icons[3],
  },
  suggestion: {
    value: 'Suggestion',
    text: 'Suggestion',
    description: 'Description',
  },
  mask: {
    mask: '',
    // eager: true,
    // reversed: true,
    // number: {
    //   locale: 'pt-BR',
    //   fraction: 2,
    //   unsigned: true,
    // },
  },
});

const controls = [
  {
    key: 'size',
    input: 'Select',
    props: { options: ['small', 'medium', 'large'] },
  },
  {
    key: 'iconLeft',
    input: 'Select',
    props: { options: icons },
  },
  {
    key: 'iconLeft',
    input: 'Select',
    props: { options: icons },
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
    key: 'readonly',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'required',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'id',
    input: 'Text',
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
    key: 'label',
    input: 'Text',
    props: {},
  },
  {
    key: 'labelIcon',
    input: 'Select',
    props: { options: icons },
  },
  {
    key: 'nativeType',
    input: 'Select',
    props: {
      options: [
        'text',
        'password',
        'date',
        'month',
        'email',
        'search',
        'time',
        'url',
        'color',
        'week',
      ],
    },
  },
  {
    key: 'error',
    input: 'Text',
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
  {
    key: 'supportiveText',
    input: 'Text',
    props: {},
  },
  {
    key: 'supportiveIcon',
    input: 'Select',
    props: { options: icons },
  },
  {
    key: 'hint',
    input: 'Text',
    props: {},
  },
  {
    key: 'leading',
    input: 'Json',
    props: {},
  },
  {
    key: 'trailing',
    input: 'Json',
    props: {},
  },
  {
    key: 'magic',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'autocompleteText',
    input: 'Text',
    props: {},
  },
  {
    key: 'suggestion',
    input: 'Json',
    props: {},
  },
  {
    key: 'mask',
    input: 'Json',
    props: {},
  },
];
</script>
