import {
  TEST_EMAIL,
  TEST_FIRSTNAME,
  TEST_LASTNAME,
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
} from '../actions';
import * as actions from './index';

describe('auth actions', () => {
  it('loginRequested creates LOGIN_REQUESTED', () => {
    expect(actions.loginRequested(TEST_EMAIL, TEST_PASSWORD)).toEqual({
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

  /* START */
  it('registerRequested creates REGISTER_REQUESTED', () => {
    const payload = {
      email: TEST_EMAIL,
      firstName: TEST_FIRSTNAME,
      lastName: TEST_LASTNAME,
      password: TEST_EMAIL,
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
// tslint:disable-next-line:max-file-line-count
});
