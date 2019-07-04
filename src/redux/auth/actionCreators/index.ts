import { LOGIN_FAILED, LOGIN_SUCCEDED } from '../actions/index';

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