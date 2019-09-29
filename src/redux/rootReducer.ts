import { connectRouter, RouterState } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import alertsReducer, { AlertState } from './alerts/reducer';
import authReducer, { AuthState } from './auth/reducer';
import categoriesReducer, { CategoriesState } from './categories/reducer';
import coursesReducer, { CoursesState } from './courses/reducer';
import discoveryItemsReducer, { DiscoveryItemsState } from './discoveryItems/reducer';
import usersReducer, { UsersState } from './users/reducer';

export interface State {
  readonly categories: CategoriesState;
  readonly courses: CoursesState;
  readonly discoveryItems: DiscoveryItemsState;
  readonly router: RouterState;
  readonly auth: AuthState;
  readonly alerts: AlertState;
  readonly users: UsersState;
}

export default (history: ReturnType<typeof createBrowserHistory>) =>
  combineReducers<State>({
    alerts: alertsReducer,
    auth: authReducer,
    categories: categoriesReducer,
    courses: coursesReducer,
    discoveryItems: discoveryItemsReducer,
    router: connectRouter(history),
    users: usersReducer,
  });
