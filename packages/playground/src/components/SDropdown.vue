<template>
  <SForm validate-on="type" ref="form">
    <SInput v-model="text" :rules="rules" />
    <SDropdown v-model="selectedOption" :options="options" :rules="rules" object>
      <template #append-item>
        <SButton class="w-full"> Botón en slot append </SButton>
      </template>
      <template #prepend-item>
        <SButton class="w-full"> Botón en slot append </SButton>
      </template>
    </SDropdown>
    <SButton class="w-full" @click="validate"> Validar </SButton>
  </SForm>
</template>
<script lang="ts" setup>
// Componentes
import { SDropdown, SForm, SInput } from '@alegradev/smile-ui-next';
import { SButton } from '@alegradev/smile-ui-next';

// Importaciones
import { ref } from 'vue';

// Types
import type { ComponentPublicInstance } from 'vue';
import type { MenuOption } from '@alegradev/smile-ui-next';

// Propiedades reactivas
const form = ref<
  ComponentPublicInstance & {
    validateForm: () => {
      valid: boolean;
      results: {
        id: string;
        errorMessages: string[];
      }[];
    };
  }
>();

const options = ref<MenuOption[]>([
  {
    text: 'Texto 1',
    code: 1,
    disabled: true,
    level: 1,
    description: 'Valor aleatorio',
    textStyle: 'block mr-4',
    descriptionStyle: 'color: red',
    titleStyle: 'color: red',
  },
  { text: 'Texto 2', code: 2, level: 2 },
  { text: 'Texto 3', code: 3, level: 3 },
]);

const rules = [(v: string) => !!v || 'Requerido'];

const selectedOption = ref<string>();

const text = ref<string>('');

// Métodos
const validate = () => {
  if (form.value) {
    console.log(form.value.validateForm());
  }
};
</script>
