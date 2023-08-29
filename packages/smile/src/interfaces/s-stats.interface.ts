import type { IconType } from './sm-icon.interface';

export interface sStatItem {
  icon?: IconType;
  trend?: number;
  help?: string;
  label: string;
  value: string;
}
