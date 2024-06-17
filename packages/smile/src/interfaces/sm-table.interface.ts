export interface TableColumn {
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

export interface TableChangeEvent {
  start: number;
  to: number;
  limit: number;
  order_field: string;
  order_direction: string;
  filters: {
    [key: string]: any;
  };
}
