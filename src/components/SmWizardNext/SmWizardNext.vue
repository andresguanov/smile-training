<template>
  <div :class="className">
    <div :class="`${className}-topbar`">
      <span>Logo</span>
      <span>Steps</span>

      <sm-icon icon="close" color="#0F172A" size="medium" />
    </div>
    <div :class="[`${className}-content`, { 'sm-wizard-next-grid-cols-1': !isMultiRow }]">
      <div :class="`${className}-col-2`">
        <div :class="`${className}-title`">{{ steps[activePage].title }}</div>
        <div :class="`${className}-description`">{{ steps[activePage].description }}</div>
      </div>

      <div
        v-for="(item, i) in steps[activePage].components"
        :key="i"
        :class="{ 'sm-wizard-next-col-2': i > 1 }"
      >
        <component
          :is="item"
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
    steps: Array<{
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

const isMultiRow = computed(() => props.steps[activePage.value].components.length > 1)

const nextPage = () => {
  if (activePage.value < props.steps.length - 1) {
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
    @apply m-auto grid grid-cols-1 px-4 gap-y-2;

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
    @apply text-slate-200 border-t py-4 mt-16 col-start-1;

    @screen md {
      @apply flex justify-end;
    }
  }

  &-col-2 {
    @apply col-span-1;

    @screen md {
      @apply col-span-2;
    }
  }

  &-grid-cols-1 {
    @apply grid-cols-1;
  }

  // &-row-start-2 {
  //   @apply row-start-1;
  // }
}
</style>
