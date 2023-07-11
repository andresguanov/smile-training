<template>
  <div class="flex bg-sm-greyblue1">
    <div class="tp-sidebar bg-sm-brand1"></div>
    <div class="flex flex-col w-full bg-slate-100">
      <div class="w-full bg-white drop-shadow mb-8"></div>
      <div class="flex w-full overflow-auto px-5 py-8 grow relative justify-center">
        <div class="tp-content-micro">
          <slot></slot>
        </div>
      </div>
      <AppFloatingButton></AppFloatingButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SmInnerLoading } from '@alegradev/smile-ui-next';
import { defineAsyncComponent } from 'vue';
const AppFloatingButton = defineAsyncComponent({
  loader: () => import('app_alegra_commons/appFloatingButton'),
  loadingComponent: SmInnerLoading,
});
</script>

<style lang="scss" scoped>
.tp-sidebar {
  @apply relative;
  @apply basis-0;
  @apply grow-0;
  @apply min-h-[100vh];
  @apply shrink-0;
  @apply overflow-x-auto;
  @media screen and (min-width: 1180px) {
    @apply basis-[220px];
  }
}
.tp-content-micro {
  @apply w-full;
  @media screen and (min-width: 1180px) {
    @apply max-w-[1024px];
  }
}
.tp-content-loading {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
