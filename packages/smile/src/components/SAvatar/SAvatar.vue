<template>
  <div class="s-avatar" :class="`size-${size} ${type}`">
    <img
      v-if="avatarSource === 'image'"
      :src="image"
      :alt="text || 'Avatar'"
      @error="onLoadError()"
    />
    <sm-icon v-else-if="icon" :icon="icon" />
    <p v-else>{{ firsLetter }}</p>
  </div>
</template>

<script lang="ts" setup>
import type { IconType } from '../../interfaces';

const props = withDefaults(
  defineProps<{
    type?: 'circle' | 'square';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    text?: string;
    image?: string;
    icon?: IconType;
  }>(),
  {
    type: 'circle',
    size: 'md',
  }
);
const emit = defineEmits<{
  (event: 'imageLoadError'): void;
}>();

const imageHasError = ref(false);
const avatarSource = computed<'image' | 'icon' | 'text'>(() => {
  if (props.image && !imageHasError.value) return 'image';
  if (props.text) return 'text';
  return 'icon';
});
const firsLetter = computed(() => props.text?.charAt(0));

const onLoadError = () => {
  emit('imageLoadError');
  imageHasError.value = true;
};
</script>

<style lang="scss" src="./SAvatar.scss" scoped></style>
