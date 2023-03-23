<template>
  <div v-if="!hasRenderError" class="sm-input-container">
    <sm-label v-if="label" v-bind="$props" :error="hasError" @click="searchField?.focus()" />
    <div :class="[sizeClass, { 'sm-select-search': search }, { 'sm-select-error': hasError }]">
      <input
        ref="searchField"
        v-model="inputText"
        :readonly="!search"
        :disabled="disabled"
        :placeholder="inputText || placeholder"
        :class="{ 'sm-input-disabled': disabled }"
        v-sm-simple-uid
        @focusin="show = true"
        @focusout="hide"
      />
      <SmProgressBar v-if="loading" class="sm-select-progress-bar" />
      <ul :class="['sm-select-options', { 'sm-select-options-open': show }]">
        <li
          v-for="(option, index) in optionsAsStringList"
          :class="[
            'sm-select-option',
            {
              'sm-select-option-disabled': isItemDisabled(index),
              'sm-select-option-disabled-padding': isItemDisabled(index) && multiple,
              'sm-select-option-selected': elementIsSelected(index),
            },
          ]"
          :key="index"
          @click="select(index)"
          @mousedown="selecting"
        >
          <slot name="option" :option="localOptions[index]">
            <div class="sm-select-checkbox" v-if="multiple && !isItemDisabled(index)"></div>
            <span>{{ option }}</span>
          </slot>
        </li>
        <li @mousedown="selecting">
          <slot name="lastItem"></slot>
        </li>
      </ul>
    </div>
    <sm-hint v-if="hasError && searchField && errorListContent" :to="`#${searchField.id}`">
      <template #content>
        <sm-error-list :error-messages="(errorListContent as Array<string>)" />
      </template>
    </sm-hint>
  </div>
</template>

<script lang="ts" setup>
// Components
import { SmProgressBar } from '~/components/index';

// Importaciones
import { useValidate } from '../../composables';
import { smSimpleUid as vSmSimpleUid } from '../../directives';
import { ref, watch } from 'vue';

// Interfaces y tipos
type Item = {
  disabled?: boolean;
  text: string;
  value: any;
  selected?: boolean;
  [index: string]: any;
};

type Props = {
  options: SelectItems;
  label?: string;
  modelValue?: any | Item | number | string;
  multiple?: boolean;
  search?: boolean;
  error?: boolean;
  size?: 'small' | 'medium' | 'large';
  required?: boolean;
  errorMessages?: Array<string>;
  disabled?: boolean;
  rules?: Array<(value: any) => boolean | string>;
  placeholder?: string;
  loading?: boolean;
};

type SelectItems = Array<Item | string | number>;

// Emits
const emit = defineEmits(['update:modelValue', 'filter']);

// Props
const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const selectedItem = ref<any>();

// Propiedades de composables
const { validate, hasError, errorListContent, validateOnFocusout } = useValidate(
  selectedItem,
  props.rules || [],
  props.error,
  props.errorMessages
);

// Propiedades reactivas
const searchTerm = ref('');

const searchField = ref<HTMLInputElement | null>(null);

const selectedIndex = ref<Set<number>>(new Set());

const show = ref(false);

const inputText = ref('');

const hasRenderError = ref<boolean>(false);

// Propiedades computadas
const isValidInputText = computed(() => {
  return !!inputText.value;
});

const localOptions = computed(() => {
  if (optionsType.value == 'undefined') {
    return [];
  }
  if (optionsType.value == 'object') {
    return !props.search
      ? props.options
      : props.options.filter(option =>
          String((option as Item).text)
            .toUpperCase()
            .includes(inputText.value.toUpperCase())
        );
  }
  const formattedOptions = props.options.map(value => {
    return { text: value, value };
  });
  return !props.search
    ? formattedOptions
    : formattedOptions.filter(option => String(option.value).includes(inputText.value));
});

const optionsAsStringList = computed(() => {
  if (!localOptions.value) {
    return [];
  }
  return (localOptions.value as Item[]).map(option => option.text);
});

const sizeClass = computed(() => {
  let size = props.size || 'medium';
  return `sm-select sm-select-${size} sm-text-${size}`;
});

const optionsType = computed(() => {
  hasRenderError.value = false;
  if (props.options.every(option => typeof option === 'object')) {
    return 'object';
  }
  if (props.options.every(option => typeof option === 'number')) {
    return 'number';
  }
  if (props.options.every(option => typeof option === 'string')) {
    return 'string';
  }
  console.warn('[Smile SmSelect]: The options prop type is inconsistent');
  hasRenderError.value = true;
  return 'undefined';
});

/**
 * semaforo para detener el cierre de opciones cuando se salga el focus del input principal
 */
let selected = false;

// Metodos
const addToIndexes = (index: number) => {
  if (!props.multiple) {
    selectedIndex.value.clear();
    selectedIndex.value.add(index);
  } else {
    if (!selectedIndex.value.has(index)) {
      selectedIndex.value.add(index);
    } else {
      selectedIndex.value.delete(index);
    }
  }
};

