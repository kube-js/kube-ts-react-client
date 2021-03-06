import {
  TEST_ROLES,
  TEST_TOKEN,
  TEST_USER,
} from '../../../utils/tests/testData';
import {
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
} from '../actions';
import authReducer from './index';

describe('@authReducer', () => {
  const error = new Error('test');

  const initialState = {
    loginError: null,
    loginLoading: false,
    registerError: null,
    registerLoading: false,
    remindPasswordError: null,
    remindPasswordLoading: false,
    resendVerifyTokenError: null,
    resendVerifyTokenLoading: false,
    resetPasswordError: null,
    resetPasswordLoading: false,
    roles: null,
    token: null,
    user: null,
    verifyAccountError: null,
    verifyAccountLoading: false,
  };

  it('returns initial state', () => {
    const result = authReducer();

    expect(result).toEqual(initialState);
  });

  it('returns state for LOGIN_REQUESTED', () => {
    const action = { type: LOGIN_REQUESTED };

    const result = authReducer(undefined, action);

    expect(result).toEqual({
      ...initialState,
      loginError: null,
      loginLoading: true,
    });
  });

  it('returns state for LOGIN_SUCCEDED', () => {
    const payload = { user: TEST_USER, token: TEST_TOKEN, roles: TEST_ROLES };

    const action = { type: LOGIN_SUCCEEDED, payload };

    const result = authReducer(
      { ...initialState, loginError: error, loginLoading: true },
      action
    );

    expect(result).toEqual({
      ...initialState,
      loginError: null,
      loginLoading: false,
      roles: TEST_ROLES,
      token: TEST_TOKEN,
      user: TEST_USER,
    });
  });

  it('returns state for LOGIN_FAILED', () => {
    const payload = { error };

    const action = { type: LOGIN_FAILED, payload };

    const result = authReducer(
      {
        ...initialState,
        loginLoading: true,
        token: TEST_TOKEN,
        user: TEST_USER,
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      loginError: error,
      loginLoading: false,
    });
  });

  it('returns state for LOGOUT_REQUESTED', () => {
    const action = { type: LOGOUT_REQUESTED };

    const result = authReducer(
      {
        loginError: error,
        loginLoading: false,
        registerError: error,
        token: TEST_TOKEN,
        user: TEST_USER,
      },
      action
    );

    expect(result).toEqual(initialState);
  });

  it('returns state for REGISTER_REQUESTED', () => {
    const action = { type: REGISTER_REQUESTED };

    const result = authReducer(undefined, action);

    expect(result).toEqual({
      ...initialState,
      registerError: null,
      registerLoading: true,
    });
  });

  it('returns state for REGISTER_SUCCEEDED', () => {
    const payload = { user: TEST_USER, token: TEST_TOKEN, roles: TEST_ROLES };

    const action = { type: REGISTER_SUCCEEDED, payload };

    const result = authReducer(
      { ...initialState, registerError: error, registerLoading: true },
      action
    );

    expect(result).toEqual({
      ...initialState,
      registerError: null,
      registerLoading: false,
      roles: TEST_ROLES,
      token: TEST_TOKEN,
      user: TEST_USER,
    });
  });

  it('returns state for REGISTER_FAILED', () => {
    const payload = { error };

    const action = { type: REGISTER_FAILED, payload };

    const result = authReducer(
      {
        ...initialState,
        registerLoading: true,
        token: TEST_TOKEN,
        user: TEST_USER,
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      registerError: error,
      registerLoading: false,
    });
  });

  it('returns state for REMIND_PASSWORD_REQUESTED', () => {
    const action = { type: REMIND_PASSWORD_REQUESTED };

    const result = authReducer(undefined, action);

    expect(result).toEqual({
      ...initialState,
      remindPasswordLoading: true,
    });
  });

  it('returns state for REMIND_PASSWORD_SUCCEEDED', () => {
    const action = { type: REMIND_PASSWORD_SUCCEEDED };

    const result = authReducer(
      {
        ...initialState,
        remindPasswordError: error,
        remindPasswordLoading: true,
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      remindPasswordError: null,
      remindPasswordLoading: false,
    });
  });

  it('returns state for REMIND_PASSWORD_FAILED', () => {
    const payload = { error };

    const action = { type: REMIND_PASSWORD_FAILED, payload };

    const result = authReducer(
      {
        ...initialState,
        remindPasswordLoading: true,
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      remindPasswordError: error,
      remindPasswordLoading: false,
    });
  });

  it('returns state for RESET_PASSWORD_REQUESTED', () => {
    const action = { type: RESET_PASSWORD_REQUESTED };

    const result = authReducer(undefined, action);

    expect(result).toEqual({
      ...initialState,
      resetPasswordLoading: true,
    });
  });

  it('returns state for RESET_PASSWORD_SUCCEEDED', () => {
    const action = { type: RESET_PASSWORD_SUCCEEDED };

    const result = authReducer(
      {
        ...initialState,
        resetPasswordError: error,
        resetPasswordLoading: true,
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      resetPasswordError: null,
      resetPasswordLoading: false,
    });
  });

  it('returns state for RESET_PASSWORD_FAILED', () => {
    const payload = { error };

    const action = { type: RESET_PASSWORD_FAILED, payload };

    const result = authReducer(
      {
        ...initialState,
        resetPasswordLoading: true,
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      resetPasswordError: error,
      resetPasswordLoading: false,
    });
  });

  it('returns state for RESEND_VERIFY_TOKEN_REQUESTED', () => {
    const action = { type: RESEND_VERIFY_TOKEN_REQUESTED };

    const result = authReducer(undefined, action);

    expect(result).toEqual({
      ...initialState,
      resendVerifyTokenLoading: true,
    });
  });

  it('returns state for RESEND_VERIFY_TOKEN_SUCCEEDED', () => {
    const action = { type: RESEND_VERIFY_TOKEN_SUCCEEDED };

    const result = authReducer(
      {
        ...initialState,
        resendVerifyTokenError: error,
        resendVerifyTokenLoading: true,
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      resendVerifyTokenError: null,
      resendVerifyTokenLoading: false,
    });
  });

  it('returns state for RESEND_VERIFY_TOKEN_FAILED', () => {
    const payload = { error };

    const action = { type: RESEND_VERIFY_TOKEN_FAILED, payload };

    const result = authReducer(
      {
        ...initialState,
        resendVerifyTokenLoading: true,
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      resendVerifyTokenError: error,
      resendVerifyTokenLoading: false,
    });
  });

  it('returns state for VERIFY_ACCOUNT_REQUESTED', () => {
    const action = { type: VERIFY_ACCOUNT_REQUESTED };

    const result = authReducer(undefined, action);

    expect(result).toEqual({
      ...initialState,
      verifyAccountLoading: true,
    });
  });

  it('returns state for VERIFY_ACCOUNT_SUCCEEDED', () => {
    const action = { type: VERIFY_ACCOUNT_SUCCEEDED };

    const result = authReducer(
      {
        ...initialState,
        verifyAccountError: error,
        verifyAccountLoading: true,
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      verifyAccountError: null,
      verifyAccountLoading: false,
    });
  });

  it('returns state for VERIFY_ACCOUNT_FAILED', () => {
    const payload = { error };

    const action = { type: VERIFY_ACCOUNT_FAILED, payload };

    const result = authReducer(
      {
        ...initialState,
        verifyAccountLoading: true,
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      verifyAccountError: error,
      verifyAccountLoading: false,
    });
  });
  // tslint:disable-next-line:max-file-line-count
});
