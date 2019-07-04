import * as actions from '.';
import { TEST_TOKEN, TEST_USER } from '../../../utils/tests/testData';
import { LOGIN_FAILED, LOGIN_SUCCEDED } from '../actions';

describe('auth actions', () => {
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
});
