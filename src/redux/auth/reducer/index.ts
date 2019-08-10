import {
  AUTH_DATA_RETRIEVAL_SUCCEEDED,
  LOGIN_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGOUT_REQUESTED,
  REGISTER_FAILED,
  REGISTER_REQUESTED,
  REGISTER_SUCCEEDED,
  REMIND_PASSWORD_FAILED,
  REMIND_PASSWORD_REQUESTED,
  REMIND_PASSWORD_SUCCEEDED,
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
  readonly remindPasswordError?: any;
  readonly remindPasswordLoading?: boolean;
}

const initialState: AuthState = {
  loginError: null,
  loginLoading: false,
  registerError: null,
  registerLoading: false,
  remindPasswordError: null,
  remindPasswordLoading: false,
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

      return {
        ...state,
        loginError: null,
        loginLoading: false,
        roles,
        token,
        user,
      };
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

      return {
        ...state,
        registerError: null,
        registerLoading: false,
        roles,
        token,
        user,
      };
    }

    case REGISTER_FAILED: {
      return {
        ...initialState,
        registerError: action.payload.error,
        registerLoading: false,
      };
    }
    case REMIND_PASSWORD_REQUESTED: {
      return {
        ...state,
        remindPasswordError: null,
        remindPasswordLoading: true,
      };
    }

    case REMIND_PASSWORD_SUCCEEDED: {
      return {
        ...state,
        remindPasswordError: null,
        remindPasswordLoading: false,
      };
    }

    case REMIND_PASSWORD_FAILED: {
      return {
        ...initialState,
        remindPasswordError: action.payload.error,
        remindPasswordLoading: false,
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

// tslint:disable-next-line:max-file-line-count
export default authReducer;
