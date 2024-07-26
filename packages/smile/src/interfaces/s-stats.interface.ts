import type { IconType } from './sm-icon.interface';

export interface sStatItem {
  icon?: IconType;
  trend?: number;
  trendText?: string;
  countIcon?: IconType;
  help?: string;
  label: string;
  value: string;
}
