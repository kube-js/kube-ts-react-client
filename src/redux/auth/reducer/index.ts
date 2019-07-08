import { LOGIN_FAILED, LOGIN_SUCCEDED } from '../actions';

export interface ReduxAction {
  readonly type?: string;
  readonly payload?: any;
}

export interface AuthState {
  readonly user?: any;
  readonly token?: string | null;
  readonly error?: any;
}

const initialState: AuthState = {
  error: null,
  token: null,
  user: null,
};

const authReducer = (
  state: AuthState = initialState,
  action: ReduxAction = {}
) => {
  switch (action.type) {
    case LOGIN_SUCCEDED: {
      const { user, token } = action.payload;

      return { ...state, user, token, error: null };
    }

    case LOGIN_FAILED: {
      return { ...state, user: null, token: null, error: action.payload.error };
    }

    default:
      return state;
  }
};

export default authReducer;
