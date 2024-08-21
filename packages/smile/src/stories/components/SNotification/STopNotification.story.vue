<template>
  <Story title="notification/s-top-notification" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-top-notification
          v-bind="initState"
          :notifications="[
            {
              id: 1,
              type: 'success',
              title: 'Title',
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
              title: 'Title',
              message: 'La sincronizacion no estará activa el dia de hoy',
              action: {
                label: 'Undo',
                action: () => {
                  console.log('Undo');
                },
              },
              contentInline: false,
            },
          ]"
          v-model:slide="initState['slide']"
          v-model="initState['modelValue']"
        ></s-top-notification>
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
  modelValue: true,
  slide: 1,
  // notifications: [
  //   {
  //     id: 1,
  //     type: 'success',
  //     title: 'Title',
  //     message: 'La sincronizacion no estará activa el dia de hoy',
  //     action: {
  //       label: 'Undo',
  //       action: () => {
  //         console.log('Undo');
  //       },
  //     },
  //     contentInline: false,
  //   },
  //   {
  //     id: 2,
  //     type: 'warning',
  //     title: 'Title',
  //     message: 'La sincronizacion no estará activa el dia de hoy',
  //     action: {
  //       label: 'Undo',
  //       action: () => {
  //         console.log('Undo');
  //       },
  //     },
  //     contentInline: false,
  //   },
  // ],
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
  // {
  //   key: 'notifications',
  //   input: 'Json',
  // },
];
</script>
