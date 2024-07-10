export type SDatepickerValue = Date | string | Date[] | string[];

export interface SDatepickerCommonProps {
  modelValue: SDatepickerValue;
  locale?: 'es' | 'en';
  format?: string;
  readonly?: boolean;
  /**
   * No mutable.
   */
  id?: string;
  required?: boolean;
  disabled?: boolean;
  disabledDates?: Date[] | string[] | ((date: Date) => boolean);
  sidebarOptions?: { id: string; title: string; description?: string }[];
  multiCalendars?: boolean;
  autoApply?: boolean;
  textInput?: boolean;
  rangeMode?: boolean;
  minDate?: Date | string;
  maxDate?: Date | string;
  position?: 'left' | 'center' | 'right';
  hasToday?: boolean;
}

export interface SDatepickerBaseProps extends SDatepickerCommonProps {
  inline?: boolean;
}

export interface SDatepickerProps extends SDatepickerCommonProps {
  placeholder?: string;
  clearable?: boolean;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  /**
   * Disponible solo cuando el componente está dentro de SmForm.
   * Permite establecer las validaciones del componente.
   */
  rules?: Array<(value?: SDatepickerValue) => boolean | string>;
  /**
   * Mensaje de error, los mensajes de error proporcionados por rules tendrán
   * prioridad sobre este.
   */
  error?: string;
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
  hint?: string;
  supportiveText?: string;
}
