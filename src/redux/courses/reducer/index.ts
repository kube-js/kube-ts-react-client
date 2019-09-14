import Course from '../../../types/items/Course';
import {
  GET_COURSES_FAILED,
  GET_COURSES_REQUESTED,
  GET_COURSES_SUCCEEDED,
} from '../actions';

export interface ReduxAction {
  readonly type?: string;
  readonly payload?: any;
}

export interface CoursesState {
  readonly after?: string;
  readonly before?: string;
  readonly hasAfter?: boolean;
  readonly hasBefore?: boolean;
  readonly getCoursesError?: any;
  readonly getCoursesLoading?: boolean;
  readonly items?: Course[];
}

const initialState: CoursesState = {
  after: undefined,
  before: undefined,
  getCoursesError: null,
  getCoursesLoading: false,
  hasAfter: false,
  hasBefore: false,
  items: [],
};

const coursesReducer = (
  state: CoursesState = initialState,
  action: ReduxAction = {}
) => {
  switch (action.type) {
    case GET_COURSES_REQUESTED: {
      return { ...state, getCoursesError: null, getCoursesLoading: true };
    }

    case GET_COURSES_SUCCEEDED: {
      const { items , cursor} = action.payload;

      return {
        ...state,
        items,
        ...cursor,
        getCoursesError: null,
        getCoursesLoading: false,
      };
    }

    case GET_COURSES_FAILED: {
      return {
        ...initialState,
        getCoursesError: action.payload.error,
        getCoursesLoading: false,
      };
    }
  
    default:
      return state;
  }
};

export default coursesReducer;
