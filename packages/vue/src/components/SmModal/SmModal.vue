<template>
  <span>
    <div v-if="data" class="sm-modal-area">
      <sm-modal-content>
        <sm-modal-header @close="close">
          <slot name="header" />
        </sm-modal-header>
        <sm-modal-body>
          <slot name="body" />
        </sm-modal-body>
        <sm-modal-footer>
          <slot name="footer" />
        </sm-modal-footer>
      </sm-modal-content>
    </div>
  </span>
</template>

<script lang="ts" setup>
// TODO: sustituir por useVModel para tener la prop show reactiva
import { SmModalBody, SmModalContent, SmModalHeader, SmModalFooter } from '../index'

const props = defineProps<{ modelValue: boolean }>()

const emit = defineEmits(['update:modelValue'])

const data = useVModel(props, 'modelValue', emit)

const close = () => {
  data.value = false
}
</script>

<style lang="scss" scoped>
@import './SmModal.scss';
</style>
