<template>
  <Story title="carousel/sm-carousel" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <sm-carousel v-model="initState['modelValue']" actions-default>
          <s-carousel-slide class="h-[3em]" id="test">
            <div class="flex w-full h-full gap-4 p-4">
              <div class="h-full shadow-lg p-8 text-center rounded-md w-full">
                <h1>Esto es un title</h1>
                <p>Texto</p>
              </div>
              <div class="h-full shadow-lg p-8 text-center rounded-md w-full">
                <h1>Esto es un title</h1>
                <p>Texto</p>
              </div>
              <div class="h-full shadow-lg p-8 text-center rounded-md w-full">
                <h1>Esto es un title</h1>
                <p>Texto</p>
              </div>
            </div>
          </s-carousel-slide>
          <s-carousel-slide class="h-[3em]" id="test2">
            <div class="flex w-full h-full gap-4 p-4">
              <div class="h-full shadow-lg p-8 text-center rounded-md w-full">
                <h1>Esto es un title</h1>
                <p>Texto</p>
              </div>
              <div class="h-full shadow-lg p-8 text-center rounded-md w-full">
                <h1>Esto es un title</h1>
                <p>Texto</p>
              </div>
              <div class="h-full shadow-lg p-8 text-center rounded-md w-full">
                <h1>Esto es un title</h1>
                <p>Texto</p>
              </div>
            </div>
          </s-carousel-slide>
        </sm-carousel>
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

const initState = reactive({
  modelValue: 1,
  actionsDefault: true,
  actionsInline: false,
  actionsHidden: false,
});

const controls = [
  {
    key: 'v-model',
    input: 'Checkbox',
  },
  {
    key: 'actionsInline',
    input: 'Checkbox',
  },
];
</script>
