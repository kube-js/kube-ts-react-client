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
} from '../actions';
import authReducer from './index';

describe('@authReducer', () => {
  const error = new Error('test');

  const initialState = {
    loginError: null,
    loginLoading: false,
    registerError: null,
    registerLoading: false,
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
// tslint:disable-next-line:max-file-line-count
});