const addToSelectedItem = (index: number) => {
  const itemSet = selectedItem.value as Set<number | string | Item>;
  if (!itemSet.has((localOptions.value[index] as Item).value)) {
    itemSet.add((localOptions.value[index] as Item).value);
  } else {
    itemSet.delete((localOptions.value[index] as Item).value);
  }
  formatInputText();
};

const addSelectedItem = (index: number) => {
  addToIndexes(index);
  addToSelectedItem(index);
};

const checkModelValue = () => {
  if (props.multiple) {
    if (!Array.isArray(props.modelValue)) {
      console.warn(
        '[Smile SmSelect]: When the multiple prop is setted, the model value must be array'
      );
      hasRenderError.value = true;
    } else {
      hasRenderError.value = false;
    }
  }
};

const compare = (a: string, b: string) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

const elementIsSelected = (index: number) => {
  return selectedIndex.value.has(index);
};

const emitNewValue = (newVal?: Set<Item | string | number> | Item | string | number) => {
  if (!newVal) {
    !props.multiple ? emit('update:modelValue', undefined) : emit('update:modelValue', []);
    return;
  }
  if (!props.multiple) {
    emit('update:modelValue', newVal);
  } else {
    const modelArray = Array.from(newVal as Set<Item | number | string>);
    emit('update:modelValue', modelArray);
  }
  formatInputText();
};

const findItem = () => {
  let index: number;
  index = localOptions.value.findIndex(option => (option as Item).value === props.modelValue);
  if (index != -1) {
    selectedItem.value = (localOptions.value[index] as Item).value;
    addToIndexes(index);
    emitNewValue(selectedItem.value);
  } else {
    emitNewValue();
  }
};

const findItems = () => {
  for (let item of props.modelValue) {
    let index: number;
    index = localOptions.value.findIndex(option => (option as Item).value === item);
    if (index != -1 && !isItemDisabled(index)) {
      addSelectedItem(index);
    }
  }
  if (selectedIndex.value.size == 0) {
    emitNewValue();
  } else {
    emitNewValue(selectedItem.value);
  }
};

const formatInputText = () => {
  if (!props.multiple) {
    const array = Array.from(selectedIndex.value);
    if (array.length > 0) {
      inputText.value = (localOptions.value[array[0]] as Item)?.text ?? '';
    }
  } else {
    let textsList: string[] = [];
    selectedIndex.value.forEach(index => {
      if (localOptions.value[index]) {
        textsList.push((localOptions.value[index] as Item).text);
      }
    });
    inputText.value = textsList.sort(compare).join(',');
  }
};

const hide = () => {
  if (!selected) {
    searchTerm.value = '';
    show.value = false;
    if (validateOnFocusout.value) {
      validate();
    }
  } else if (props.multiple) {
    searchField.value?.focus();
  }
  selected = false;
};

const initSelect = async () => {
  if (!hasRenderError.value) {
    if (!props.multiple) {
      findItem();
    } else {
      selectedItem.value ??= new Set();
      findItems();
    }
  }
};

const isItemDisabled = (index: number) => {
  if (optionsType.value == 'object') {
    return Boolean((localOptions.value[index] as Item).disabled);
  }
  return false;
};

const select = (index: number) => {
  if (isItemDisabled(index)) {
    return;
  }
  if (!props.multiple) {
    addToIndexes(index);
    show.value = false;
    if (optionsType.value == 'object') {
      selectedItem.value = (localOptions.value as Item[])[index].value;
      //inputText.value = (localOptions.value as Item[])[index].text;
    } else {
      selectedItem.value = localOptions.value[index];
      //inputText.value = localOptions.value[index].toString();
    }
  } else {
    addSelectedItem(index);
  }
  emitNewValue(selectedItem.value);
};

const selecting = () => {
  selected = true;
};

// Métodos ciclo de vida
onBeforeMount(() => {
  checkModelValue();
});

// Watcher
watch(
  () => props.multiple,
  newVal => {
    if (newVal) {
      checkModelValue();
      if (!selectedItem.value) {
        selectedItem.value = new Set();
      }
    } else {
      selectedItem.value = undefined;
    }
  }
);

watch(
  () => inputText.value,
  () => {
    if (props.search) {
      if (isValidInputText.value) {
        emit('filter', inputText.value);
      } else {
        selectedIndex.value.clear();
        if (props.multiple) {
          (selectedItem.value as Set<Item | number | string>).clear();
        } else {
          selectedItem.value = undefined;
        }
        emitNewValue();
      }
    }
  }
);

watch(
  () => props.modelValue,
  () => {
    initSelect();
  },
  { immediate: true }
);

// Expose
defineExpose({ validate });
</script>

<style lang="scss" scoped>
@import './SmSelect.scss';
</style>
