<template>
  <Story title="s-modal" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-modal
          v-bind="initState"
          @close="logEvent('close')"
          @success="logEvent('success')"
        ></s-modal>
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
import { logEvent } from 'histoire/client';
import { ref, reactive } from 'vue';
import { icons } from '../config/utils/IconOptions';

const initState = reactive({
  modelValue: true,
  headerText: '[Modal Title]',
  cancelText: 'Cancelar',
  successText: 'Guardar',
});

const controls = [
  {
    key: 'modelValue',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'headerText',
    input: 'Text',
    props: {},
  },
  {
    key: 'size',
    input: 'Select',
    props: { options: ['small', 'medium', 'large'] },
  },
  {
    key: 'cancelText',
    input: 'Text',
    props: {},
  },
  {
    key: 'successText',
    input: 'Text',
    props: {},
  },
  {
    key: 'footer-slot',
    input: 'Checkbox',
    props: {},
  },
];
</script>
