import type { InputAddon } from '../interfaces';

import type { MenuOption } from './generic';

export type SDropdownProps = {
  modelValue?: MenuOption | string | number | Array<string | number>;
  size?: 'small' | 'medium' | 'large';
  hint?: string;
  /**
   * Se envía para forzar el re-renderizado de items
   */
  hideLoadingText?: boolean;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  success?: boolean;
  loading?: boolean;
  loadingText?: string;
  label?: string;
  options?: Array<MenuOption>;
  /**
   * Disponible solo cuando el componente está dentro de SmForm.
   * Permite establecer las validaciones del componente.
   */
  rules?: Array<
    (value?: MenuOption | string | number | Array<string | number>) => boolean | string
  >;
  error?: string;
  /**
   * Indica si deseas que modelValue trabaje con objetos
   */
  object?: boolean;
  /**
   * El valor que se mostrará como texto
   * @default text
   */
  textKey?: string;
  /**
   * Clave valor para la opción,
   * si la prop "object" no está activa modelValue usará este identificador para us valor
   * @default code
   */
  valueKey?: string;
  multiple?: boolean;
  id?: string;
  /**
   * Permite activar el evento search así como un campo de búsqueda.
   * No realizar un filtro en local
   */
  search?: boolean;
  /**
   * Permite indicar si el valor puede deseleccionarse.
   * Se ignora cuando prop "multiple" esta activa.
   */
  canDeselect?: boolean;
  leading?: InputAddon;
  maxHeight?: string;
  /**
   * Al pasar esta prop indicas que deseas mostrar al lado del label la marca
   * que indica si el input es requerido u opcional.
   */
  markType?: 'required' | 'optional';
  /**
   * Texto que se mostrará cuando `markType` es `optional`
   * @default Opcional
   */
  optionalText?: string;
  magic?:boolean;
};
