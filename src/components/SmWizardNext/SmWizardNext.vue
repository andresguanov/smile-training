<template>
  <div class="sm-wzd-next">
    <div class="sm-wzd-next-topbar">
      <div class="sm-wzd-next-logo"></div>

      <div class="sm-wzd-next-stepper">
        <sm-stepper v-model="activePage" :steps="stepsLabels"></sm-stepper>
      </div>

      <sm-icon icon="close" color="#0F172A" size="medium" />
    </div>
    <div :class="[`sm-wzd-next-content`, { 'sm-wizard-next-grid-cols-1': !isMultiRow }]">
      <div class="sm-wzd-next-col-2">
        <div class="sm-wzd-next-title">{{ steps[activePage].title }}</div>
        <div class="sm-wzd-next-description">{{ steps[activePage].description }}</div>
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

      <div class="sm-wzd-next-footer">
        <slot v-if="slots.footer" name="footer"></slot>

        <div v-else class="wd-footer-btn">
          <sm-button type="primary" @click="nextPage">Siguiente</sm-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DefineComponent } from 'vue'
import { useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    steps: Array<{
      title: string
      description: string
      label: string
      components: DefineComponent<{}, {}, any>[]
    }>
    modelValue: number
  }>(),
  {}
)

const emits = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()

const slots = useSlots()

const activePage = useVModel(props, 'modelValue', emits)

const isMultiRow = computed(() => props.steps[activePage.value].components.length > 1)

const nextPage = () => activePage.value < props.steps.length - 1 && activePage.value++

const previousPage = () => activePage.value > 0 && activePage.value--

const setPage = (value: number) => (activePage.value = value)

const stepsLabels = props.steps.map(el => el.label)
</script>

<style scoped lang="scss" src="./SmWizard.scss"></style>
