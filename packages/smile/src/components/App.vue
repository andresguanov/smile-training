<template>
  <div class="app_container">
    <p>{{ text }}</p>
    <!-- <SNotifyStack />
    <SToast
      :time="100"
      :id="notifications['toast'].id"
      :title="notifications['toast'].title"
      :message="notifications['toast'].message"
      :type="notifications['toast'].type"
      :action="notifications['toast'].action"
    /> -->
    <!-- <SNotificationItem v-bind="notifications['notification']"></SNotificationItem> -->
    <!-- <SNotification v-bind="notifications['notification']" v-model="slide"></SNotification> -->
    <sm-carousel v-model="slide" actions-default>
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

    <!-- <SNotification v-bind="notifications['notification']" v-model="slide"></SNotification>
    <STopNotification
      v-bind="notifications['top_notification']"
      v-model="slideTop"
    ></STopNotification> -->
    {{ slide }}
    <!-- <STopNotificationItem
      :id="13"
      :action="notifications['top_notification'].notifications[0].action"
      :title="notifications['top_notification'].notifications[0].title"
      :message="notifications['top_notification'].notifications[0].message"
      :type="notifications['top_notification'].notifications[0].type"
      appendAlt
    >
      <template #append-alt>
        <s-carousel-actions v-model:currentPage="slide" :totalPages="2"></s-carousel-actions>
      </template>
    </STopNotificationItem> -->
  </div>
</template>

<script setup lang="ts">
import { useSmAlert } from '~/utils';
import { smNotifications } from '~/interfaces/sm-alert.interface';

const $alert = useSmAlert();

$alert.success('Hello World', {
  time: 1000,
  persistent: true,
  title: 'Hello World',
});

const text = ref('Hello World');

const slide = ref(1);
const slideTop = ref(1);

const notifications: Record<string, smNotifications> = {
  // stack: {
  //   id: 1,
  //   title: 'Hello World',
  //   message: 'Hello World',
  //   type: 'success',
  //   time: 1000,
  //   persistent: true,
  // },
  // toast: {
  //   id: 1,
  //   type: 'success',
  //   title: 'Hello World',
  //   message: 'Hello World',
  //   action: {
  //     label: 'Undo',
  //     action: () => {
  //       console.log('Undo');
  //     },
  //   },
  // },
  notification: {
    carousel: true,
    carouselActionsAlt: false,
    notifications: [
      {
        id: 1,
        type: 'success',
        title: 'Sincronización no activa durante el día',
        message:
          'La sincronizacion no estará activa el dia de hoy, las facturas que hagas hoy se enviaran mañana.',
        action: {
          label: 'Undo',
          action: () => {
            console.log('Undo');
          },
        },
        contentInline: false,
      },
      {
        id: 2,
        type: 'warning',
        title: 'Sincronización no activa durante el día',
        message:
          'La sincronizacion no estará activa el dia de hoy, las facturas que hagas hoy se enviaran mañana.',
        action: {
          label: 'Undo',
          action: () => {
            console.log('Undo');
          },
        },
        contentInline: false,
      },
    ],
  },
  top_notification: {
    carousel: true,
    carouselActionsAlt: false,
    notifications: [
      {
        id: 1,
        type: 'success',
        title: 'Sincronización no activa durante el día',
        message:
          'La sincronizacion no estará activa el dia de hoy, las facturas que hagas hoy se enviaran mañana.',
        action: {
          label: 'Undo',
          action: () => {
            console.log('Undo');
          },
        },
        contentInline: false,
      },
      {
        id: 2,
        type: 'warning',
        title: 'Sincronización no activa durante el día',
        message:
          'La sincronizacion no estará activa el dia de hoy, las facturas que hagas hoy se enviaran mañana.',
        action: {
          label: 'Undo',
          action: () => {
            console.log('Undo');
          },
        },
        contentInline: false,
      },
    ],
  },
};
</script>

<style lang="scss" scoped>
.app_container {
  @apply flex flex-col p-4;
  @apply gap-10;
}
</style>
