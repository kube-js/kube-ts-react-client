import {
  TEST_EMAIL,
  TEST_PASSWORD,
  TEST_TOKEN,
  TEST_USER,
} from '../../../utils/tests/testData';
import {
  LOGIN_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCEDED,
  LOGOUT_REQUESTED,
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
    const payload = { user: TEST_USER, token: TEST_TOKEN };

    expect(actions.loginSucceded(payload)).toEqual({
      payload,
      type: LOGIN_SUCCEDED,
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

  it('logoutRequested creates LOGOUT_REQUESTED', () => {
    expect(actions.logoutRequested()).toEqual({
      type: LOGOUT_REQUESTED,
    });
  });
});
