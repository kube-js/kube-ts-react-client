import {
  LOGIN_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCEDED,
  LOGOUT_REQUESTED,
} from '../actions/index';

export interface LoginSuccededAction {
  readonly user?: any;
  readonly token?: string;
}

export const loginSucceded = ({ token, user }: LoginSuccededAction) => ({
  payload: {
    token,
    user,
  },
  type: LOGIN_SUCCEDED,
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
