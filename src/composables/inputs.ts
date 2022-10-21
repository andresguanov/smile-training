import { PropType } from 'vue'

export const LabelProps = {
  label: String,
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
  },
  required: Boolean,
  error: Boolean,
}

export const InputProps = {
  disabled: Boolean,
  placeholder: String,
  nativeType: String,
  errorMessages: Array as PropType<Array<string>>,
}

export const ToggleProps = {
  labelToLeft: Boolean,
}
