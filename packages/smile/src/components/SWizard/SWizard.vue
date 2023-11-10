<template>
  <div class="sm-wzd-next" :class="{ 'sm-wzd-next-on-component': isOnComponent }">
    <div class="sm-wzd-next-topbar">
      <div class="sm-wzd-next-logo" />
      <div class="sm-wzd-next-stepper">
        <s-stepper v-model="activePage" :steps="stepsLabels" />
      </div>
      <div class="sm-wzd-next-menu">
        <s-user-menu
          v-if="menu"
          v-bind="menu"
          @logout="emits('menu:logout')"
          @avatar-click="emits('menu:avatarClick')"
          @option-click="emits('menu:optionClick', $event)"
        />
        <div class="sm-wzd-next-close">
          <s-button only-icon="close" emphasis="text" type="ghost" @click="closeWizard" />
        </div>
      </div>
    </div>
    <div class="sm-wzd-next-content">
      <div :class="['sm-wzd-next-body', { 'sm-wzd-next-grid-cols-1': !isMultiRow }]">
        <div class="sm-wzd-back" v-if="showBackButton">
          <s-button
            class="sm-wzd-back-button"
            icon-left="arrow-alt-left"
            emphasis="text"
            :label="backText"
            :disabled="disabledBack"
            @click="previousPage"
          />
        </div>
        <div class="sm-wzd-next-col-2">
          <div class="sm-wzd-next-title">{{ steps[activePage].title }}</div>
          <div class="sm-wzd-next-description">{{ steps[activePage].description }}</div>
        </div>
        <div
          v-for="(item, i) in steps[activePage].components"
          :key="i"
          :class="{ 'sm-wzd-next-col-2': i > 1 }"
        >
          <component
            :is="item"
            @previous-page="previousPage"
            @next-page="nextPage"
            @set-page="setPage"
          />
        </div>
        <div class="sm-wzd-next-footer">
          <slot v-if="slots.footer" name="footer"></slot>
          <div v-else class="wd-footer-btn">
            <s-button :label="continueText" :disabled="disabledNext" @click="nextPage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { smStepWizard, sUserMenu } from '../../interfaces/sm-wizard.interface';
import { useSlots } from 'vue';

const props = withDefaults(
  defineProps<{
    steps: smStepWizard[];
    modelValue: number;
    hasBackButton?: boolean;
    disabledBack?: boolean;
    disabledNext?: boolean;
    backText?: string;
    continueText?: string;
    isOnComponent?: boolean;
    menu?: sUserMenu;
  }>(),
  { backText: 'Atrás', continueText: 'Continuar' }
);

const emits = defineEmits<{
  (event: 'update:modelValue', value: number): void;
  (event: 'close'): void;
  (event: 'clickMenu'): void;
  (event: 'menu:logout'): void;
  (event: 'menu:avatarClick'): void;
  (event: 'menu:optionClick', value: string): void;
}>();

const slots = useSlots();

const activePage = useVModel(props, 'modelValue', emits);

const isMultiRow = computed(() => props.steps[activePage.value].components.length > 1);

const stepsLabels = computed(() => props.steps.map(el => el.label));

const showBackButton = computed(() => props.hasBackButton && activePage.value > 0);

const nextPage = () => activePage.value < props.steps.length - 1 && activePage.value++;

const previousPage = () => activePage.value > 0 && activePage.value--;

const setPage = (value: number) => (activePage.value = value);

const closeWizard = () => emits('close');
</script>

<style scoped lang="scss" src="./SmWizard.scss"></style>
