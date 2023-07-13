import type { IconType } from './sm-icon.interface';

export interface smMenuOption {
  avatar?: string;
  description?: string;
  destructive?: boolean;
  disabled?: boolean;
  icon?: IconType;
  level?: number;
  // textStyle?: 'inline' | 'block'
}
