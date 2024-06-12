<template>
  <div class="s-file-upload">
    <input
      ref="inputElement"
      :id="id"
      :accept="accept"
      :multiple="multiple"
      type="file"
      class="s-file-upload__input"
      @change="onFilesChange"
      :required
    />
    <template v-if="!useDropZone">
      <label :for="id" class="s-file-upload__label" :class="{ required: markType === 'required' }"
        >{{ label }}<span v-if="markType" class="s-input__mark">{{ textMark }}</span>
      </label>
      <p v-if="hasError && files.length == 0" class="s-file-upload__description__error">
        {{ currentError }}
      </p>
      <p v-else-if="description" class="s-file-upload__description">{{ description }}</p>
      <s-button
        :label="buttonLabel"
        icon-left="import"
        emphasis="outline"
        size="small"
        class="s-file-upload__button"
        @click="onClickButton"
      />
    </template>
    <s-drop-zone
      v-else
      :title="label"
      :description="description"
      :button-label="buttonLabel"
      @files-drop="addFiles"
      @button-click="onClickButton"
    />
    <div class="s-file-upload__files">
      <div v-for="(file, i) in internalFiles" class="s-file-upload__item" :class="file.status">
        <div class="s-file-upload__item__icon">
          <sm-icon :icon="getFileIcon(file.status)" fluid />
        </div>
        <div class="s-file-upload__item__content">
          <p>{{ file.name }}</p>
          <span>{{
            file.status === 'error'
              ? `${fileStatusText[file.status]}: ${file.description}`
              : fileStatusText[file.status] || file.description
          }}</span>
        </div>
        <s-button
          only-icon="close"
          emphasis="text"
          type="ghost"
          size="small"
          class="s-file-upload__item__close"
          @click="removeFile(i)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FileItem, IconType } from '../../interfaces';
import { useSmileValidate } from '~/composables';

const props = withDefaults(
  defineProps<{
    files: FileItem[];
    label?: string;
    description?: string;
    id?: string;
    multiple?: boolean;
    buttonLabel?: string;
    accept?: string;
    fileIcon?: IconType;
    /**
     * Tamaño máximo aceptado, en caso de que el archivo elegido supere el máximo
     * establecido, automáticamente se incluirá el estado de `error`.
     */
    maxFileSize?: number;
    fileStatusText?: {
      success: string;
      loading: string;
      error: string;
      default?: string;
    };
    useDropZone?: boolean;
    rules?: Array<(value: FileItem[]) => boolean | string>;
    error?: string;
    required?: boolean;
    markType?: 'required' | 'optional';
    optionalText?: string;
  }>(),
  {
    maxFileSize: 5,
    buttonLabel: 'Subir archivo',
    accept: 'image/*',
    fileIcon: 'pin',
    fileStatusText: () => ({
      error: 'Error',
      loading: 'Cargando...',
      success: 'Cargado',
      default: '',
    }),
    rules: () => [],
    optionalText: 'Opcional',
  }
);
const emit = defineEmits<{
  (event: 'update:files', value: FileItem[]): void;
  (event: 'maxSizeError', value: number): void;
  (event: 'cancelSelection'): void;
}>();
const internalFiles = useVModel(props, 'files', emit);

const K_UNIT = 1024;
const SIZES = ['B', 'KB', 'MB', 'GB'];
const inputElement = ref<HTMLInputElement | null>(null);

const onClickButton = () => inputElement.value?.click();
const getFileIcon = (status: 'loading' | 'success' | 'error' | 'default'): IconType => {
  switch (status) {
    case 'error':
      return 'info-outline';
    case 'loading':
      return 'loading';
    case 'success':
      return 'success';
    default:
      return props.fileIcon;
  }
};
const removeFile = (index: number) => {
  internalFiles.value.splice(index, 1);
  validate();
};
const onFilesChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target || !target.files?.length) {
    emit('cancelSelection');
    internalFiles.value = [];
    nextTick(() => {
      if (validateOnFocusout.value) validate();
    });
    return;
  }
  addFiles(target.files);
};
const addFiles = (files: File[] | FileList) => {
  if (!props.multiple) {
    internalFiles.value = [convertToFileItem(files[0])];
    return;
  }
  const selectedFiles: FileItem[] = [];
  for (let index = 0; index < files.length; index++) {
    selectedFiles.push(convertToFileItem(files[index]));
  }
  internalFiles.value = [...selectedFiles];
  // target.files.forEach(selectedFile => {
  //   const tempFile = target.files[0];
  //   if (tempFile.size > props.maxFileSize * 1000 * 1000) {
  //     emit('maxSizeError', tempFile.size);
  //   }
  // });
  nextTick(() => {
    if (validateOnFocusout.value) validate();
  });
};
const convertToFileItem = (file: File): FileItem => {
  return {
    file,
    name: file.name,
    description: formatSizeUnits(file.size),
    status: 'default',
  };
};
const formatSizeUnits = (bytes: number, precision = 0) => {
  const sizeIndex = Math.floor(Math.log(bytes) / Math.log(K_UNIT));
  const formatedSize = bytes / Math.pow(K_UNIT, sizeIndex);
  return formatedSize.toFixed(precision) + ' ' + SIZES[sizeIndex];
};

const { rules, validate, currentError, hasError, validateOnFocusout } = useSmileValidate<
  FileItem[]
>(internalFiles, toRef(props, 'error'), props.id);

const textMark = computed(() => (props.markType === 'required' ? '*' : `(${props.optionalText})`));

watch(
  () => props.rules,
  () => {
    rules.value = props.rules ?? [];
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped src="./SFileUpload.scss"></style>
