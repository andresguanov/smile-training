<template>
  <Story title="datepicker/s-datepicker-base" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-datepicker-base
          v-model="value"
          v-bind="initState"
          @clickOption="logEvent('clickOption', { $event })"
        >
          <template #s-dp-trigger>
            <p>Este es solo un trigger template</p>
          </template>
        </s-datepicker-base>
      </template>
      <template #controls>
        <template v-for="control in controls">
          <CustomInputControl
            v-if="control.input === 'Date'"
            v-model="initState[control.key]"
            :label="control.key"
            :uid="control.key"
            type="date"
          />
          <component
            v-else
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
import { reactive, ref } from 'vue';
import { logEvent } from 'histoire/client';
import { DATEPICKER_PROPS } from './commonProps';
import CustomInputControl from '../../config/controls/CustomInputControl.vue';

const value = ref();
const initState = reactive({
  label: 'Smile datepicker',
  size: 'medium',
  optionalText: 'Opcional',
  disabledDates: [new Date()],
  sidebarOptions: [
    {
      id: 'first',
      title: 'Primera opción',
      description: 'Esta es mi primera opción',
    },
    {
      id: 'today',
      title: 'Hoy',
    },
  ],
});

const controls = [...DATEPICKER_PROPS];
</script>
