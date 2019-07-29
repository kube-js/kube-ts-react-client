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
} from '../actions';
import authReducer from './index';

describe('@authReducer', () => {
  const error = new Error('test');

  const initialState = {
    error: null,
    loginLoading: false,
    roles: null,
    token: null,
    user: null,
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
      error: null,
      loginLoading: true,
    });
  });

  it('returns state for LOGIN_SUCCEDED', () => {
    const payload = { user: TEST_USER, token: TEST_TOKEN, roles: TEST_ROLES };

    const action = { type: LOGIN_SUCCEEDED, payload };

    const result = authReducer(
      { ...initialState, error, loginLoading: true },
      action
    );

    expect(result).toEqual({
      error: null,
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
      error,
    });
  });

  it('returns state for LOGOUT_REQUESTED', () => {
    const action = { type: LOGOUT_REQUESTED };

    const result = authReducer(
      { error: null, token: TEST_TOKEN, user: TEST_USER, loginLoading: false },
      action
    );

    expect(result).toEqual(initialState);
  });
});
