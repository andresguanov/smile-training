/**
 * @author Carlos Quispe
 */
import type { IconType } from './sm-icon.interface';

export type AvailableToolbarFilterValue = string | string[] | number | boolean;

export interface ToolbarFilter {
  key: string;
  label: string;
  icon: IconType;
  initialValue?: AvailableToolbarFilterValue;
}

export interface ToolbarAction {
  name: string;
  label: string;
  icon?: IconType;
}
