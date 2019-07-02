import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import authReducer from './auth/reducer';

export default (history: ReturnType<typeof createBrowserHistory>) =>
  combineReducers({
    auth: authReducer,
    router: connectRouter(history),
  });
