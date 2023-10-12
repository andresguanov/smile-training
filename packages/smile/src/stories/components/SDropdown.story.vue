<template>
  <Story title="s-dropdown">
    <s-dropdown v-model="inputValue" v-bind="props"></s-dropdown>
  </Story>
</template>

<script setup>
const inputValue = ref();
const props = {
  label: 'Label',
  size: 'medium',
  loadingText: 'Cargando contenido...',
  textKey: 'text',
  valueKey: 'code',
  options: [
    { text: 'Javascript', code: 'js', icon: 'flag-3' },
    { text: 'PHP', code: 'php', icon: 'flag-3' },
    { text: 'Python', code: 'py', icon: 'flag-3' },
    { text: 'C++', code: 'cc', icon: 'flag-3' },
  ],
  optionalText: 'Opcional',
  maxHeight: '300px',
};
</script>
