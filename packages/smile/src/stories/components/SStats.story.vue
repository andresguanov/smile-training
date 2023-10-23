<template>
  <Story title="s-stats" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-stats v-bind="initState"></s-stats>
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
import { ref, reactive } from 'vue';
import { icons } from '../config/utils/IconOptions';

const value = ref(false);
const initState = reactive({
  items: [
    {
      icon: icons[0],
      trend: 1,
      help: 'Ayuda',
      label: 'Stat',
      value: 'Valor',
    },
  ],
});

const controls = [
  {
    key: 'items',
    input: 'Json',
    props: {},
  },
];
</script>
