<template>
  <SForm validate-on="type" ref="form">
    <SDropdown ref="refComp" v-model="selectedOption" :options="options" :rules="rules" object>
      <template #append-item> test </template>
      <template #prepend-item> test </template>
    </SDropdown>
    <SButton class="w-full" @click="validate"> Validar </SButton>
  </SForm>
</template>
<script lang="ts" setup>
// Componentes
import { SDropdown, SForm, SButton } from '@alegradev/smile-ui-next';
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

const optionsCreated = Array.from({ length: 3000 }, (_, i) => i + 1).reduce((a, b) => {
  const option = { text: `Texto ${b}`, code: b };
  a.push(option);
  return a;
}, [] as MenuOption[]);

const options = ref<MenuOption[]>([...optionsCreated]);

const refComp = ref<any>(null);

const rules = [(v: string) => !!v || 'Requerido'];

const selectedOption = ref<string>();

// Métodos
const validate = () => {
  if (form.value) {
    console.log(form.value.validateForm());
  }
};
</script>
