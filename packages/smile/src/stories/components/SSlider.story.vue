<template>
  <Story title="s-slider" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-slider v-model="sliderValue" v-bind="initState">
          <s-input v-model="sliderValue" readonly></s-input>
        </s-slider>
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

const sliderValue = ref(0);

const initState = reactive({
  label: '[Slider Title]',
  min: 0,
  max: 500,
});

const controls = [
  {
    key: 'label',
    input: 'Text',
    props: {},
  },
  {
    key: 'min',
    input: 'Number',
    props: {},
  },
  {
    key: 'max',
    input: 'Number',
    props: {},
  },
];
</script>
