<template>
  <SButton @click="isModalOpen = true" label="Abrir modal" />
  <SModal v-model="isModalOpen" header-text="Ejemplo modal" class="w-full" show-close-icon>
    <template #footer>
      <div class="flex justify-end p-4">
        <SButton class="mr-4" emphasis="outline" label="Cancelar" @click.stop="handleCancel">
        </SButton>
        <SButton emphasis="primary" label="Aceptar" />
      </div>
    </template>
  </SModal>
</template>
<script lang="ts" setup>
// # region Componentes
import { SButton, SModal } from '@alegradev/smile-ui-next';
// # endregion

// # region Importaciones
import { ref } from 'vue';
// # endregion

// #region Emits
const emit = defineEmits<{
  (event: 'update:modelValue', data: boolean): void;
}>();
// #endregion

// #region Propiedades computadas

const isModalOpen = ref(false);
// #endregion

// #region Métodos
const handleCancel = () => {
  isModalOpen.value = false;
};
// #endregion
</script>
<style scoped lang="scss">
:deep(.s-modal-title) {
  @apply rounded-2xl #{!important};
}
:deep(.s-modal-footer) {
  @apply rounded-2xl #{!important};
}
</style>
