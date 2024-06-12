<template>
  <SForm validate-on="submit" ref="form">
    <SFileUpload
      v-model:files="files"
      :rules
      description="Debe ser una foto tuya, de frente y con el rostro descubierto"
      label="Sube tu foto de identificación"
      :multiple="true"
      accept=".*"
      mark-type="required"
      file-icon="paperclip"
    />
    <s-button type="submit" class="mt-10" @click="validate()">Submit</s-button>
  </SForm>
</template>

<script lang="ts" setup>
import { SButton } from '@alegradev/smile-ui-next';
import { SFileUpload, SForm } from '@alegradev/smile-ui-next';
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';

import type { FileItem } from '@alegradev/smile-ui-next';
const files = ref<FileItem[]>([]);
const form = ref<
  ComponentPublicInstance & {
    validateForm: () => {
      valid: boolean;
      results: {
        id: string;
        errorMessages: string[];
      }[];
    };
  }
>();
const fileExtension = (model: FileItem[]) => {
  const errors = <string[]>[];
  for (const file of model) {
    if (file.name.endsWith('.png') || file.name.endsWith('.jpeg') || file.name.endsWith('.jpg')) {
      continue;
    }
    file.status = 'error';
    file.description =
      'El archivo debe tener una extensión válida (.png, .jpg o .jpeg) y pesar menos de 500mb';
    errors.push(file.name);
  }
  return errors.length ? 'El tipo de archivo seleccionado no es válido' : true;
};
const notEmpty = (model: FileItem[]) => {
  if (model.length === 0) return 'El campo es requerido';
  return true;
};
const rules = [fileExtension, notEmpty];

const validate = () => {
  if (form.value) {
    console.log(form.value.validateForm());
  }
};
</script>
