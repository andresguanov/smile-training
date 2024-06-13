<template>
  <Story title="s-tooltip" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <div style="width: 160px; margin: 30px auto">
          <s-tooltip v-bind="initState">
            <h1>Paragraph with tooltip</h1>
          </s-tooltip>
        </div>
        <div style="margin-top: 60px; text-align: center">
          <p style="margin-bottom: 20px">
            Usando slot <b>content</b>, El slot <b>NO TIENE PRIORIDAD</b> sobre la prop content!
          </p>
          <s-tooltip v-bind="initState">
            <h1>Paragraph with tooltip</h1>
            <template #content>
              <div v-html="initState['slot-content']"></div>
            </template>
          </s-tooltip>
        </div>
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
  label: 'label',
});

const controls = [
  {
    key: 'content',
    input: 'Text',
    props: {},
  },
  {
    key: 'slot-content',
    input: 'Text',
    props: {},
  },
  {
    key: 'allowHTML',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'placement',
    input: 'Select',
    props: {
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'auto',
        'auto-start',
        'auto-end',
      ],
    },
  },
  {
    key: 'tag',
    input: 'Select',
    props: {
      options: ['button', 'div', 'p', 'span'],
    },
  },
];
</script>
