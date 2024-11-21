<script lang="ts" setup>
import SModal from '../SModal/SModal.vue';

const props = defineProps<{
  modelValue: boolean;
  cancelText?: string;
  showCloseIcon?: boolean;
  successText?: string;
  headerText?: string;
  srcImage?: string;
  altImage?: string;
  contentText?: string;
}>()

</script>

<template>
  <SModal
  :modelValue="props.modelValue"
  :showCloseIcon="props.showCloseIcon"
  :cancelText="props.cancelText"
  :successText="props.successText"
>
  <section class="s-new-component">
    <picture>
      <img v-if="srcImage" :src="props.srcImage" :alt="props.altImage" />
      <img v-else src="https://via.placeholder.com/500x250.jpg" alt="Imagen sin contenido" />
    </picture>
    <h3>{{ props.headerText }}</h3>
    <p>
      {{ props.contentText }}
    </p>
  </section>
  
</SModal>
</template>

<style lang="scss" scoped>
.s-new-component {	
  @apply my-4 space-y-5 rounded-md;

  picture {
    @apply aspect-video;

    img {
      @apply w-full object-cover rounded-md;
    }
  }

  h3 {
    @apply text-2xl font-bold text-balance;
  }
}
</style>