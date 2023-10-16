<template>
  <Story title="s-datepicker" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-datepicker
          v-model="value"
          v-bind="initState"
          @clickOption="logEvent('clickOption', { $event })"
        />
      </template>
      <template #controls>
        <template v-for="control in controls">
          <component
            v-model="initState[control.key]"
            :is="`Hst${control.input}`"
            :title="control.key"
            v-bind="control.props"
          />
        </template>
      </template>
    </Variant>
  </Story>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { logEvent } from 'histoire/client';

const value = ref();
const initState = reactive({
  label: 'Smile datepicker',
  size: 'medium',
  optionalText: 'Opcional',
  disabledDates: [new Date()],
  sidebarOptions: [
    {
      id: 'first',
      title: 'Primera opción',
      description: 'Esta es mi primera opción',
    },
    {
      id: 'today',
      title: 'Hoy',
    },
  ],
});

const controls = [
  {
    key: 'locale',
    input: 'Select',
    props: { options: ['es', 'en'] },
  },
  {
    key: 'format',
    input: 'Text',
    props: {},
  },
  {
    key: 'placeholder',
    input: 'Text',
    props: {},
  },
  {
    key: 'clearable',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'readonly',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'id',
    input: 'Text',
    props: {},
  },
  {
    key: 'label',
    input: 'Text',
    props: {},
  },
  {
    key: 'disabled',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'required',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'size',
    input: 'Select',
    props: { options: ['small', 'medium', 'large'] },
  },
  {
    key: 'disabledDates',
    input: 'Json',
    props: {},
  },
  {
    key: 'sidebarOptions',
    input: 'Json',
    props: {},
  },
  {
    key: 'error',
    input: 'Text',
    props: {},
  },
  {
    key: 'textInput',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'rangeMode',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'multiCalendars',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'autoApply',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'markType',
    input: 'Select',
    props: { options: ['required', 'optional'] },
  },
  {
    key: 'optionalText',
    input: 'Text',
    props: {},
  },
  {
    key: 'hint',
    input: 'Text',
    props: {},
  },
  {
    key: 'supportiveText',
    input: 'Text',
    props: {},
  },
];
</script>
