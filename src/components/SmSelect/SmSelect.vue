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
        @beforeinput="filter"
      />
      <ul :class="['sm-select-options', { 'sm-select-options-open': show }]">
        <li
          v-for="(option, index) in filterList(searchTerm, formattedOptions)"
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
          <slot name="option" :option="options[index]">
            <div class="sm-select-checkbox" v-if="multiple && !isItemDisabled(index)"></div>
            <span>{{ option }}</span>
          </slot>
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
// TODO: agregar opcion de loading
import { useValidate } from '../../composables'
import { smSimpleUid as vSmSimpleUid } from '../../directives'
import { ref, watch } from 'vue'

// Interfaces y tipos
type Item = {
  disabled?: boolean
  text: string
  value: any
  selected?: boolean
  [index: string]: any
}

type Props = {
  options: SelectItems
  label?: string
  modelValue?: any | Item | number | string
  multiple?: boolean
  search?: boolean
  error?: boolean
  size?: 'small' | 'medium' | 'large'
  required?: boolean
  errorMessages?: Array<string>
  disabled?: boolean
  rules?: Array<(value: any) => boolean | string>
  placeholder?: string
}

type SelectItems = Array<Item | string | number>

// Emits
const emit = defineEmits(['update:modelValue'])

// Props
const props = defineProps<Props>()

// Declaraciones necesarias para flujo
const data = computed({
  get: () => props.modelValue,
  set: value => {
    if (!props.multiple) {
      show.value = false
    }
    emit('update:modelValue', value)
  },
})

const selectedItem = ref<any>()

// Propiedades de composables
const { validate, hasError, errorListContent, validateOnFocusout } = useValidate(
  selectedItem,
  props.rules || [],
  props.error,
  props.errorMessages
)

// Propiedades reactivas
const searchTerm = ref('')

const searchField = ref<HTMLInputElement | null>(null)

const selectedIndex = ref<Set<number>>(new Set())

const show = ref(false)

const inputText = ref('')

const hasRenderError = ref<boolean>(false)

// Propiedades computadas

const sizeClass = computed(() => {
  let size = props.size || 'medium'
  return `sm-select sm-select-${size} sm-text-${size}`
})

const optionsType = computed(() => {
  hasRenderError.value = false
  if (props.options.every(option => typeof option === 'object')) {
    return 'object'
  }
  if (props.options.every(option => typeof option === 'number')) {
    return 'number'
  }
  if (props.options.every(option => typeof option === 'string')) {
    return 'string'
  }
  console.warn('[Smile SmSelect]: The options prop type is inconsistent')
  hasRenderError.value = true
  return 'undefined'
})

/**
 * semaforo para detener el cierre de opciones cuando se salga el focus del input principal
 */
let selected = false

// Metodos
const addToIndexes = (index: number) => {
  if (!props.multiple) {
    selectedIndex.value.clear()
    selectedIndex.value.add(index)
  } else {
    if (!selectedIndex.value.has(index)) {
      selectedIndex.value.add(index)
    } else {
      selectedIndex.value.delete(index)
    }
  }
}

const addToSelectedItem = (index: number) => {
  const itemSet = selectedItem.value as Set<number | string | Item>

  if (optionsType.value == 'object') {
    if (!itemSet.has((props.options[index] as Item).value)) {
      itemSet.add((props.options[index] as Item).value)
    } else {
      itemSet.delete((props.options[index] as Item).value)
    }
  } else {
    if (!itemSet.has(props.options[index])) {
      itemSet.add(props.options[index])
    } else {
      itemSet.delete(props.options[index])
    }
  }
  formatInputText()
}

const addSelectedItem = (index: number) => {
  addToIndexes(index)
  addToSelectedItem(index)
}

const checkModelValue = () => {
  if (props.multiple) {
    if (!Array.isArray(props.modelValue)) {
      console.warn(
        '[Smile SmSelect]: When the multiple prop is setted, the model value must be array'
      )
      hasRenderError.value = true
    } else {
      hasRenderError.value = false
    }
  }
}

