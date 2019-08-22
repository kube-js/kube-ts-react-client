import {
  TEST_EMAIL,
  TEST_PASSWORD,
  TEST_ROLES,
  TEST_TOKEN,
  TEST_USER,
} from '../../../utils/tests/testData';
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
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUESTED,
  RESET_PASSWORD_SUCCEEDED,
  VERIFY_ACCOUNT_FAILED,
  VERIFY_ACCOUNT_REQUESTED,
  VERIFY_ACCOUNT_SUCCEEDED,
} from '../actions';
import * as actions from './index';

describe('auth actions', () => {
  it('loginRequested creates LOGIN_REQUESTED', () => {
    expect(
      actions.loginRequested({ email: TEST_EMAIL, password: TEST_PASSWORD })
    ).toEqual({
      payload: {
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      },
      type: LOGIN_REQUESTED,
    });
  });

  it('loginSucceded creates LOGIN_SUCCEDED', () => {
    const payload = { user: TEST_USER, token: TEST_TOKEN, roles: TEST_ROLES };

    expect(actions.loginSucceeded(payload)).toEqual({
      payload,
      type: LOGIN_SUCCEEDED,
    });
  });

  it('loginFailed creates LOGIN_FAILED', () => {
    const error = new Error('test');
    const payload = { error };

    expect(actions.loginFailed(error)).toEqual({
      payload,
      type: LOGIN_FAILED,
    });
  });

  it('registerRequested creates REGISTER_REQUESTED', () => {
    const payload = {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      passwordConfirmation: TEST_PASSWORD,
    };

    expect(actions.registerRequested(payload)).toEqual({
      payload,
      type: REGISTER_REQUESTED,
    });
  });

  it('registerSucceeded creates REGISTER_SUCCEDED', () => {
    const payload = { user: TEST_USER, token: TEST_TOKEN, roles: TEST_ROLES };

    expect(actions.registerSucceeded(payload)).toEqual({
      payload,
      type: REGISTER_SUCCEEDED,
    });
  });

  it('registerFailed creates REGISTER_FAILED', () => {
    const error = new Error('test');
    const payload = { error };

    expect(actions.registerFailed(error)).toEqual({
      payload,
      type: REGISTER_FAILED,
    });
  });

  it('logoutRequested creates LOGOUT_REQUESTED', () => {
    expect(actions.logoutRequested()).toEqual({
      type: LOGOUT_REQUESTED,
    });
  });

  it('logoutRequested creates LOGOUT_REQUESTED', () => {
    expect(actions.logoutRequested()).toEqual({
      type: LOGOUT_REQUESTED,
    });
  });

  it('authDataRetrievalRequested creates AUTH_DATA_RETRIEVAL_REQUESTED ', () => {
    expect(actions.authDataRetrievalRequested()).toEqual({
      type: AUTH_DATA_RETRIEVAL_REQUESTED,
    });
  });

  it('authDataRetrievalSucceded creates AUTH_DATA_RETRIEVAL_SUCCEDED ', () => {
    const payload = {
      roles: TEST_ROLES,
      token: TEST_TOKEN,
      user: TEST_USER,
    };

    expect(actions.authDataRetrievalSucceeded(payload)).toEqual({
      payload,
      type: AUTH_DATA_RETRIEVAL_SUCCEEDED,
    });
  });

  it('remindPasswordRequested creates REMIND_PASSWORD_REQUESTED', () => {
    expect(actions.remindPasswordRequested({ email: TEST_EMAIL })).toEqual({
      payload: {
        email: TEST_EMAIL,
      },
      type: REMIND_PASSWORD_REQUESTED,
    });
  });

  it('remindPasswordSucceeded creates REMIND_PASSWORD_SUCCEDED', () => {
    expect(actions.remindPasswordSucceeded()).toEqual({
      type: REMIND_PASSWORD_SUCCEEDED,
    });
  });

  it('remindPasswordFailed creates REMIND_PASSWORD_FAILED', () => {
    const error = new Error('test');
    const payload = { error };

    expect(actions.remindPasswordFailed(error)).toEqual({
      payload,
      type: REMIND_PASSWORD_FAILED,
    });
  });

  it('resetPasswordRequested creates RESET_PASSWORD_REQUESTED', () => {
    const payload = {
      password: TEST_PASSWORD,
      passwordConfirmation: TEST_PASSWORD,
      token: TEST_TOKEN,
    };

    expect(actions.resetPasswordRequested(payload)).toEqual({
      payload,
      type: RESET_PASSWORD_REQUESTED,
    });
  });

  it('resetPasswordSucceeded creates RESET_PASSWORD_SUCCEEDED', () => {
    expect(actions.resetPasswordSucceeded()).toEqual({
      type: RESET_PASSWORD_SUCCEEDED,
    });
  });

  it('resetPasswordFailed creates RESET_PASSWORD_FAILED', () => {
    const error = new Error('test');
    const payload = { error };

    expect(actions.resetPasswordFailed(error)).toEqual({
      payload,
      type: RESET_PASSWORD_FAILED,
    });
  });

  it('verifyAccountRequested creates VERIFY_ACCOUNT_REQUESTED', () => {
    const payload = {
      email: TEST_EMAIL,
      token: TEST_TOKEN,
    };

    expect(actions.verifyAccountRequested(payload)).toEqual({
      payload,
      type: VERIFY_ACCOUNT_REQUESTED,
    });
  });

  it('verifyAccountSucceeded creates VERIFY_ACCOUNT_SUCCEEDED', () => {
    expect(actions.verifyAccountSucceeded()).toEqual({
      type: VERIFY_ACCOUNT_SUCCEEDED,
    });
  });

  it('verifyAccountFailed creates VERIFY_ACCOUNT_FAILED', () => {
    const error = new Error('test');
    const payload = { error };

    expect(actions.verifyAccountFailed(error)).toEqual({
      payload,
      type: VERIFY_ACCOUNT_FAILED,
    });
  });
  // tslint:disable-next-line:max-file-line-count
});
