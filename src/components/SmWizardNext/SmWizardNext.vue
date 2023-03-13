<template>
  <div :class="className">
    <div :class="`${className}-topbar`">
      <span>Logo</span>
      <span>Steps</span>

      <sm-icon icon="close" color="#0F172A" size="medium" />
    </div>
    <div :class="`${className}-content`">
      <div>
        <div :class="`${className}-title`">{{ pages[activePage].title }}</div>
        <div :class="`${className}-description`">{{ pages[activePage].description }}</div>

        <component
          v-if="pages[activePage].components[0]"
          :is="pages[activePage].components[0]"
          @previusPage="previousPage"
          @next-page="nextPage"
          @set-page="setPage"
        />
      </div>

      <div>
        <component
          v-if="isMultiRow"
          :is="pages[activePage].components[1]"
          @previusPage="previousPage"
          @next-page="nextPage"
          @set-page="setPage"
        />
      </div>

      <div :class="`${className}-footer`">
        <sm-button type="primary" @click="nextPage">Siguiente</sm-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DefineComponent } from 'vue'
const className = 'sm-wizard-next'

const props = withDefaults(
  defineProps<{
    pages: Array<{
      title: string
      description: string
      components: DefineComponent<{}, {}, any>[]
    }>
    modelValue: number
  }>(),
  {}
)

const emits = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()

const activePage = useVModel(props, 'modelValue', emits)

const isMultiRow = computed(() => props.pages[activePage.value].components.length > 1)

const nextPage = () => {
  if (activePage.value < props.pages.length - 1) {
    activePage.value++
  }
}
const previousPage = () => {
  if (activePage.value > 0) {
    activePage.value--
  }
}

const setPage = (value: number) => (activePage.value = value)
</script>

<style scoped lang="scss">
.sm-wizard-next {
  @apply w-full space-y-16;

  &-topbar {
    @apply h-14 bg-slate-100 px-20 flex justify-between items-center;
  }

  &-content {
    @apply m-auto grid grid-cols-1 px-4;

    @screen md {
      @apply grid-cols-2 max-w-[738px] px-2;
    }

    @screen lg {
      @apply grid-cols-2 max-w-[1120px];
    }
  }

  &-title {
    @apply text-slate-900 font-semibold text-3xl;
  }

  &-description {
    @apply my-2 text-slate-700 text-sm font-normal;
  }

  &-grid {
    @apply grid grid-cols-2;
  }

  &-footer {
    @apply text-slate-200 border-t py-4 mt-16;

    @screen md {
      @apply flex justify-end;
    }
  }
}
</style>
