import { DetailedCourse } from '../actionCreators';
import {
  GET_COURSE_DETAILS_FAILED,
  GET_COURSE_DETAILS_REQUESTED,
  GET_COURSE_DETAILS_SUCCEEDED,
} from '../actions';

export interface ReduxAction {
  readonly type?: string;
  readonly payload?: any;
}

export interface CourseDetailsState {
  readonly course?: DetailedCourse;
  readonly getCourseDetailsError?: any;
  readonly getCourseDetailsLoading?: boolean;
}

const initialState: CourseDetailsState = {
  getCourseDetailsError: null,
  getCourseDetailsLoading: false,
};

const courseDetailsReducer = (
  state: CourseDetailsState = initialState,
  action: ReduxAction = {}
) => {
  switch (action.type) {
    case GET_COURSE_DETAILS_REQUESTED: {
      return {
        ...state,
        getCourseDetailsError: null,
        getCourseDetailsLoading: true,
      };
    }

    case GET_COURSE_DETAILS_SUCCEEDED: {

      return {
        ...state,
        ...action.payload,
        getCourseDetailsError: null,
        getCourseDetailsLoading: false,
      };
    }

    case GET_COURSE_DETAILS_FAILED: {
      return {
        ...initialState,
        getCourseDetailsError: action.payload.error,
        getCourseDetailsLoading: false,
      };
    }

    default:
      return state;
  }
};

export default courseDetailsReducer;
