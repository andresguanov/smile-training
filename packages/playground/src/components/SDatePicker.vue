<template>
  <SmDatepicker v-model="today" locale="en" range type="hour" append-to-body show-time-header>
    <template #sidebar>
      <ul>
        <li><strong>Usando Sidebar</strong></li>
        <li>Hoy</li>
        <li>Ayer</li>
        <li>Este mes</li>
      </ul>
    </template>
  </SmDatepicker>
</template>
<script lang="ts" setup>
// Componentes
import { SmDatepicker } from '@alegradev/smile-ui-next';

// Importaciones
import { ref } from 'vue';

// Propiedades reactivas
const today = ref<Date>(new Date());

const selectedOption = ref<string>();
</script>
