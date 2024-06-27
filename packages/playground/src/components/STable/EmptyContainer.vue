<template>
  <div class="flex w-full justify-center items-center flex-col">
    <SmIcon width="3rem" height="3rem" icon="list"></SmIcon>
    <p class="text-2xl font-semibold text-slate-900 mt-6 mb-2">
      Almacena y registra tus comprobantes
    </p>
    <p class="text-sm">
      {{ helpText }}
    </p>
    <SButton class="mt-6" emphasis="outline" :label="importButtonLabel"> </SButton>
  </div>
</template>
<script setup lang="ts">
// Importación de store
import { ref } from 'vue';

// Componentes
import { SmIcon, SButton } from '@alegradev/smile-ui-next';

const importButtonLabel = ref<string>('Click');

const helpText = ref<string>(
  'Importa los XML de tus comprobantes fiscales desde el SAT y regístralos en Alegra con un clic.'
);
</script>
