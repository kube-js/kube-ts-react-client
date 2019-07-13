import { LOGIN_FAILED, LOGIN_REQUESTED, LOGIN_SUCCEDED, LOGOUT_REQUESTED } from '../actions';

export interface ReduxAction {
  readonly type?: string;
  readonly payload?: any;
}

export interface AuthState {
  readonly user?: any;
  readonly token?: string | null;
  readonly error?: any;
  readonly loading?: boolean;
}

const initialState: AuthState = {
  error: null,
  loading: false,
  token: null,
  user: null,
};

const authReducer = (
  state: AuthState = initialState,
  action: ReduxAction = {}
) => {
  switch (action.type) {
    case LOGIN_REQUESTED: {
      return { ...state, error: null, loading: true };
    }

    case LOGIN_SUCCEDED: {
      const { user, token } = action.payload;

      return { ...state, user, token, error: null, loading: false };
    }

    case LOGIN_FAILED: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
        token: null,
        user: null,
      };
    }

    case LOGOUT_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: false,
        token: null,
        user: null,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
