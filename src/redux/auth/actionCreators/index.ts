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
  REMIND_PASSWORD_FAILED,
  REMIND_PASSWORD_REQUESTED,
  REMIND_PASSWORD_SUCCEEDED,
  RESEND_VERIFY_TOKEN_FAILED,
  RESEND_VERIFY_TOKEN_REQUESTED,
  RESEND_VERIFY_TOKEN_SUCCEEDED,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUESTED,
  RESET_PASSWORD_SUCCEEDED,
  VERIFY_ACCOUNT_FAILED,
  VERIFY_ACCOUNT_REQUESTED,
  VERIFY_ACCOUNT_SUCCEEDED,
} from '../actions/index';

export interface LoginOptions {
  readonly email: string;
  readonly password: string;
}

export const loginRequested = ({ email, password }: LoginOptions) => ({
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
});

export interface RemindPasswordOptions {
  readonly email: string;
}

export const remindPasswordRequested = ({ email }: RemindPasswordOptions) => ({
  payload: {
    email,
  },
  type: REMIND_PASSWORD_REQUESTED,
});

export const remindPasswordSucceeded = () => ({
  type: REMIND_PASSWORD_SUCCEEDED,
});

export const remindPasswordFailed = (error: any) => ({
  payload: {
    error,
  },
  type: REMIND_PASSWORD_FAILED,
});

export interface ResetPasswordOptions {
  readonly password: string;
  readonly passwordConfirmation: string;
  readonly token: string;
}

export const resetPasswordRequested = ({
  password,
  passwordConfirmation,
  token,
}: ResetPasswordOptions) => ({
  payload: {
    password,
    passwordConfirmation,
    token,
  },
  type: RESET_PASSWORD_REQUESTED,
});

export const resetPasswordSucceeded = () => ({
  type: RESET_PASSWORD_SUCCEEDED,
});

export const resetPasswordFailed = (error: any) => ({
  payload: {
    error,
  },
  type: RESET_PASSWORD_FAILED,
});

export interface ResendVerifyTokenOptions {
  readonly email: string;
}

export const resendVerifyTokenRequested = ({
  email,
}: ResendVerifyTokenOptions) => ({
  payload: {
    email,
  },
  type: RESEND_VERIFY_TOKEN_REQUESTED,
});

export const resendVerifyTokenSucceeded = () => ({
  type: RESEND_VERIFY_TOKEN_SUCCEEDED,
});

export const resendVerifyTokenFailed = (error: any) => ({
  payload: {
    error,
  },
  type: RESEND_VERIFY_TOKEN_FAILED,
});

export interface VerifyAccountOptions {
  readonly email: string;
  readonly token: string;
}

export const verifyAccountRequested = ({ email, token }: VerifyAccountOptions) => ({
  payload: {
    email,
    token
  },
  type: VERIFY_ACCOUNT_REQUESTED,
});

export const verifyAccountSucceeded = () => ({
  type: VERIFY_ACCOUNT_SUCCEEDED,
});

export const verifyAccountFailed = (error: any) => ({
  payload: {
    error,
  },
  type: VERIFY_ACCOUNT_FAILED,
});
// tslint:disable-next-line:max-file-line-count
