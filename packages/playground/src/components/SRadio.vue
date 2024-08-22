<template>
  <SRadio v-model="selectedValue" :options>
    <template #label-all="{ label }">
      <p>{{ label }}</p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure iste soluta eum quibusdam
      </p>
    </template>
  </SRadio>
</template>
<script setup lang="ts">
// #region Componentes
import { SRadio } from '@alegradev/smile-ui-next';
// #endregion

// #region Importaciones
import { ref } from 'vue';
// #endregion

// #region Propiedades reactivas
const selectedValue = ref('1');

const options = ref([
  { value: 'all', label: 'Todos' },
  { value: 'ford', label: 'Ford' },
  { value: 'chevrolet', label: 'Chevrolet' },
  { value: 'nissan', label: 'Nissan' },
]);
</script>
