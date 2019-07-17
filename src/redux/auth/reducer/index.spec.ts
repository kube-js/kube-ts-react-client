import { TEST_TOKEN, TEST_USER } from '../../../utils/tests/testData';
import { LOGIN_FAILED, LOGIN_REQUESTED, LOGIN_SUCCEDED, LOGOUT_REQUESTED } from '../actions';
import authReducer from './index';

describe('@authReducer', () => {
  const error = new Error('test');

  it('returns initial state', () => {
    const result = authReducer();

    expect(result).toEqual({
      error: null,
      loginLoading: false,
      token: null,
      user: null,
    });
  });

  it('returns state for LOGIN_REQUESTED', () => {
    const action = { type: LOGIN_REQUESTED };

    const result = authReducer(undefined, action);

    expect(result).toEqual({
      error: null,
      loginLoading: true,
      token: null,
      user: null,
    });
  });

  it('returns state for LOGIN_SUCCEDED', () => {
    const payload = { user: TEST_USER, token: TEST_TOKEN };

    const action = { type: LOGIN_SUCCEDED, payload };

    const result = authReducer({ error, token: null, user: null, loginLoading: true }, action);

    expect(result).toEqual({ user: TEST_USER, token: TEST_TOKEN, error: null, loginLoading: false });
  });

  it('returns state for LOGIN_FAILED', () => {
    const payload = { error };

    const action = { type: LOGIN_FAILED, payload };

    const result = authReducer(
      { error: null, token: TEST_TOKEN, user: TEST_USER, loginLoading: true},
      action
    );

    expect(result).toEqual({ user: null, token: null, loginLoading: false, error });
  });

  it('returns state for LOGOUT_REQUESTED', () => {

    const action = { type: LOGOUT_REQUESTED };

    const result = authReducer(
      { error: null, token: TEST_TOKEN, user: TEST_USER, loginLoading: false},
      action
    );

    expect(result).toEqual({ user: null, token: null, loginLoading: false, error: null });
  });
});
