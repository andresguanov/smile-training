<template>
  <div
    v-if="!hasTheComponentErrors"
    class="s-dropdown"
    :class="[{ readonly, magic }]"
    ref="dropdownContainer"
  >
    <div class="s-dropdown__wrapper">
      <s-input
        :autocompleteText="autocompleteText"
        :magic="magic"
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
        :mark-type="markType"
        :optional-text="optionalText"
        :error="currentError"
        :readonly="readonly || !search"
        @click.stop="toggleOverflow(search)"
        @click-icon-right.stop="toggleOverflow()"
      >
        <template v-if="!magic" #leading>
          <slot name="leading" />
        </template>
      </s-input>
    </div>
    <s-overflow-menu v-if="open" class="s-dropdown__menu" :top="menuTopDistance">
      <div v-if="loading && !hideLoadingText">
        <slot name="loading">
          <p>{{ loadingText }}</p>
        </slot>
      </div>
      <div v-else>
        <slot name="beforeOptions" />
        <ul>
          <li class="s-appended-item">
            <slot name="append-item" />
          </li>
          <li
            ref="itemsRef"
            v-for="(option, i) in loadedList"
            :key="i"
            :style="`margin-left: ${0.5 * (option.level ?? 0)}rem;`"
            @click="onClickOption(option)"
          >
            <slot name="item" :index="i" :option="option">
              <s-menu-item
                v-bind="option"
                :title="String(option[textKey])"
                :description="option.description ?? ''"
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
          <li class="s-prepended-item">
            <slot name="prepend-item" />
          </li>
        </ul>
        <slot name="afterOptions" />
      </div>
    </s-overflow-menu>
  </div>
</template>

<script setup lang="ts">
// Composables
import { useSmileValidate, useIntersectionObserver } from '~/composables';
// import SmLoader from '~/components/SLoader/SLoader.vue';

// Types
import type { MenuOption, SDropdownProps } from '~/types';
import type { IconType } from '../../interfaces';

// Emits
const emit = defineEmits<{
  (event: 'update:modelValue', value?: MenuOption | string | number | Array<string | number>): void;
  (event: 'search', value: string): void;
  (event: 'select', value: MenuOption): void;
  (event: 'open'): void;
}>();

// Props
const props = withDefaults(defineProps<SDropdownProps>(), {
  size: 'medium',
  rules: () => [],
  options: () => [],
  loadingText: 'Cargando contenido...',
  textKey: 'text',
  valueKey: 'code',
  maxHeight: '300px',
  optionalText: 'Opcional',
  magic: false,
  autocompleteText: 'Autocompletando...',
});

const data = useVModel(props, 'modelValue', emit);

// Propiedades desde store/composables
const { validate, validateOnFocusout, currentError, rules } = useSmileValidate<
  MenuOption | string | number | Array<string | number> | undefined
>(data, toRef(props, 'error'), props.id);

// Propiedades reactivass
const menuTopDistance = computed(() => {
  if (currentError.value) return '80%';
  return '100%';
});

const hasTheComponentErrors = ref<boolean>(false);

const open = ref(false);

const searchText = ref('');

const dropdownContainer = ref<HTMLDivElement | null>(null);

// Propiedades computadas
const formattedValue = computed<string>(() => {
  if (!data.value) return '';
  if (props.multiple) {
    return (data.value as Array<string | number>)
      .reduce<Array<string>>((list, element) => {
        return list.concat([getText(element)]);
      }, [])
      .join(', ');
  }
  if (props.object) {
    return getText((data.value as MenuOption)[props.valueKey]);
  }
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

const trailingIcon = computed<IconType>(() => (open.value ? 'chevron-up' : 'chevron-down'));

// Intersection Observer
const differenceStep = 10;

const { loadedList, itemsRef, setTotalList, startObserving, setLoadedCount } =
  useIntersectionObserver(differenceStep);

watch([() => props.options, open], async ([newOptions, newOpenVal]) => {
  // Setea la lista total de opciones
  setTotalList(newOptions);
  // Si se abre el menú y hay opciones, se inicia la observación
  if (newOpenVal && newOptions.length) {
    if (differenceStep > newOptions.length) return;
    startObserving();
  } else {
    // Si se cierra el menú, se resetea la lista cargada
    setLoadedCount(differenceStep);
  }
});

// Métodos
const areInvalidProps = () => {
  try {
    validateProps(props);
    return false;
  } catch (e) {
    console.error(e);
    return true;
  }
};

const getText = (value: unknown) => {
  const selectedValue = props.options.find(op => isEqual(op[props.valueKey], value));
  if (selectedValue) return String(selectedValue[props.textKey]);
  return '';
};

const isSelected = (value: MenuOption) => {
  const realValue = value[props.valueKey] as string | number;
  if (props.multiple) {
    return (data.value as Array<string | number>)?.includes(realValue);
  }
  if (props.object) {
    if (!data?.value || !(props.valueKey in (data.value as MenuOption))) {
      return false;
    }
    return isEqual((data.value as MenuOption)[props.valueKey], realValue);
  }
  return data.value === realValue;
};

const onClickOption = (option: MenuOption) => {
  if (option.disabled) {
    return;
  }
  emit('select', { option });
  const value = option[props.valueKey] as string | number;
  if (!props.object && typeof value !== 'number' && typeof value !== 'string') {
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
    isEqual(props.object ? (data.value as MenuOption)?.[props.valueKey] : data.value, value)
  ) {
    data.value = void 0;
  } else {
    data.value = props.object ? option : value;
  }
  open.value = false;
};

onClickOutside(dropdownContainer, () => {
  if (validateOnFocusout.value) {
    validate();
  }
  open.value = false;
});

const validateProps = (props: SDropdownProps) => {
  const isOptionsArray = Array.isArray(props.options);
  const isModelValueAnArray = Array.isArray(props.modelValue);
  if (!isOptionsArray) {
    throw new Error(`The prop options must be an array`);
  }
  if (props.multiple && !isModelValueAnArray) {
    throw new Error(`When the prop multiple is true, the model value must be an array`);
  }
};

const toggleOverflow = (search?: boolean) => {
  if (props.disabled || props.readonly) return;
  if (!open.value) emit('open');
  open.value = search || !open.value;
};

const isEqual = (a: unknown, b: unknown) => {
  /**
   * Si los valores son objetos, se comparan como strings con JSON.stringify
   * para evitar problemas con referencias
   *
   * Consideraciones:
   * - Mantener el mismo orden de propiedades en los objetos a comparar
   * - Los valores de las propiedades deben ser primitivos puesto que JSON no puede
   *   representar todos los tipos de datos (undefined, function, symbol, etc.)
   * - Por esa razón, también los objetos a comparar deben ser de tipo Object o Array
   */
  if (a !== null && b !== null && typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
};

// Watchers
watch(
  () => props,
  () => {
    hasTheComponentErrors.value = areInvalidProps();
  },
  { deep: true }
);

watch(
  () => props.rules,
  () => {
    rules.value = props.rules ?? [];
  },
  { immediate: true }
);

// Métodos del ciclo de vida Vue
onMounted(() => {
  hasTheComponentErrors.value = areInvalidProps();
});

// Exposes
defineExpose({
  toggleOverflow,
  itemsRef,
});
</script>

<style scoped lang="scss" src="./SDropdown.scss"></style>
