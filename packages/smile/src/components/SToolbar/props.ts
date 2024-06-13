import { ToolbarAction, ToolbarFilter } from '~/interfaces/s-toolbar.interface';

export interface SToolbarMenuProps {
  headerText?: string;
  hasDeleteButton?: boolean;
  isLimited?: boolean;
}

export interface SToolbarProps {
  filters?: ToolbarFilter[];
  toolbarTexts?: {
    filter: string;
    by: string;
    removeFilters: string;
    searchPlaceholder?: string;
  };
  /**
   * Acciones secundarias para el toolbar,
   * cada una emite un evento `action` el cual devuelve
   * la propiedad name como parámetro.
   */
  actions?: ToolbarAction[];
  hideSearch?: boolean;
}
