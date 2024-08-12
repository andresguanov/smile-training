export type ToastTypes = 'success' | 'error' | 'warning' | 'info' | 'neutral';

interface Action {
  label: string;
  action: () => void;
}

export interface smAlertProvideOptions {
  title?: string;
  time?: number;
  persistent?: boolean;
  action?: Action;
}

export interface smAlert extends smAlertProvideOptions {
  id: number;
  message: string;
  type?: ToastTypes;
}

export interface smNotification extends smAlert {
  contentInline?: boolean;
}

export interface smNotifications {
  carousel?: boolean;
  notifications: smNotification[];
  addNotification?: (notification: smNotification) => void;
  removeNotification?: (id: number) => void;
}

export interface smAlertProvide {
  success: (message: string, options?: smAlertProvideOptions) => void;
  error: (message: string, options?: smAlertProvideOptions) => void;
  warning: (message: string, options?: smAlertProvideOptions) => void;
  info: (message: string, options?: smAlertProvideOptions) => void;
}
