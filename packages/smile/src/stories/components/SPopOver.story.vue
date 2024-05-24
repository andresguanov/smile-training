<template>
  <Story title="s-pop-over" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-pop-over v-model="initState['v-model']" v-bind="initState">
          <s-button> Abrir PopOver </s-button>
          <template #actions>
            <div style="display: flex; justify-content: flex-end">
              <s-button type="reversed" size="small" emphasis="text"> Cerrar </s-button>
              <s-button type="reversed" size="small">Label</s-button>
            </div>
          </template>
        </s-pop-over>
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
  'v-model': 'true',
  title: 'Título del popover',
  description:
    'Los popovers son desplegados al hacer click o un tap en lugar de hacer hover, como un tooltip',
});

const controls = [
  {
    key: 'v-model',
    input: 'Checkbox',
    props: {},
  },
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
];
</script>
