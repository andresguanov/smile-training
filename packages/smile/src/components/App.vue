<template>
  <div class="app-container">
    <div class="absolute z-20 flex gap-2">
      <sm-button @click="open = true">Overflow 1</sm-button>
      <sm-button @click="open1 = true">Overflow 2</sm-button>
    </div>

    <s-overflow-menu @clickOutside="open = false" v-if="open" top="100%" left="0">
      <template #header>
        <div class="px-2 pt-2">
          <p>Resultados de la busqueda:</p>
        </div>
        <sm-input icon="" placeholder="Search"></sm-input>
      </template>
      <SMenuItem
        textStyle="inline"
        title="[Title]"
        description="[description]"
        icon="social-vimeo"
        :disabled="false"
        :destructive="false"
        descriptionStyle=""
        avatar="sa"
      />
      <s-menu-item icon="social-vimeo" title="Test 1" :divider="true">
        <template #leading>
          <div class="w-4 h-4 bg-sm-primary-50"></div>
        </template>
        <template #trailing>
          <div class="w-4 h-4 bg-sm-primary-50"></div>
        </template>
      </s-menu-item>
      <s-menu-item icon="social-vimeo" title="Test 2" />
      <s-menu-item icon="social-vimeo" title="Test 3" />
      <template #footer>
        <sm-button>Label</sm-button> <sm-button type="primary">Label</sm-button>
      </template>
    </s-overflow-menu>

    <s-overflow-menu @clickOutside="open1 = false" v-if="open1" top="100%" right="0" class="w-64">
      <SMenuItem
        textStyle="inline"
        title="Editar"
        icon="edit"
        :disabled="false"
        :destructive="false"
      >
      </SMenuItem>
      <SDivider size="XS"></SDivider>

      <SMenuItem
        textStyle="inline"
        title="Duplicar"
        icon="copy"
        :disabled="false"
        :destructive="false"
        :divider="true"
      >
        <template #trailing> ⌘D </template>
      </SMenuItem>
      <SDivider size="SM"></SDivider>

      <SMenuItem
        textStyle="inline"
        title="Compartir"
        icon="share"
        :disabled="false"
        :destructive="false"
      >
      </SMenuItem>
      <SDivider size="MD"></SDivider>

      <SMenuItem
        textStyle="inline"
        title="Imprimir"
        icon="print"
        :disabled="false"
        :destructive="false"
        :divider="true"
      >
      </SMenuItem>
      <SDivider size="LG"></SDivider>

      <SMenuItem
        textStyle="inline"
        title="Eliminar"
        icon="delete"
        :disabled="false"
        :destructive="true"
      >
      </SMenuItem>
      <SDivider size="XL"></SDivider>
    </s-overflow-menu>
    <div class="pt-16">
      <SmTextarea
        label="My Label"
        v-model="myText"
        :error="hasError"
        size="medium"
        required
        placeholder="Enter some text"
        :errorMessages="errorMessages"
        :rules="rules"
        @on:focusout="handleFocusOut"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { $SmAlert, ISmAlertProvide } from '../utils/alerts';

import { ref } from 'vue';
const myText = ref('');
const hasError = ref(true);
const errorMessages = ref(['Error message 1', 'Error message 2']);
const rules = ref([
  (value: any) => !!value || 'Required.',
  (value: any) => (value && value.length >= 3) || 'Minimum 3 characters',
]);

const handleFocusOut = () => {
  hasError.value = !rules.value.every(rule => typeof rule(myText.value) === 'boolean');
};

const open = ref(false);
const open1 = ref(false);

const smAlert = inject<ISmAlertProvide>($SmAlert);
onMounted(() => {
  smAlert?.success('Hola mundo');
  smAlert?.error('Hola mundo');
  smAlert?.warning('Hola mundo', { title: '<h2>Grande</h2> pequeño' });
  smAlert?.neutral('Hola mundo', { label: 'dasdasd' });
  smAlert?.info(
    `Errores:
    <ul class="flex gap-4">
      <li>1: Error al cargar los datos bla bla bla...</li>
      <li>2: No se pudo generar la factura de venta a por los sig. motivos...</li>
    </ul>`,
    {
      title: 'Titulo de info',
      persistent: true,
    }
  );
});
</script>

<style lang="scss" scoped>
.app_container {
  @apply flex flex-col;
  @apply m-5;
  @apply max-w-5xl;
}
</style>
