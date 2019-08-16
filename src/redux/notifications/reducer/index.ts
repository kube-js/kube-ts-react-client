import { CLOSE_SNACKBAR, ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from '../actions';

export interface Notification {
  readonly [key: string]: any;
  readonly dismissed: boolean;
  readonly key: string;
}

export interface Payload {
  readonly key: string;
  readonly dismissAll?: boolean;
  readonly notification: Notification;
}

export interface NotificationAction {
  readonly payload: Payload;
  readonly type: string;
}

export type NotificationState = Notification[];

const initialState: NotificationState = [];

export default (notifications = initialState, action: NotificationAction) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return [
        ...notifications,
        {
          key: action.payload.key,
          ...action.payload.notification,
        },
      ];

    case CLOSE_SNACKBAR:
      return notifications.map((item: Notification) =>
        action.payload.notification.dismissAll ||
        item.key === action.payload.notification.key
          ? { ...item, dismissed: true }
          : { ...item }
      );

    case REMOVE_SNACKBAR:
      return notifications.filter(
        (item: Notification) => item.key !== action.payload.notification.key
      );

    default:
      return notifications;
  }
};
