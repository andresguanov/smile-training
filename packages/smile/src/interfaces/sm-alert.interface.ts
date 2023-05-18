export interface smAlert {
  id: number;
  message: string;
  title?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  time?: number;
  persistent?: boolean;
}

export interface smAlertProvideOptions {
  title?: string;
  time?: number;
  persistent?: boolean;
}
export interface smAlertProvide {
  success: (message: string, options?: smAlertProvideOptions) => void;
  error: (message: string, options?: smAlertProvideOptions) => void;
  warning: (message: string, options?: smAlertProvideOptions) => void;
  info: (message: string, options?: smAlertProvideOptions) => void;
}
