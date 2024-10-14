<docs lang="md">
## STabs

El componente `s-tabs` permite mostrar contenido en pestañas.

### Props

- `selected`: Define la pestaña seleccionada por defecto.
- `filled`: Define si el tab tiene un fondo de color.

### Slots

- `selectors`: Permite agregar un icono o texto al inicio del dropdown.
- `default`: Contenido de las tabs. Se debe utilizar conjuntamente con el componente `s-tab-content`.
- <strong>Ejemplo:</strong>
  ```html
  <s-tabs :selected="initState['selected']">
    <template #selectors>
      <s-tab-label target="1" selected> Label </s-tab-label>
      <s-tab-label target="2"> Label </s-tab-label>
      <s-tab-label target="3"> Label </s-tab-label>
    </template>
    <s-tab-content name="1" style="width: 200px; height: 200px"> Tab Content 1 </s-tab-content>
    <s-tab-content name="2" style="width: 200px; height: 200px"> Tab Content 2 </s-tab-content>
    <s-tab-content name="3" style="width: 200px; height: 200px">
      Tab Content 3
    </s-tab-content></s-tabs
  >
  ```
</docs>
<template>
  <Story title="s-tabs" auto-props-disabled :layout="{ type: 'grid', width: 500 }">
    <Variant title="default">
      <template #default>
        <s-tabs>
          <template #selectors>
            <s-tab-label target="1" selected> Label </s-tab-label>
            <s-tab-label target="2"> Label </s-tab-label>
            <s-tab-label target="3"> Label </s-tab-label>
          </template>
          <s-tab-content name="1" style="width: 200px; height: 200px">
            Tab Content 1
          </s-tab-content>
          <s-tab-content name="2" style="width: 200px; height: 200px">
            Tab Content 2
          </s-tab-content>
          <s-tab-content name="3" style="width: 200px; height: 200px">
            Tab Content 3
          </s-tab-content>
        </s-tabs>
      </template>
    </Variant>

    <Variant title="filled">
      <template #default>
        <s-tabs :filled="true">
          <template #selectors>
            <s-tab-label target="1" selected> Label </s-tab-label>
            <s-tab-label target="2"> Label </s-tab-label>
            <s-tab-label target="3"> Label </s-tab-label>
          </template>
          <s-tab-content name="1" style="width: 200px; height: 200px">
            Tab Content 1
          </s-tab-content>
          <s-tab-content name="2" style="width: 200px; height: 200px">
            Tab Content 2
          </s-tab-content>
          <s-tab-content name="3" style="width: 200px; height: 200px">
            Tab Content 3
          </s-tab-content>
        </s-tabs>
      </template>
    </Variant>
  </Story>
</template>

<script setup>
import { ref, reactive } from 'vue';
</script>
