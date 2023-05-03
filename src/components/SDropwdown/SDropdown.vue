<template>
  <div class="s-dropdown">
    <s-input
      v-model="currentValue"
      :label="label"
      :size="size"
      :hint="hint"
      :placeholder="placeholder"
      :icon-right="trailingIcon"
      :loading="loading"
      :disabled="disabled"
      :error="error"
      :rules="rules"
      @click.stop="toggleOverflow"
    />
    <s-overflow-menu
      v-if="open"
      class="s-dropdown__menu"
      top="100%"
      bubbling
      @click-outside="open = false"
    >
      <slot v-if="loading" name="loading">
        <p>{{ loadingText }}</p>
      </slot>
      <ul v-else>
        <li v-for="(option, i) in options" :key="i">
          <slot name="item" :index="i" :option="option">
            <s-menu-item
              v-bind="option"
              :title="String(option[textKey])"
              @click="onClickOption(option)"
            >
              <template #leading>
                <div class="s-dropdown__check" :class="{ multiple, selected: isSelected(option) }">
                  <sm-icon icon="success-outline" fluid />
                </div>
              </template>
            </s-menu-item>
          </slot>
        </li>
      </ul>
    </s-overflow-menu>
  </div>
</template>

<script setup lang="ts">
import type { IconType, smOption } from '../../interfaces'

interface Option extends smOption {
  [key: string]: unknown
}

const props = withDefaults(
  defineProps<{
    modelValue: Option | string | number | Array<string | number>
    size?: 'small' | 'medium' | 'large'
    hint?: string
    placeholder?: string
    disabled?: boolean
    success?: boolean
    loading?: boolean
    loadingText?: string
    search?: boolean
    label?: string
    options?: Array<Option>
    /**
     * Disponible solo cuando el componente está dentro de SmForm.
     * Permite establecer las validaciones del componente.
     */
    rules?: Array<(value: string) => boolean | string>
    error?: string
    /**
     * Indica si deseas que modelValue trabaje con objetos
     */
    object?: boolean
    /**
     * El valor que se mostrará como texto
     * @default text
     */
    textKey?: string
    /**
     * Clave valor para la opción,
     * si la prop "object" no está activa modelValue usará este identificador para us valor
     * @default code
     */
    valueKey?: string
    multiple?: boolean
  }>(),
  {
    size: 'medium',
    rules: () => [],
    options: () => [],
    loadingText: 'Cargando contenido...',
    textKey: 'text',
    valueKey: 'code',
  }
)
if (!props.options?.length) {
  console.warn('Missing data in %coptions', 'color: red;font-weight: bold;padding: 1px', 'prop.')
}
const emit = defineEmits<{
  (event: 'update:modelValue', value: Option | string | number): void
  (event: 'search', value: string): void
}>()
const data = useVModel(props, 'modelValue', emit)

const open = ref(false)
const trailingIcon = computed<IconType>(() => (open.value ? 'chevron-up' : 'chevron-down'))
const formattedValue = computed<string>(() => {
  if (!data.value) return ''
  if (props.multiple) {
    return (data.value as Array<string | number>)
      .reduce<Array<string>>((list, element) => {
        return list.concat([getText(element)])
      }, [])
      .join(', ')
  }
  if (props.object) return getText((data.value as Option)[props.valueKey] as string | number)
  return getText(data.value as string | number)
})
const currentValue = computed({
  get: () => {
    return formattedValue.value
  },
  set: value => {
    emit('search', value)
  },
})

const toggleOverflow = () => {
  if (props.disabled) return
  open.value = !open.value
}
const getText = (value: string | number) => {
  const selectedValue = props.options.find(op => op[props.valueKey] === value)
  if (selectedValue) return String(selectedValue[props.textKey])
  return ''
}
const isSelected = (value: Option) => {
  console.log('is selected invoker')

  const realValue = value[props.valueKey] as string | number
  if (props.multiple) {
    return (data.value as Array<string | number>).includes(realValue)
  }
  if (props.object) return (data.value as Option)[props.valueKey] === realValue
  return data.value === realValue
}
const onClickOption = (value: Option) => {
  const realValue = value[props.valueKey]
  if (typeof realValue !== 'number' && typeof realValue !== 'string') {
    throw new Error(
      `This component does not yet support the provided parameter type ${typeof realValue}. Please check the documentation for the expected parameter type.`
    )
  }
  if (props.multiple) {
    const opIndex = (data.value as Array<string | number>).findIndex(el => {
      if (props.object) {
        console.warn('Prop multiple not support prop object')
      }
      return el === realValue
    })
    if (opIndex >= 0) {
      ;(data.value as Array<string | number>).splice(opIndex, 1)
      return
    }
    ;(data.value as Array<string | number>).push(realValue)
    return
  }
  data.value = props.object ? value : realValue
  open.value = false
}
if (props.multiple && !data.value) {
  data.value = []
}
</script>

<style scoped lang="scss" src="./SDropdown.scss"></style>
