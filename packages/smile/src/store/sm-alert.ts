import { reactive } from 'vue';
import { smAlert } from '../interfaces';

export const alertStore = reactive<{
  stack: smAlert[];
  showAlert: (alet: Partial<smAlert>) => void;
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
      });
    }
  },
  removeAlert(index: number) {
    if (index > -1) this.stack.splice(index, 1);
  },
});
