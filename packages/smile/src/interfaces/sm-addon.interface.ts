import type { IconType } from './sm-icon.interface';

export interface SInputAddon {
  inline?: boolean;
  actionable?: boolean;
  label?: string;
  leadingIcon?: IconType;
  trailingIcon?: IconType;
}
