<template>
  <div class="sm-input-container">
    <sm-label v-if="label" v-bind="$props" :error="hasError" @click="searchField?.focus()" />
    <div :class="[sizeClass, { 'sm-select-search': search }, { 'sm-select-error': hasError }]">
      <input
        ref="searchField"
        v-model="currentValue"
        :disabled="disabled"
        :placeholder="currentValue || placeholder"
        :class="{ 'sm-input-disabled': disabled }"
        v-sm-simple-uid="'sm-select'"
        @focusin="show = true"
        @focusout="hide"
        @beforeinput="filter"
      />
      <ul :class="['sm-select-options', { 'sm-select-options-open': show }]">
        <li
          v-for="(option, index) in filterList(searchTerm, formatedOptions)"
          :class="['sm-select-option', { 'sm-select-option-selected': option.selected }]"
          :key="index"
          @click="select(option)"
          @mousedown="selecting"
        >
          <slot name="option" :option="option">
            <div class="sm-select-checkbox" v-if="multiple"></div>
            {{ option.text }}
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
import { smSimpleUid as vSmSimpleUid } from '../../directives'
import { Ref } from 'vue'
import { useValidate } from '../../composables'

type option = { text: string; value: any; selected?: boolean }
type Props = {
  options: Array<option> | Array<string> | Array<number>
  label?: string
  modelValue?: any
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

const props = defineProps<Props>()

const searchTerm = ref('')

const formattedValue = computed<string>(() => {
  if (props.multiple) {
    return ((data.value as Array<any>) || [])
      .reduce((list, element) => {
        return list.concat([getValueText(element)])
      }, [])
      .join(', ')
  } else {
    return getValueText(data.value)
  }
})

const currentValue = computed({
  get: () => {
    if (show.value && props.search) {
      if (props.multiple) {
        return formattedValue.value.length
          ? `${formattedValue.value}, ${searchTerm.value}`
          : searchTerm.value
      } else {
        return searchTerm.value
      }
    } else {
      return formattedValue.value
    }
  },
  set: value => {
    searchTerm.value = formattedValue.value.length
      ? value.slice(formattedValue.value.length + 2)
      : value
  },
})

const searchField: Ref<HTMLInputElement | null> = ref(null)

const emit = defineEmits(['update:modelValue'])

const data = computed({
  get: () => props.modelValue,
  set: value => {
    if (!props.multiple) {
      show.value = false
    }
    emit('update:modelValue', value)
  },
})

/**
 * semaforo para detener el cierre de opciones cuando se salga el focus del input principal
 */
let selected = false

function selecting() {
  selected = true
}

function hide() {
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

function select(option: option) {
  if (props.multiple) {
    const opIndex = data.value.findIndex((selected: any) => selected === option.value)
    if (opIndex >= 0) {
      ;(data.value as Array<any>).splice(opIndex, 1)
    } else {
      data.value.push(option.value)
    }
  } else {
    data.value = option.value
  }
}

const show = ref(false)

function getValueText(value: any): string {
  var text = formatedOptions.value.find(option => option.value === value)?.text
  if (!text) {
    console.warn(`text value was undefined for option ${data.value}`)
    return value
  } else {
    return text
  }
}

function filter(event: Event) {
  if (!props.search) return event.preventDefault()
  if (
    props.multiple &&
    !searchTerm.value &&
    (event as InputEvent).inputType === 'deleteContentBackward'
  ) {
    data.value.pop()
  }
}

const formatedOptions = computed(() => {
  let op = []
  if (props.options.length > 0 && typeof props.options[0] !== 'object') {
    op = props.options.map(option => ({
      text: option,
      value: option,
    })) as Array<option>
  } else {
    op = props.options as Array<option>
  }
  op.forEach(option => {
    if (props.multiple) {
      option.selected = (data.value as Array<any>).includes(option.value)
    } else {
      option.selected = data.value === option.value
    }
  })
  // if (op.length === 0 && data.value) op.push({ text: formattedValue.value, value: data.value })
  return op
})

function filterList(term: string, values: Array<option>) {
  return term ? values.filter(op => op.text.includes(term)) : values
}

const sizeClass = computed(() => {
  let size = props.size || 'medium'
  return `sm-select sm-select-${size} sm-text-${size}`
})

const { validate, hasError, errorListContent, validateOnFocusout } = useValidate(
  data,
  props.rules || [],
  props.error,
  props.errorMessages
)

defineExpose({ validate })

onMounted(() => {
  if (!data.value && props.multiple) {
    emit('update:modelValue', [])
  }
})
</script>

<style lang="scss" scoped>
@import './SmSelect.scss';
</style>
