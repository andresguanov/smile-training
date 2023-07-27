import type { IconType } from './sm-icon.interface';

export interface InputAddon {
  inline?: boolean;
  actionable?: boolean;
  label?: string;
  leadingIcon?: IconType;
  trailingIcon?: IconType;
}
