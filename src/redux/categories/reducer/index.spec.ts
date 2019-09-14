import {
  GET_CATEGORIES_FAILED,
  GET_CATEGORIES_REQUESTED,
  GET_CATEGORIES_SUCCEEDED,
} from '../actions';
import categoriesReducer from './index';

describe('@categoriesReducer', () => {
  const error = new Error('test');

  const initialState = {
    after: undefined,
    before: undefined,
    getCategoriesError: null,
    getCategoriesLoading: false,
    hasAfter: false,
    hasBefore: false,
    items: [],
  };

  it('returns initial state', () => {
    const result = categoriesReducer();

    expect(result).toEqual(initialState);
  });

  it('returns state for GET_CATEGORIES_REQUESTED', () => {
    const action = { type: GET_CATEGORIES_REQUESTED };

    const result = categoriesReducer(undefined, action);

    expect(result).toEqual({
      ...initialState,
      getCategoriesError: null,
      getCategoriesLoading: true,
    });
  });

  it('returns state for GET_CATEGORIES_SUCCEEDED', () => {
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
      payload: {
        ...payload,
        getCategoriesError: null,
        getCategoriesLoading: false,
      },
      type: GET_CATEGORIES_SUCCEEDED,
    };

    const result = categoriesReducer(
      {
        ...initialState,
        getCategoriesError: error,
        getCategoriesLoading: true,
      },
      action
    );

    expect(result).toEqual({
      items: payload.items,
      ...payload.cursor,
      getCategoriesError: null,
      getCategoriesLoading: false,
    });
  });

  it('returns state for GET_CATEGORIES_FAILED', () => {
    const payload = { error };

    const action = { type: GET_CATEGORIES_FAILED, payload };

    const result = categoriesReducer(
      {
        ...initialState,
        getCategoriesLoading: true,
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      getCategoriesError: error,
      getCategoriesLoading: false,
    });
  });
});
