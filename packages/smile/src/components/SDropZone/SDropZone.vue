<template>
  <div ref="dropZoneRef" class="s-dp" :class="{ 'is-dragging': isOverDropZone }">
    <sm-icon icon="cloud-upload" width="40px" height="40px" />
    <h4 class="s-dp__title">{{ title }}</h4>
    <p class="s-dp__description">{{ description }}</p>
    <s-button
      class="s-dp__button"
      size="medium"
      emphasis="text"
      :label="buttonLabel"
      @click="emit('buttonClick')"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    buttonLabel?: string;
    disabled?: boolean;
  }>(),
  {
    title: 'Drag and drop files here',
    description: 'Only PDF, JPG or PNG less than 500mb',
    buttonLabel: 'Or select files',
  }
);

const emit = defineEmits<{
  (event: 'filesDrop', files: File[]): void;
  (event: 'buttonClick'): void;
}>();

const dropZoneRef = ref<HTMLDivElement>();

function onDrop(files: File[] | null) {
  if (files && files.length) {
    emit('filesDrop', files);
  }
}

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);
</script>

<style scoped src="./SDropZone.scss"></style>
