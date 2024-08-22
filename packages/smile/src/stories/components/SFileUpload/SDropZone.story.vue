<template>
  <Story title="file-upload/s-drop-zone" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-drop-zone
          v-bind="initState"
          @files-drop="files => logEvent('filesDrop', { files })"
          @button-click="logEvent('buttonClick')"
        ></s-drop-zone>
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

const initState = reactive({
  title: 'Drag and drop files here',
  description: 'Only PDF, JPG or PNG less than 500mb',
  buttonLabel: 'Or select files',
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
    key: 'buttonLabel',
    input: 'Text',
    props: {},
  },
  {
    key: 'disabled',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'error',
    input: 'Text',
    props: {},
  },
  {
    key: 'id',
    input: 'Text',
    props: {},
  },
];
</script>
