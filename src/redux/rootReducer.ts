import { connectRouter, RouterState } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import alertsReducer, { AlertState } from './alerts/reducer';
import authReducer, { AuthState } from './auth/reducer';
import autocompleteReducer, { AutocompleteState } from './autocomplete/reducer';
import cartReducer, { CartState } from './cart/reducer';
import categoriesReducer, { CategoriesState } from './categories/reducer';
import courseDetailsReducer, {
  CourseDetailsState,
} from './courseDetails/reducer';
import coursesReducer, { CoursesState } from './courses/reducer';
import discoveryItemsReducer, {
  DiscoveryItemsState,
} from './discoveryItems/reducer';
import usersReducer, { UsersState } from './users/reducer';

export interface State {
  readonly autocomplete: AutocompleteState;
  readonly categories: CategoriesState;
  readonly cart: CartState;
  readonly courses: CoursesState;
  readonly courseDetails: CourseDetailsState;
  readonly discoveryItems: DiscoveryItemsState;
  readonly router: RouterState;
  readonly auth: AuthState;
  readonly alerts: AlertState;
  readonly users: UsersState;
}

const persistConfig = {
  blacklist: ['_persist'],
  key: 'root',
  storage,
};

const createPersistedReducer = (
  history: ReturnType<typeof createBrowserHistory>
) => {
  const combinedReducer = combineReducers<State>({
    alerts: alertsReducer,
    auth: authReducer,
    autocomplete: autocompleteReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    courseDetails: courseDetailsReducer,
    courses: coursesReducer,
    discoveryItems: discoveryItemsReducer,
    router: connectRouter(history),
    users: usersReducer,
  });

  interface ReduxAction {
    readonly type?: string;
    readonly payload?: any;
  }

  const rootReducer = (state: State, action: ReduxAction) => {
    switch (action.type) {
      case 'persist/REHYDRATE': {
        if(action.payload){
          return combinedReducer(action.payload, action as any);
        }

        return state;
      }
      default:
        return combinedReducer(state, action as any);
    }
  };

  return persistReducer(persistConfig, rootReducer as any);
};

export default createPersistedReducer;
