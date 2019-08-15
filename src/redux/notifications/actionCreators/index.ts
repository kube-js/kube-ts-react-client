import { CLOSE_SNACKBAR, ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from '../actions';
import { Notification } from '../reducer';

export interface Options {
  readonly key?: string;
}

export const enqueueSnackbar = (notification: Notification) => ({
  notification: {
    ...notification,
    key: notification.key || new Date().getTime() + Math.random(),
  },
  type: ENQUEUE_SNACKBAR,
});

export const closeSnackbar = (key: string) => ({
  dismissAll: !key, // dismiss all if no key has been defined
  key,
  type: CLOSE_SNACKBAR,
});

export const removeSnackbar = (key: string) => ({
  key,
  type: REMOVE_SNACKBAR,
});
