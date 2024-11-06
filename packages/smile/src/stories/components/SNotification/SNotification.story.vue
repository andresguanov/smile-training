<template>
  <Story title="notification/s-notification" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-notification
          v-bind="initState"
          v-model:slide="initState['slide']"
          v-model="initState['modelValue']"
        ></s-notification>
      </template>

      <template #controls>
        <component
          v-model="initState[control.key]"
          v-for="control in controls"
          :is="`Hst${control.input}`"
          :title="control.key"
          v-bind="control.props"
        />
      </template>
    </Variant>
  </Story>
</template>

<script setup>
import { ref, reactive } from 'vue';

const initState = reactive({
  carousel: true,
  carouselActionsAlt: false,
  modelValue: true,
  slide: 1,
  notifications: [
    {
      id: 1,
      type: 'success',
      title: 'Sincronización no activa durante el día',
      message: 'La sincronizacion no estará activa el dia de hoy',
      action: {
        label: 'Undo',
        action: () => {
          console.log('Undo');
        },
      },
      contentInline: false,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Sincronización no activa durante el día',
      message:
        'La sincronizacion no estará activa el dia de hoy, las facturas que hagas hoy se enviaran mañana.',
      action: {
        label: 'Undo',
        action: () => {
          console.log('Undo');
        },
      },
      contentInline: false,
    },
  ],
});

const controls = [
  {
    key: 'modelValue',
    input: 'Checkbox',
  },
  {
    key: 'carousel',
    input: 'Checkbox',
  },
  {
    key: 'carouselActionsAlt',
    input: 'Checkbox',
  },
  {
    key: 'notifications',
    input: 'Json',
  },
];
</script>
