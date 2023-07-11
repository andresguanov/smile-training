<template>
  <DefaultLayout>
    <h1 class="text-3xl mb-4">Playground</h1>
    <p class="mb-4">
      Área destinada para realizar las pruebas necesarias en el desarrollo de componentes del
      paquete <b>Smile</b>. Por favor, dejar el template vacío, buscamos probar un componente a la
      vez. En caso de ser necesario probar múltiples componentes, dirígete a la carpeta componentes,
      genera tu componente y lo importas en esta área, al finalizar procura eliminar la importación
      para que nuevamente esta área quede vacía.
    </p>
    <p class="mb-4">
      Si lo consideras necesario, realiza el push de las pruebas desarrolladas en la carpeta de
      <code>src/components</code>
    </p>
    <p class="font-extrabold text-2xl">¡ESTA ÁREA SIEMPRE DEBE ESTAR VACÍA!</p>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from './layouts/DefaultLayout.vue';
</script>
