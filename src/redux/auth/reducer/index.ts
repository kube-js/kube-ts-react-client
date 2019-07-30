import {
  AUTH_DATA_RETRIEVAL_SUCCEEDED,
  LOGIN_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGOUT_REQUESTED,
} from '../actions';

export interface ReduxAction {
  readonly type?: string;
  readonly payload?: any;
}

export interface AuthState {
  readonly user?: any;
  readonly roles?: string[] | null;
  readonly token?: string | null;
  readonly error?: any;
  readonly loginLoading?: boolean;
  readonly registerLoading?: boolean;
}

const initialState: AuthState = {
  error: null,
  loginLoading: false,
  roles: null,
  token: null,
  user: null,
};

const authReducer = (
  state: AuthState = initialState,
  action: ReduxAction = {}
) => {
  switch (action.type) {
    case LOGIN_REQUESTED: {
      return { ...state, error: null, loginLoading: true };
    }

    case LOGIN_SUCCEEDED: {
      const { user, token, roles } = action.payload;

      return { ...state, user, token, roles, error: null, loginLoading: false };
    }

    case LOGIN_FAILED: {
      return {
        ...initialState,
        error: action.payload.error,
        loginLoading: false,
      };
    }

    case LOGOUT_REQUESTED: {
      return initialState;
    }

    case AUTH_DATA_RETRIEVAL_SUCCEEDED: {
      const { token, roles, user } = action.payload;
      
      return {
        ...initialState,
        roles,
        token,
        user,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
