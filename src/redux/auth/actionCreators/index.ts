import {
  AUTH_DATA_RETRIEVAL_REQUESTED,
  AUTH_DATA_RETRIEVAL_SUCCEEDED,
  LOGIN_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGOUT_REQUESTED,
} from '../actions/index';

export interface LoginSuccededAction {
  readonly user?: any;
  readonly token?: string;
  readonly roles?: string[];
}

export const loginSucceeded = ({
  token,
  user,
  roles,
}: LoginSuccededAction) => ({
  payload: {
    roles,
    token,
    user,
  },
  type: LOGIN_SUCCEEDED,
});

export const loginFailed = (error: any) => ({
  payload: {
    error,
  },
  type: LOGIN_FAILED,
});

export const loginRequested = (email: string, password: string) => ({
  payload: { email, password },
  type: LOGIN_REQUESTED,
});

export const logoutRequested = () => ({
  type: LOGOUT_REQUESTED,
});

export const authDataRetrievalRequested = () => ({
  type: AUTH_DATA_RETRIEVAL_REQUESTED,
});

export interface AuthDataRetrievalOptions {
  readonly user?: any;
  readonly token?: string | null;
  readonly roles?: string[] | null;
}

export const authDataRetrievalSucceeded = ({
  token,
  user,
  roles,
}: AuthDataRetrievalOptions) => ({
  payload: { token, user, roles },
  type: AUTH_DATA_RETRIEVAL_SUCCEEDED,
});
