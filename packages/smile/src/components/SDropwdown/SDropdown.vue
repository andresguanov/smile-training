<template>
  <div class="s-dropdown">
    <div class="s-dropdown__wrapper">
      <s-input
        class="s-dropdown__input"
        v-model="textValue"
        :label="label"
        :size="size"
        :hint="hint"
        :leading="leading"
        :placeholder="internalPlaceholder"
        :icon-right="trailingIcon"
        :loading="loading"
        :disabled="disabled"
        :required="required"
        :show-mark="showMark"
        :optional-text="optionalText"
        :error="currentError"
        :readonly="!search"
        @click.stop="toggleOverflow"
      />
    </div>
    <s-overflow-menu
      v-if="open"
      class="s-dropdown__menu"
      :top="menuTopDistance"
      bubbling
      @click-outside="onClickOutside"
    >
      <div v-if="loading">
        <slot name="loading">
          <p>{{ loadingText }}</p>
        </slot>
      </div>
      <div v-else>
        <slot name="beforeOptions" />
        <ul>
          <li v-for="(option, i) in options" :key="i">
            <slot name="item" :index="i" :option="option">
              <s-menu-item
                v-bind="option"
                :title="String(option[textKey])"
                @click="onClickOption(option)"
              >
                <template #leading>
                  <div
                    class="s-dropdown__check"
                    :class="{ multiple, selected: isSelected(option) }"
                  >
                    <sm-icon icon="success-outline" fluid />
                  </div>
                </template>
              </s-menu-item>
            </slot>
          </li>
        </ul>
      </div>
    </s-overflow-menu>
  </div>
</template>

<script setup lang="ts">
import type { IconType, smInputAddon, smMenuOption } from '../../interfaces';
import { useSmileValidate } from '~/composables';

type MenuOption = {
  [key: string]: unknown;
} & smMenuOption;

const props = withDefaults(
  defineProps<{
    modelValue: MenuOption | string | number | Array<string | number>;
    size?: 'small' | 'medium' | 'large';
    hint?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    success?: boolean;
    loading?: boolean;
    loadingText?: string;
    label?: string;
    options?: Array<MenuOption>;
    /**
     * Disponible solo cuando el componente está dentro de SmForm.
     * Permite establecer las validaciones del componente.
     */
    rules?: Array<
      (value: MenuOption | string | number | Array<string | number>) => boolean | string
    >;
    error?: string;
    /**
     * Indica si deseas que modelValue trabaje con objetos
     */
    object?: boolean;
    /**
     * El valor que se mostrará como texto
     * @default text
     */
    textKey?: string;
    /**
     * Clave valor para la opción,
     * si la prop "object" no está activa modelValue usará este identificador para us valor
     * @default code
     */
    valueKey?: string;
    multiple?: boolean;
    id?: string;
    /**
     * Permite activar el evento search así como un campo de búsqueda.
     * No realizar un filtro en local
     */
    search?: boolean;
    /**
     * Permite indicar si el valor puede deseleccionarse.
     * Se ignora cuando prop "multiple" esta activa.
     */
    canDeselect?: boolean;
    leading?: smInputAddon;
    maxHeight?: string;
    /**
     * Al pasar esta prop indicas que deseas mostrar al lado del label la marca
     * que indica si el input es requerido u opcional.
     */
    showMark?: boolean;
    /**
     * Texto que se mostrará cuando `showMark` esta activo y el input no es `required`
     * @default Opcional
     */
    optionalText?: string;
  }>(),
  {
    size: 'medium',
    rules: () => [],
    options: () => [],
    loadingText: 'Cargando contenido...',
    textKey: 'text',
    valueKey: 'code',
    maxHeight: '300px',
    optionalText: 'Opcional',
  }
);
if (!props.options?.length) {
  console.warn('Missing data in %coptions', 'color: red;font-weight: bold;padding: 1px', 'prop.');
}
const emit = defineEmits<{
  (event: 'update:modelValue', value: MenuOption | string | number | Array<string | number>): void;
  (event: 'search', value: string): void;
  (event: 'select', value: MenuOption): void;
  (event: 'open'): void;
}>();
const data = useVModel(props, 'modelValue', emit);
const { validate, validateOnFocusout, currentError } = useSmileValidate<
  MenuOption | string | number | Array<string | number>
>(data, props.rules, toRef(props, 'error'), props.id);

const open = ref(false);
const searchText = ref('');
const menuTopDistance = computed(() => {
  if (currentError.value) return '80%';
  return '100%';
});
const trailingIcon = computed<IconType>(() => (open.value ? 'chevron-up' : 'chevron-down'));
const formattedValue = computed<string>(() => {
  if (!data.value) return '';
  if (props.multiple) {
    return (data.value as Array<string | number>)
      .reduce<Array<string>>((list, element) => {
        return list.concat([getText(element)]);
      }, [])
      .join(', ');
  }
  if (props.object) return getText((data.value as MenuOption)[props.valueKey] as string | number);
  return getText(data.value as string | number);
});
const internalPlaceholder = computed(() =>
  props.search && open.value ? formattedValue.value : props.placeholder
);
const textValue = computed({
  get: () => {
    if (props.search && open.value) return searchText.value;
    return formattedValue.value;
  },
  set: value => {
    searchText.value = value;
    emit('search', value);
  },
});

const toggleOverflow = () => {
  if (props.disabled) return;
  if (!open.value) emit('open');
  open.value = !open.value;
};
const getText = (value: string | number) => {
  const selectedValue = props.options.find(op => op[props.valueKey] === value);
  if (selectedValue) return String(selectedValue[props.textKey]);
  return '';
};
const isSelected = (value: MenuOption) => {
  const realValue = value[props.valueKey] as string | number;
  if (props.multiple) {
    return (data.value as Array<string | number>)?.includes(realValue);
  }
  if (props.object) return (data.value as MenuOption)[props.valueKey] === realValue;
  return data.value === realValue;
};
const onClickOption = (option: MenuOption) => {
  emit('select', { option });
  const value = option[props.valueKey];
  if (typeof value !== 'number' && typeof value !== 'string') {
    throw new Error(
      `This component does not yet support the provided parameter type ${typeof value}. Please check the documentation for the expected parameter type.`
    );
  }
  searchText.value = '';
  if (props.multiple) {
    const opIndex = (data.value as Array<string | number>).findIndex(el => {
      if (props.object) {
        console.warn('Prop multiple not support prop object');
      }
      return el === value;
    });
    if (opIndex >= 0) {
      (data.value as Array<string | number>).splice(opIndex, 1);
      return;
    }
    (data.value as Array<string | number>).push(value);
    return;
  }
  if (
    props.canDeselect &&
    (props.object ? (data.value as MenuOption)[props.valueKey] : data.value) === value
  ) {
    data.value = '';
  } else {
    data.value = props.object ? option : value;
  }
  open.value = false;
};
const onClickOutside = () => {
  if (validateOnFocusout.value) {
    validate();
  }
  open.value = false;
};

if (props.multiple && !data.value) {
  data.value = [];
}
defineExpose({
  toggleOverflow,
});
</script>

<style scoped lang="scss" src="./SDropdown.scss"></style>
