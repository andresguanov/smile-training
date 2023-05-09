import type { IconType } from './sm-icon.interface'

export interface smOption {
  destructive?: boolean
  disabled?: boolean
  // textStyle?: 'inline' | 'block'
  avatar?: string
  icon?: IconType
  description?: string
}
