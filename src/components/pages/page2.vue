<template>
  <div>
    Pagina 2

    <sm-button @click="nexPage">Siguiente Pagina</sm-button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['nextPage'])

const nexPage = () => emit('nextPage')
</script>

<style scoped></style>
