import {
  AUTH_DATA_RETRIEVAL_REQUESTED,
  AUTH_DATA_RETRIEVAL_SUCCEEDED,
  LOGIN_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGOUT_REQUESTED,
  REGISTER_FAILED,
  REGISTER_REQUESTED,
  REGISTER_SUCCEEDED,
} from '../actions/index';

export const loginRequested = (email: string, password: string) => ({
  payload: { email, password },
  type: LOGIN_REQUESTED,
});

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

export interface RegisterOptions {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly password: string;
  readonly passwordConfirmation: string;
}

export const registerRequested = (options: RegisterOptions) => ({
  payload: options,
  type: REGISTER_REQUESTED,
});

export interface RegisterSuccededAction {
  readonly user?: any;
  readonly token?: string;
  readonly roles?: string[];
}

export const registerSucceeded = ({
  token,
  user,
  roles,
}: RegisterSuccededAction) => ({
  payload: {
    roles,
    token,
    user,
  },
  type: REGISTER_SUCCEEDED,
});

export const registerFailed = (error: any) => ({
  payload: {
    error,
  },
  type: REGISTER_FAILED,
// tslint:disable-next-line:max-file-line-count
});
