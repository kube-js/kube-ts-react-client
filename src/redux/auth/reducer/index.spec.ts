import { TEST_TOKEN, TEST_USER } from '../../../utils/tests/testData';
import { LOGIN_FAILED, LOGIN_SUCCEDED } from '../actions';
import authReducer from './index';

describe('@authReducer', () => {
  const error = new Error('test');

  it('returns initial state', () => {
    const result = authReducer();

    expect(result).toEqual({
      error: null,
      token: null,
      user: null,
    });
  });

  it('returns state for LOGIN_SUCCEDED', () => {
    const payload = { user: TEST_USER, token: TEST_TOKEN };

    const action = { type: LOGIN_SUCCEDED, payload };

    const result = authReducer({ error, token: null, user: null }, action);

    expect(result).toEqual({ user: TEST_USER, token: TEST_TOKEN, error: null });
  });

  it('returns state for LOGIN_FAILED', () => {
    const payload = { error };

    const action = { type: LOGIN_FAILED, payload };

    const result = authReducer(
      { error: null, token: TEST_TOKEN, user: TEST_USER },
      action
    );

    expect(result).toEqual({ user: null, token: null, error });
  });
});
