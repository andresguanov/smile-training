<template>
  <div class="s-carousel" :id="props.id" :class="{ inline: actionsInline }">
    <div v-if="actionsInline" class="s-carousel__action-inline">
      <SButton
        size="small"
        emphasis="text"
        only-icon="arrow-left"
        :disabled="ctasDisabled['left']"
        @click="prevSlide"
      />
    </div>
    <ul ref="carouselListRef" class="s-carousel__viewport">
      <template v-if="items?.length">
        <SCarouselSlide
          v-for="(item, i) in items"
          :id="defineIdElement(i + 1)"
          :key="i"
          :title="item.title"
          :description="item.description"
          :image="item.bannerImage"
          :label="item.label"
          :action="item.action"
        />
      </template>
      <template v-else>
        <slot
          :actionPrev="prevSlide"
          :actionNext="nextSlide"
          :currentSlide="modelValue"
          :handlerCurrentSlide="handleUpdateActionSlide"
          :totalCurrent="itemsRef.length"
        >
        </slot>
      </template>
    </ul>
    <div v-if="actionsInline" class="s-carousel__action-inline">
      <SButton
        size="small"
        emphasis="text"
        only-icon="arrow-right"
        :disabled="ctasDisabled['right']"
        @click="nextSlide"
      />
    </div>

    <div
      v-if="!actionsInline && actionsDefault && !actionsHidden"
      class="s-carousel__action-default"
    >
      <slot name="actions">
        <s-carousel-actions
          :current-page="modelValue"
          @update:current-page="handleUpdateActionSlide"
          :total-pages="itemsRef.length"
        ></s-carousel-actions>
      </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { simpleUid } from '~/utils/uid';

interface Item {
  id: string;
  title: string;
  description: string;
  bannerImage: string;
  label: string;
  action: () => void;
}

const props = withDefaults(
  defineProps<{
    id?: string;
    modelValue: number;
    actionsInline?: boolean;
    actionsDefault?: boolean;
    actionsHidden?: boolean;
    items?: Array<Item>;
  }>(),
  {
    id: () => simpleUid(),
    modelValue: 1,
    actionsHidden: false,
  }
);

const carouselListRef = ref<HTMLUListElement | null>(null);

const defineIdElement = (slide: number) => `s-carousel__slide_${props.id}_${slide}`;

watch(carouselListRef, val => {
  const items = carouselListRef.value;

  const validationItems = props.items?.length;

  if (!props.modelValue && !val && !validationItems) return;

  console.log(items);
  if (!items || props.items?.length) return;
  // Definicón de id para cada elemento de la lista
  for (let i = 0; i < items.children.length; i++) {
    items.children[i].id = defineIdElement(i + 1);
    console.log('items.children[i].id', items.children[i].id);
  }
});

const emit = defineEmits<{
  (event: 'update:modelValue', page: number): void;
}>();

const navigateSlides = (page: number) => {
  const element = document.createElement('a');
  element.href = `#${defineIdElement(page)}`;
  element.click();
};

const itemsRef = computed(() => props.items ?? carouselListRef.value?.children ?? []);

const ctasDisabled = computed(() => ({
  left: props.modelValue === 1,
  right: props.modelValue === itemsRef.value.length,
}));

const prevSlide = () => {
  console.log('prevSlide');
  const { modelValue: value } = props;
  if (value == 1) return;
  const page = value - 1;
  emit('update:modelValue', page);
  navigateSlides(page);
};

const nextSlide = () => {
  console.log('nextSlide');
  const validationItems = (itemsRef.value as Array<any>).length;

  const { modelValue: value, items = [] } = props;
  if (value == items?.length || value === validationItems) return;

  const page = value + 1;

  emit('update:modelValue', page);
  navigateSlides(page);
};

const handleUpdateActionSlide = (val: number) => {
  emit('update:modelValue', val);
  navigateSlides(val);
};
</script>
<style lang="scss">
@keyframes tonext {
  75% {
    left: 0;
  }
  95% {
    left: 100%;
  }
  98% {
    left: 100%;
  }
  99% {
    left: 0;
  }
}

@keyframes tostart {
  75% {
    left: 0;
  }
  95% {
    left: -300%;
  }
  98% {
    left: -300%;
  }
  99% {
    left: 0;
  }
}

@keyframes snap {
  96% {
    scroll-snap-align: center;
  }
  97% {
    scroll-snap-align: none;
  }
  99% {
    scroll-snap-align: none;
  }
  100% {
    scroll-snap-align: center;
  }
}

ul {
  box-sizing: border-box;
  scrollbar-color: transparent transparent; /* thumb and track color */
  scrollbar-width: 0px;
}

*::-webkit-scrollbar {
  width: 0;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background: transparent;
  border: none;
}

* {
  -ms-overflow-style: none;
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
  scrollbar-width: none;
  width: 100%;
}

.s-carousel {
  position: relative;
  width: 100%;
  &.inline {
    @apply flex gap-x-1;
  }
  /* filter: drop-shadow(0 0 10px #0003);
  perspective: 100px; */
  &__action-inline {
    align-content: center;
  }
  &__action-default {
    @apply relative flex gap-4 justify-center w-full;
  }
}

.s-carousel__viewport {
  display: flex;
  column-gap: 3.5em;
  overflow-x: scroll;
  counter-reset: item;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  // Crea una animación de desplazamiento
  transition: all 4s ease-in-out;
}

.s-carousel-slide {
  position: relative;
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  scroll-snap-align: center;
  /* transform-style: preserve-3d; */
}

/* .s-carousel__slide:nth-child(even) {
  background-color: #99f;
} */

@media (hover: hover) {
  .s-carousel__slide:last-child .carousel__snapper {
    animation-name: tostart, snap;
  }
}

.s-carousel:hover .carousel__snapper,
.s-carousel:focus-within .carousel__snapper {
  animation-name: none;
}

.s-carousel::before,
.carousel__prev {
  left: -1rem;
}

.s-carousel::after,
.carousel__next {
  right: -1rem;
}
</style>
