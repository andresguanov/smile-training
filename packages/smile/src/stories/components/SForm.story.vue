<template>
  <Story title="s-form" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-form v-bind="initState" @submit="logEvent" @validation:error="logEvent">
          <template #default="{ validate, reset }">
            <s-input
              v-model="formValues.username"
              label="Username"
              :rules="[rules.required, rules.startWithUppercase]"
            />
            <s-input
              v-model="formValues.password"
              label="Password"
              native-type="password"
              :rules="[rules.required, rules.min]"
            />
            <div class="flex gap-4">
              <s-button emphasis="subtle" @click="validate()">Validate</s-button>
              <s-button type="destructive" @click="reset()">Reset</s-button>
              <s-button native-type="submit">Submit</s-button>
            </div>
          </template>
        </s-form>
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
import { logEvent } from 'histoire/client';
import { reactive } from 'vue';

const initState = reactive({
  validateOn: 'submit',
});
const formValues = reactive({
  username: '',
  password: '',
});

const rules = {
  required: v => {
    return !!v || 'El valor es requerido';
  },
  min: v => {
    return v.length >= 6 || 'Es necesario escribir 6 letras como mínimo';
  },
  startWithUppercase: v => {
    return /^[A-Z][a-z0-9_-]{3,19}$/.test(v) || 'La primera letra debe estar en mayúscula';
  },
};

const controls = [
  {
    key: 'containerIsForm',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'validateOn',
    input: 'Select',
    props: { options: ['submit', 'focusout', 'type'] },
  },
  {
    key: 'breakOnFirstError',
    input: 'Checkbox',
    props: {},
  },
];
</script>

<docs lang="md">
## SForm

Este es un componente que no cuenta con diseño, es un wrapper que permite validar
los diferentes tipos de inputs de la librería de Smile.

### Tipos de validación

- #### submit:
  Se valida el formulario cuando se ejecuta un evento `submit`, es necesario que
  la prop `containerIsForm` se encuentre activa.
- #### focusout:
  Los inputs se validarán atumáticamente cada vez que su evento `focusout` se ejecute.
- #### type
  Los inputs se validan cuando se cambia su valor (un watch vigila los cambios).

### Metodos expuestos

1. <strong>A través de Slot</strong>

- validate: Permite validar los inputs del formulario, devuelve `{ valid, results }`
- reset: Permite de manera <strong>visual</strong> ocultar los mensajes de error.

2. <strong>Mediante Ref</strong>

- validateInput: Permite validar un inputs en específico mediante su `id`.
- validateForm: Permite validar los inputs del formulario, devuelve `{ valid, results }`
- resetInputs: Permite de manera <strong>visual</strong> ocultar los mensajes de error.
- onSubmit: Permite ejecutar `validateForm` y obtener los eventos correspondientes.

### Recomendaciones

- En formularios enormes no es recomendable usar el tipo de validación `type` puede llegar
  a ocacionar problemas de rendimiento.
- Los inputs contienen un autogenerador de `id`, sin embargo puede llegar a generar un
  problema de duplicidad, para evitar este problema utilice la prop que se encarga de
  manejar el `id` del input correspondiente.
</docs>
