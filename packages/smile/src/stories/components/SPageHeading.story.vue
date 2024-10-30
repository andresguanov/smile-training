<template>
  <Story title="s-page-heading" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-page-heading
          v-bind="initState"
          @clickBreadcrumb="val => logEvent('clickBreadcrumb', val)"
        ></s-page-heading>
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
import { logEvent } from 'histoire/client';
import { reactive } from 'vue';
import { icons } from '../config/utils/IconOptions';

const initState = reactive({});

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
    key: 'border',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'icon',
    input: 'Select',
    props: { options: icons },
  },
  {
    key: 'breadcrumb',
    input: 'Text',
    props: {},
  },
];
</script>
