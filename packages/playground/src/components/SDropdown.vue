<template>
  <SDropdown v-model="selectedOption" :options="options" multiple>
    <template #append-item>
      <SButton class="w-full"> Botón en slot append </SButton>
    </template>
    <template #prepend-item>
      <SButton class="w-full"> Botón en slot append </SButton>
    </template>
  </SDropdown>
</template>
<script lang="ts" setup>
// Componentes
import { SDropdown } from '@alegradev/smile-ui-next';
import { SButton } from '@alegradev/smile-ui-next';

// Importaciones
import { ref } from 'vue';

// Types
import type { MenuOption } from '@alegradev/smile-ui-next';

// Propiedades reactivas
const options = ref<MenuOption[]>([
  {
    text: 'Texto 1',
    code: '1',
    disabled: true,
    level: 1,
    description: 'Valor aleatorio',
    textStyle: 'block mr-4',
    descriptionStyle: 'color: red',
    titleStyle: 'color: red',
  },
  { text: 'Texto 2', code: '2', level: 2 },
  { text: 'Texto 3', code: '3', level: 3 },
]);

const selectedOption = ref<string[]>([]);
</script>
