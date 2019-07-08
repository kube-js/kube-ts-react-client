import { connectRouter, RouterState } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from './auth/reducer';

export interface State {
  readonly router: RouterState;
  readonly auth: AuthState;
}

export default (history: ReturnType<typeof createBrowserHistory>) =>
  combineReducers<State>({
    auth: authReducer,
    router: connectRouter(history),
  });
