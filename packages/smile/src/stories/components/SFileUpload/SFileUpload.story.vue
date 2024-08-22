<template>
  <Story title="file-upload/s-file-upload" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-file-upload v-model:files="value" v-bind="initState"></s-file-upload>
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
import { icons } from '../../config/utils/IconOptions';

const value = ref([]);
const initState = reactive({
  label: 'Label',
});

const controls = [
  {
    key: 'label',
    input: 'Text',
    props: {},
  },
  {
    key: 'description',
    input: 'Text',
    props: {},
  },
  {
    key: 'id',
    input: 'Text',
    props: {},
  },
  {
    key: 'multiple',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'buttonLabel',
    input: 'Text',
    props: {},
  },
  {
    key: 'accept',
    input: 'Text',
    props: {},
  },
  {
    key: 'fileIcon',
    input: 'Select',
    props: { options: icons },
  },
  {
    key: 'useDropZone',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'buttonLabel',
    input: 'Text',
    props: {},
  },
  {
    key: 'required',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'markType',
    input: 'Select',
    props: { options: ['required', 'optional'] },
  },
  {
    key: 'rules',
    input: 'Text',
    props: {},
  },
  {
    key: 'error',
    input: 'Text',
    props: {},
  },
];
</script>
