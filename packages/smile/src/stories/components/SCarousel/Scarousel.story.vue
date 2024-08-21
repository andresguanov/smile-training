<template>
  <Story title="carousel/s-carousel" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-carousel v-model="initState['modelValue']" v-bind="initState">
          <!-- <s-carousel-slide class="h-[3em]" id="test">
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
          </s-carousel-slide> -->
        </s-carousel>
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
import { reactive } from 'vue';

const initState = reactive({
  modelValue: 1,
  actionsInline: false,
  items: [
    {
      title: 'Esto es un title 1',
      description: 'Texto',
      bannerImage: 'https://via.placeholder.com/150',
    },
    {
      title: 'Esto es un title 2',
      description: 'Texto',
      bannerImage: 'https://via.placeholder.com/150',
    },
    {
      title: 'Esto es un title 3',
      description: 'Texto',
      bannerImage: 'https://via.placeholder.com/150',
    },
  ],
});

const controls = [
  {
    key: 'modelValue',
    input: 'Number',
  },
  {
    key: 'items',
    input: 'Json',
  },
];
</script>
