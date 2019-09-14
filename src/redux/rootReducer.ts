import { connectRouter, RouterState } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import alertsReducer, { AlertState } from './alerts/reducer';
import authReducer, { AuthState } from './auth/reducer';
import categoriesReducer, { CategoriesState } from './categories/reducer';
import coursesReducer, { CoursesState } from './courses/reducer';

export interface State {
  readonly categories: CategoriesState;
  readonly courses: CoursesState;
  readonly router: RouterState;
  readonly auth: AuthState;
  readonly alerts: AlertState;
}

export default (history: ReturnType<typeof createBrowserHistory>) =>
  combineReducers<State>({
    alerts: alertsReducer,
    auth: authReducer,
    categories: categoriesReducer,
    courses: coursesReducer,
    router: connectRouter(history),
  });
