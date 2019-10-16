import {
  AUTOCOMPLETE_FAILED,
  AUTOCOMPLETE_REQUESTED,
  AUTOCOMPLETE_SUCCEEDED,
} from '../actions';
import autocompleteReducer from './index';

describe('@autocompleteReducer', () => {
  const error = new Error('test');
  
  const initialState = {
    autocompleteError: null,
    autocompleteLoading: false,
    courses: [],
    users: [],
  };

  it('returns initial state', () => {
    const result = autocompleteReducer();

    expect(result).toEqual(initialState);
  });

  it('returns state for AUTOCOMPLETE_REQUESTED', () => {
    const action = {
      payload: { term: 'test' },
      type: AUTOCOMPLETE_REQUESTED,
    };

    const result = autocompleteReducer(undefined, action);

    expect(result).toEqual({
      ...initialState,
      autocompleteError: null,
      autocompleteLoading: true,
    });
  });

  it('returns state for AUTOCOMPLETE_SUCCEEDED', () => {

    const payload = {
      courses: [],
      users: [],
    };

    const action = {
      payload: {
        ...payload,
        autocompleteError: null,
        autocompleteLoading: false,
      },
      type: AUTOCOMPLETE_SUCCEEDED,
    };

    const result = autocompleteReducer(
      {
        ...initialState,
        autocompleteError: error,
        autocompleteLoading: true,
      },
      action
    );

    expect(result).toEqual({
      ...payload,
      autocompleteError: null,
      autocompleteLoading: false,
    });
  });

  it('returns state for AUTOCOMPLETE_FAILED', () => {
    const payload = { error };

    const action = { type: AUTOCOMPLETE_FAILED, payload };

    const result = autocompleteReducer(
      {
        ...initialState,
        autocompleteLoading: true,
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      autocompleteError: error,
      autocompleteLoading: false,
    });
  });
  // tslint:disable-next-line:max-file-line-count
});
