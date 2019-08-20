import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from '../actions';

export interface Alert {
  readonly [key: string]: any;
  readonly message: string | React.ReactNode;
  readonly key: string;
}

export interface Payload {
  readonly key: string;
  // readonly dismissAll?: boolean;
  readonly notification: Alert;
}

export interface AlertAction {
  readonly payload: Payload;
  readonly type: string;
}

export type AlertState = Alert[];

const initialState: AlertState = [];

export default (alerts = initialState, action: AlertAction) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return [
        ...alerts,
        {
          key: action.payload.key,
          ...action.payload.notification,
        },
      ];
      
    case REMOVE_SNACKBAR:
      return alerts.filter(
        (item: Alert) => item.key !== action.payload.notification.key
      );

    default:
      return alerts;
  }
};