const compare = (a: string, b: string) => {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

const elementIsSelected = (index: number) => {
  return selectedIndex.value.has(index)
}

const emitNewValue = (newVal: Set<Item | string | number> | Item | string | number | undefined) => {
  if (newVal === undefined) {
    emit('update:modelValue', undefined)
  }
  if (!props.multiple) {
    emit('update:modelValue', newVal)
  } else {
    const modelArray = Array.from(newVal as Set<Item | number | string>)
    emit('update:modelValue', modelArray)
  }
  formatInputText()
}

function filterList(searchTerm: string, values: string[]) {
  return searchTerm ? values.filter(op => op.includes(searchTerm)) : values
}

const filter = (event: Event) => {
  if (!props.search) return event.preventDefault()
  if (
    props.multiple &&
    !searchTerm.value &&
    (event as InputEvent).inputType === 'deleteContentBackward'
  ) {
    data.value.pop()
  }
}

const findItem = () => {
  if (props.options) {
    let index: number
    if (optionsType.value == 'object') {
      index = props.options.findIndex(option => (option as Item).value === props.modelValue)
      if (index != -1) {
        selectedItem.value = (props.options[index] as Item).value
      }
    } else {
      index = props.options.findIndex(option => option == props.modelValue)
      if (index != -1) {
        selectedItem.value = props.options[index]
      }
    }
    if (index != -1) {
      addToIndexes(index)
      formatInputText()
    } else {
      emitNewValue(undefined)
    }
  }
}

const findItems = () => {
  if (props.options) {
    for (let item of props.modelValue) {
      let index: number
      if (optionsType.value == 'object') {
        index = props.options.findIndex(option => (option as Item).value === item)
      } else {
        index = props.options.findIndex(option => option == item)
      }
      if (index != -1) {
        addSelectedItem(index)
      }
    }
    if (selectedIndex.value.size == 0) {
      emitNewValue(undefined)
    }
  }
}

const formatInputText = () => {
  if (!props.multiple) {
    const array = Array.from(selectedIndex.value)
    if (array.length > 0) {
      if (optionsType.value == 'object') {
        inputText.value = (props.options[array[0]] as Item).text
      } else {
        inputText.value = props.options[array[0]].toString()
      }
    }
  } else {
    const modelArray = Array.from(selectedItem.value as Set<string>).sort(compare)
    inputText.value = modelArray.join(',')
  }
}

const formattedOptions = computed<string[]>(() => {
  if (!props.options) {
    return []
  }
  if (props.options.length > 0 && props.options.every(option => typeof option !== 'object')) {
    return props.options.every(option => typeof option !== 'number')
      ? (props.options as string[])
      : props.options.map(option => option.toString())
  } else {
    return (props.options as Item[]).map(option => option.text)
  }
})

const hide = () => {
  if (!selected) {
    searchTerm.value = ''
    show.value = false
    if (validateOnFocusout.value) {
      validate()
    }
  } else if (props.multiple) {
    searchField.value?.focus()
  }
  selected = false
}

const initSelect = async () => {
  if (!hasRenderError.value) {
    if (!props.multiple) {
      findItem()
    } else {
      selectedItem.value ??= new Set()
      findItems()
    }
  }
}

const isItemDisabled = (index: number) => {
  if (optionsType.value == 'object') {
    return Boolean((props.options[index] as Item).disabled)
  }
  return false
}

const select = (index: number) => {
  if (isItemDisabled(index)) {
    return
  }
  if (!props.multiple) {
    addToIndexes(index)
    show.value = false
    if (optionsType.value == 'object') {
      selectedItem.value = (props.options as Item[])[index].value
    } else {
      selectedItem.value = props.options[index]
    }
  } else {
    addSelectedItem(index)
  }
  emitNewValue(selectedItem.value)
}

const selecting = () => {
  selected = true
}

// Métodos ciclo de vida
onBeforeMount(() => {
  checkModelValue()
})

onMounted(() => {
  initSelect()
})

// Watcher
watch(
  () => props.multiple,
  newVal => {
    if (newVal) {
      if (!selectedItem.value) {
        selectedItem.value = new Set()
      }
    } else {
      selectedItem.value = undefined
    }
  }
)

// Expose
defineExpose({ validate })
</script>

<style lang="scss" scoped>
@import './SmSelect.scss';
</style>
