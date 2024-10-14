<docs lang="md">
## SStats

Este componente permite mostrar estadísticas de manera visual y atractiva.

### Props

- `items`: Array de opciones (objetos) que se mostrarán en el dropdown.
  - <strong>Estructura de los objetos:</strong>
    - `label`: Texto label que se mostrará en la parte superior del stat.
    - `value`: Texto value que se mostrará en el centro del stat.
    - `icon`: Icono que se mostrará en el dropdown.
    - `trend`: Indica la tendencia de la opción.
    - `trendText`: Texto que acompaña a `trend`.
    - `supportive`: Texto supportive que se posiciona en el footer. Tiene más prioridad que `trend`.
    - `supportiveIcon`: Icono que acompaña a `supportive`.
    - `help`: Texto que se mostrará en el tooltip.
    - `key`: Este valor se tomará como key.
      Ejemplo:
    ```js
    {
      key: '1',
      icon: 'home',
      label: 'Stat',
      value: 'Valor',
      icon: 'home',
      supportive: 'supportiveText',
      supportiveIcon: 'email',
      help: 'helper text',
    },
    ```
- `countsIcon`: Íconos que se mostraran en las intersecciones de los stats <strong>Ejemplo:</strong>
  ```js
  options: [
  {
      key: '1',
      icon: 'home',
      trend: 1,
      label: 'Stat',
      value: 'Valor',
      icon: 'home',
      trend: 'test',
      trendText: 'TrendText',
      supportive: 'supportiveText',
      supportiveIcon: 'email',
      help: 'helper text',
    },
    {
      key: '2',
      icon: 'home',
      trend: 2,
      label: 'Stat 2',
      value: 'Valor',
      icon: 'home',
      supportive: 'supportiveText',
      supportiveIcon: 'email',
    },
  ],
  countsIcon: ['code'],
  /*En este caso solo se asignará un countIcon, el cual
  estará entre el stat 1 y el 2*/
  ```

### Slots

- `count-icon-{index}`: Permite acceder al countIcon en base a la posición del stat.
- `supportive-{key | position}`: Permite editar el supportive stat.
</docs>

<template>
  <Story title="s-stats" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-stats v-bind="initState">
          <template #count-icon-2> = </template>
        </s-stats>
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
import { reactive } from 'vue';
import { icons } from '../config/utils/IconOptions';

const initState = reactive({
  items: [
    {
      key: '1',
      icon: icons[0],
      trend: 1,
      label: 'Stat',
      value: 'Valor',
      icon: 'home',
      trend: 'test',
      trendText: 'TrendText',
      supportive: 'supportiveText',
      supportiveIcon: 'email',
      help: 'helper text',
    },
    {
      key: '2',
      icon: icons[0],
      trend: 2,
      label: 'Stat',
      value: 'Valor',
      icon: 'home',
      supportive: 'supportiveText',
      supportiveIcon: 'email',
    },
    {
      key: '3',
      icon: icons[0],
      trend: -1,
      help: 'Ayuda',
      label: 'Stat',
      value: 'Valor',
      icon: 'home',
      trendText: 'TrendText',
    },
  ],
  countsIcon: ['plus'],
});

const controls = [
  {
    key: 'items',
    input: 'Json',
    props: {},
  },
  {
    key: 'countsIcon',
    input: 'Json',
    props: {},
  },
];
</script>
