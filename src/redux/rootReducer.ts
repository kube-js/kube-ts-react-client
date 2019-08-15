import { connectRouter, RouterState } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from './auth/reducer';
import notificationReducer, { NotificationState } from './notifications/reducer';

export interface State {
  readonly router: RouterState;
  readonly auth: AuthState;
  readonly notifications: NotificationState;
}

export default (history: ReturnType<typeof createBrowserHistory>) =>
  combineReducers<State>({
    auth: authReducer,
    notifications: notificationReducer, 
    router: connectRouter(history),
  });
