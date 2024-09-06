import type { IconType } from './sm-icon.interface';

export interface sStatItem {
  key?: string;
  icon?: IconType;
  trend?: number;
  trendText?: string;
  supportive?: string;
  supportiveIcon?: IconType;
  help?: string;
  label: string;
  value: string;
}
