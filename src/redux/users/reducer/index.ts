import User from '../../../types/items/User';
import {
  GET_USERS_FAILED,
  GET_USERS_REQUESTED,
  GET_USERS_SUCCEEDED,
} from '../actions';

export interface ReduxAction {
  readonly type?: string;
  readonly payload?: any;
}

export interface UsersState {
  readonly after?: string;
  readonly before?: string;
  readonly hasAfter?: boolean;
  readonly hasBefore?: boolean;
  readonly getUsersError?: any;
  readonly getUsersLoading?: boolean;
  readonly items?: User[];
}

const initialState: UsersState = {
  after: undefined,
  before: undefined,
  getUsersError: null,
  getUsersLoading: false,
  hasAfter: false,
  hasBefore: false,
  items: [],
};

const coursesReducer = (
  state: UsersState = initialState,
  action: ReduxAction = {}
) => {
  switch (action.type) {
    case GET_USERS_REQUESTED: {
      return { ...state, getUsersError: null, getUsersLoading: true };
    }

    case GET_USERS_SUCCEEDED: {
      const { items , cursor} = action.payload;

      return {
        ...state,
        items,
        ...cursor,
        getUsersError: null,
        getUsersLoading: false,
      };
    }

    case GET_USERS_FAILED: {
      return {
        ...initialState,
        getUsersError: action.payload.error,
        getUsersLoading: false,
      };
    }
  
    default:
      return state;
  }
};

export default coursesReducer;
