<template>
  <Story title="s-empty-state" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-empty-state
          v-bind="initState"
          @clickAction="clickAction"
          @clickSecondaryAction="clickSecondaryAction"
        ></s-empty-state>
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
import { icons } from '../config/utils/IconOptions';

const initState = reactive({
  title: 'Ningun resultado encontrado',
  generalIcon: 'search',
  description:
    'Pidele al dueño que te otorgue acceso, o contrata un hacker y entra. De paso le robas bitcoins.',
  action: {
    icon: 'home',
    label: 'Regresar',
  },
});

const controls = [
  {
    key: 'title',
    input: 'Text',
    props: {},
  },
  {
    key: 'description',
    input: 'Text',
    props: {},
  },
  {
    key: 'isOnComponent',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'generalIcon',
    input: 'Select',
    props: { options: icons },
  },
  {
    key: 'secondaryAction',
    input: 'Text',
    props: {},
  },
  {
    key: 'action',
    input: 'Json',
    props: {},
  },
];

const clickAction = () => alert('clickAction');
const clickSecondaryAction = () => alert('clickSecondaryAction');
</script>
