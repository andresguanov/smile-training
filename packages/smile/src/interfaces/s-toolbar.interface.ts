/**
 * @author Carlos Quispe
 */
import type { IconType } from './sm-icon.interface';

export type AvailableToolbarFilterValue<T = string> = T;

export interface ToolbarFilter<T = unknown> {
  key: string;
  label: string;
  icon: IconType;
  initialValue?: T;
}

export interface ToolbarAction {
  name: string;
  label: string;
  icon?: IconType;
}
