<template>
  <!-- <div class="app_container">
    <s-notify-stack />
    <div>
      <s-slider v-model="sSilderModel" label="Label"></s-slider>
    </div>
    <s-tag label="Demorado" type="primary" leading-icon="cloud-download" />
    <s-tag label="Completado" type="slate" leading-icon="checks" />
    <s-datepicker v-model="selected" />
    <div class="relative">
      <s-input
        v-model="search"
        icon-right="search"
        placeholder="Buscar..."
        @click.stop="open = !open"
      />
      <s-overflow-menu
        v-if="open"
        top="100%"
        left="0"
        right="0"
        bubbling
        @click-outside="open = false"
      >
        <template #header>
          <div class="px-2 pt-2">
            <p>Resultados de la busqueda:</p>
          </div>
        </template>
        <s-menu-item title="Test 1" />
        <s-menu-item title="Test 2" />
        <s-menu-item title="Test 3" />
      </s-overflow-menu>
    </div>
    <s-wizard
      v-model="step"
      :steps="steps"
      has-back-button
      :is-on-component="true"
      :menu="{
        userName: 'Carlos Quispe',
        userId: '123213',
        items: [
          {s
            icon: 'add',
            id: 'add',
            text: 'dasads',
          },
        ],
        hasLogout: true,
        onlyAvatar: true,
      }"
    />
    <s-table
      ref="testSmTable"
      :rows="items"
      :filters="[{ key: 'date', label: 'fecha', type: 'datepicker', icon: 'clock' }]"
      :column-config="cols"
      class="my-table"
      :actions="[{ label: 'Test', name: 'test', icon: 'add' }]"
      pagination-full-mode
      @refresh="onChange"
      @change="onChange"
      @filter="onChange"
      @toolbar-action="logEvent"
    >
      <template #head.a>
        <input v-model="selectAll" type="checkbox" name="test" id="test" />
      </template>
      <template #rowCell(a)="{ row }">
        <s-cell
          :text="row.a"
          :avatar="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            row.a + 1
          }.png`"
          right-content
          second-line="Second Line"
        />
      </template>
    </s-table>
  </div> -->
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
        :magic="magic"
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
    <SInput v-model="myText" label="My Label" icon-left="loading" :magic="magic" />
    <SDropdown
      :magic="magic"
      label="Label"
      :options="[
        {
          text: 'Javascript',
          code: 'js',
          icon: 'flag-3',
        },
        {
          text: 'PHP',
          code: 'php',
          icon: 'flag-3',
        },
        {
          text: 'Python',
          code: 'py',
          icon: 'flag-3',
        },
        {
          text: 'C++',
          code: 'cc',
          icon: 'flag-3',
        },
      ]"
    />
    <SLoader label="Loading..."></SLoader>
    <SLoader label="Autocompletando..." is-inline magic></SLoader>
    <div class="w-32 h-32 mx-auto my-8">
      <SLoader label="Loading..." magic></SLoader>
    </div>
    <SLoader label="Autocompletando..." is-inline></SLoader>
  </div>
</template>

<script setup lang="ts">
import type { smTableChangeEvent, smTableColumn } from '~/interfaces';
import { SButton } from './index';
import { $SmAlert, ISmAlertProvide } from '../utils/alerts';

import { ref, reactive } from 'vue';

const myText = ref('');
const hasError = ref(true);
const magic = ref(false);
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
