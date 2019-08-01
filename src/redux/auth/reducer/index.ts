import {
  AUTH_DATA_RETRIEVAL_SUCCEEDED,
  LOGIN_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGOUT_REQUESTED,
  REGISTER_REQUESTED,
  REGISTER_SUCCEEDED,
  REGISTER_FAILED,
} from '../actions';

export interface ReduxAction {
  readonly type?: string;
  readonly payload?: any;
}

export interface AuthState {
  readonly user?: any;
  readonly roles?: string[] | null;
  readonly token?: string | null;
  readonly loginError?: any;
  readonly loginLoading?: boolean;
  readonly registerError?: any;
  readonly registerLoading?: boolean;
}

const initialState: AuthState = {
  loginError: null,
  registerError: null,
  loginLoading: false,
  registerLoading: false,
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
      return { ...state, loginError: null, loginLoading: true };
    }

    case LOGIN_SUCCEEDED: {
      const { user, token, roles } = action.payload;

      return { ...state, loginError: null, loginLoading: false, user, token, roles  };
    }

    case LOGIN_FAILED: {
      return {
        ...initialState,
        loginError: action.payload.error,
        loginLoading: false,
      };
    }

    case REGISTER_REQUESTED: {
      return { ...state, registerError: null, registerLoading: true };
    }

    case REGISTER_SUCCEEDED: {
      const { user, token, roles } = action.payload;

      return { ...state, user, token, roles, registerError: null, registerLoading: false };
    }

    case REGISTER_FAILED: {
      return {
        ...initialState,
        registerError: action.payload.error,
        registerLoading: false,
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
