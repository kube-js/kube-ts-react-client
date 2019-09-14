import { Result } from '@js-items/foundation/dist/functions/GetItems';
import Course from '../../../types/items/Course';
import {
  GET_COURSES_FAILED,
  GET_COURSES_REQUESTED,
  GET_COURSES_SUCCEEDED,
} from '../actions/index';

export const getCoursesRequested = () => ({
  type: GET_COURSES_REQUESTED,
});

export const getCoursesSucceeded = (result: Result<Course>) => ({
  payload: result,
  type: GET_COURSES_SUCCEEDED,
});

export const getCoursesFailed = (error: any) => ({
  payload: {
    error,
  },
  type: GET_COURSES_FAILED,
});