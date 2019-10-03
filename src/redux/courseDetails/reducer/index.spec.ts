import {
  GET_COURSE_DETAILS_FAILED,
  GET_COURSE_DETAILS_REQUESTED,
  GET_COURSE_DETAILS_SUCCEEDED,
} from '../actions';
import courseDetailsReducer from './index';

describe('@courseDetailsReducer', () => {
  const error = new Error('test');

  const initialState = {
    getCourseDetailsError: null,
    getCourseDetailsLoading: false,
  };

  it('returns initial state', () => {
    const result = courseDetailsReducer();

    expect(result).toEqual(initialState);
  });

  it('returns state for GET_COURSE_DETAILS_REQUESTED', () => {
    const action = {
      payload: { slug: 'slug' },
      type: GET_COURSE_DETAILS_REQUESTED,
    };

    const result = courseDetailsReducer(undefined, action);

    expect(result).toEqual({
      ...initialState,
      getCourseDetailsError: null,
      getCourseDetailsLoading: true,
    });
  });

  it('returns state for GET_COURSE_DETAILS_SUCCEEDED', () => {
    const payload = {
      bestSellers: {
        categories: [{ id: '5' }],
        courses: [
          {
            id: '2',
          },
        ],
      },
      mostViewed: {
        courses: [
          {
            id: '1',
          },
        ],
      },
    };

    const action = {
      payload: {
        ...payload,
        getCourseDetailsError: null,
        getCourseDetailsLoading: false,
      },
      type: GET_COURSE_DETAILS_SUCCEEDED,
    };

    const result = courseDetailsReducer(
      {
        ...initialState,
        getCourseDetailsError: error,
        getCourseDetailsLoading: true,
      },
      action
    );

    expect(result).toEqual({
      ...payload,
      getCourseDetailsError: null,
      getCourseDetailsLoading: false,
    });
  });

  it('returns state for GET_COURSE_DETAILS_FAILED', () => {
    const payload = { error };

    const action = { type: GET_COURSE_DETAILS_FAILED, payload };

    const result = courseDetailsReducer(
      {
        ...initialState,
        getCourseDetailsLoading: true,
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      getCourseDetailsError: error,
      getCourseDetailsLoading: false,
    });
  });
  // tslint:disable-next-line:max-file-line-count
});
