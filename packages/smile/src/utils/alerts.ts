import { smAlertProvideOptions } from '../interfaces';
import { alertStore } from '../store';

export const $SmAlert = Symbol('$SmAlert');

export interface ISmAlertProvide {
  success: (message: string, options?: smAlertProvideOptions) => void;
  error: (message: string, options?: smAlertProvideOptions) => void;
  warning: (message: string, options?: smAlertProvideOptions) => void;
  info: (message: string, options?: smAlertProvideOptions) => void;
  neutral: (message: string, options?: smAlertProvideOptions) => void;
}

export const useSmAlert = () => {
  const success = (message: string, options?: smAlertProvideOptions) =>
    alertStore.showAlert({ message, type: 'success', ...options });

  const error = (message: string, options?: smAlertProvideOptions) =>
    alertStore.showAlert({ message, type: 'error', ...options });

  const warning = (message: string, options?: smAlertProvideOptions) =>
    alertStore.showAlert({ message, type: 'warning', ...options });

  const info = (message: string, options?: smAlertProvideOptions) =>
    alertStore.showAlert({ message, type: 'info', ...options });

  const neutral = (message: string, options?: smAlertProvideOptions) =>
    alertStore.showAlert({ message, type: 'neutral', ...options });

  const remove = (index: number) => alertStore.removeAlert(index);

  return {
    success,
    error,
    warning,
    info,
    neutral,
    remove,
  };
};
