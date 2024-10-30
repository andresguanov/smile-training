import { reactive } from 'vue';
import { smAlert } from '../interfaces';

export const alertStore = reactive<{
  stack: smAlert[];
  showAlert: (alet: Partial<smAlert>) => number | undefined;
  removeAlert: (index: number) => void;
}>({
  stack: [],
  showAlert({
    title,
    message,
    type = 'success',
    persistent = false,
    time = 7500,
    action,
    onRemove,
  }: Partial<smAlert>) {
    if (message) {
      this.stack.push({
        id: Math.floor(Math.random() * 4000),
        title,
        message,
        type,
        persistent,
        time,
        action,
        onRemove,
      });

      return this.stack.length - 1;
    }

    return undefined;
  },
  removeAlert(index: number) {
    if (index > -1) {
      const alert = this.stack[index];
      this.stack.splice(index, 1);

      if (alert?.onRemove) {
        alert.onRemove();
      }
    }
  },
});
