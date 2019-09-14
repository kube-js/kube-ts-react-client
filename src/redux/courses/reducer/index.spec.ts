import {
  GET_COURSES_FAILED,
  GET_COURSES_REQUESTED,
  GET_COURSES_SUCCEEDED,
} from '../actions';
import coursesReducer from './index';

describe('@coursesReducer', () => {
  const error = new Error('test');

  const initialState = {
    after: undefined,
    before: undefined,
    getCoursesError: null,
    getCoursesLoading: false,
    hasAfter: false,
    hasBefore: false,
    items: [],
  };

  it('returns initial state', () => {
    const result = coursesReducer();

    expect(result).toEqual(initialState);
  });

  it('returns state for GET_COURSES_REQUESTED', () => {
    const action = { type: GET_COURSES_REQUESTED };

    const result = coursesReducer(undefined, action);

    expect(result).toEqual({
      ...initialState,
      getCoursesError: null,
      getCoursesLoading: true,
    });
  });

  it('returns state for GET_COURSES_SUCCEEDED', () => {
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
      payload: { ...payload, getCoursesError: null, getCoursesLoading: false },
      type: GET_COURSES_SUCCEEDED,
    };

    const result = coursesReducer(
      { ...initialState, getCoursesError: error, getCoursesLoading: true },
      action
    );

    expect(result).toEqual({
      items: payload.items,
      ...payload.cursor,
      getCoursesError: null,
      getCoursesLoading: false,
    });
  });

  it('returns state for GET_COURSES_FAILED', () => {
    const payload = { error };

    const action = { type: GET_COURSES_FAILED, payload };

    const result = coursesReducer(
      {
        ...initialState,
        getCoursesLoading: true,
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      getCoursesError: error,
      getCoursesLoading: false,
    });
  });
});
