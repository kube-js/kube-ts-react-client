import { v4 as uuid } from 'uuid';
import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from '../actions';
import { Alert } from '../reducer';

export interface Options {
  readonly key?: string;
}

export const enqueueSnackbar = (notification: Partial<Alert>) => ({
  payload: {
    notification: {
      key: uuid(),
      ...notification,
    },
  },
  type: ENQUEUE_SNACKBAR,
});

export const removeSnackbar = (key: string) => ({
  payload: {
    notification: {
      key,
    },
  },
  type: REMOVE_SNACKBAR,
});

export default {
  enqueueSnackbar,
  removeSnackbar,
};
