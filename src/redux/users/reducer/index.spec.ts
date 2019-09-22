import {
  GET_USERS_FAILED,
  GET_USERS_REQUESTED,
  GET_USERS_SUCCEEDED,
} from '../actions';
import usersReducer from './index';

describe('@usersReducer', () => {
  const error = new Error('test');

  const initialState = {
    after: undefined,
    before: undefined,
    getUsersError: null,
    getUsersLoading: false,
    hasAfter: false,
    hasBefore: false,
    items: [],
  };

  it('returns initial state', () => {
    const result = usersReducer();

    expect(result).toEqual(initialState);
  });

  it('returns state for GET_USERS_REQUESTED', () => {
    const action = { type: GET_USERS_REQUESTED };

    const result = usersReducer(undefined, action);

    expect(result).toEqual({
      ...initialState,
      getUsersError: null,
      getUsersLoading: true,
    });
  });

  it('returns state for GET_USERS_SUCCEEDED', () => {
    const cursor = {
      after: 'afterCursor',
      before: 'beforeCursor',
      hasAfter: true,
      hasBefore: true,
    };

    const payload = {
      cursor,
      items: [
        {
          id: '1',
        },
      ],
    };

    const action = {
      payload: { ...payload, getUsersError: null, getUsersLoading: false },
      type: GET_USERS_SUCCEEDED,
    };

    const result = usersReducer(
      { ...initialState, getUsersError: error, getUsersLoading: true },
      action
    );

    expect(result).toEqual({
      items: payload.items,
      ...payload.cursor,
      getUsersError: null,
      getUsersLoading: false,
    });
  });

  it('returns state for GET_USERS_FAILED', () => {
    const payload = { error };

    const action = { type: GET_USERS_FAILED, payload };

    const result = usersReducer(
      {
        ...initialState,
        getUsersLoading: true,
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      getUsersError: error,
      getUsersLoading: false,
    });
  });
});
