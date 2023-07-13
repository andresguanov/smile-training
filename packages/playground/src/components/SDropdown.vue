<template>
  <SDropdown v-model="selectedOption" :options="options">
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
  { text: 'Texto 1', code: '1', disabled: true },
  { text: 'Texto 2', code: '2' },
  { text: 'Texto 3', code: '3' },
]);

const selectedOption = ref<string>();
</script>
