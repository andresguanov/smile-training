import type { IconType } from './sm-icon.interface';

export interface sStatItem {
  icon?: IconType;
  trend?: number;
  trendText?: string;
  countIcon?: IconType;
  supportive?: string;
  supportiveIcon?: IconType;
  help?: string;
  label: string;
  value: string;
}
