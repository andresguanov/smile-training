import { ComputedRef, Ref } from 'vue';
import type { IconType } from './sm-icon.interface';

export type ToolbarFilterType = 'input' | 'select' | 'checkbox' | 'datepicker';

export interface smTableColumn {
  name: string;
  label?: string;
  format?: (e: string) => string;
  filterable?: boolean;
  width?: string;
  order?: boolean;
  firstToUpper?: boolean;
  headerAlign?: 'left' | 'right' | 'center';
  headerClass?: string;
  bodyAlign?: 'left' | 'right' | 'center';
  bodyClass?: string;
}

export interface smTableFilter {
  type: ToolbarFilterType;
  options?:
    | Array<{ text: string; value: any; selected?: boolean }>
    | Ref<{ text: string; value: any; selected?: boolean }[]>
    | ComputedRef<{ text: string; value: any; selected?: boolean }[]>;
  attrs?: any;
}

export interface smTableChangeEvent {
  start: number;
  to: number;
  limit: number;
  order_field: string;
  order_direction: string;
  filters: {
    [key: string]: any;
  };
}

export interface ToolbarFilter {
  key: string;
  type: ToolbarFilterType;
  label: string;
  icon?: IconType;
}

export interface ToolbarAction {
  name: string;
  label: string;
  icon?: IconType;
}
