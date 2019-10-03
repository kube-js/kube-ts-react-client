import { EnhancedCourse } from '../../discoveryItems/actionCreators';
import {
  GET_COURSE_DETAILS_FAILED,
  GET_COURSE_DETAILS_REQUESTED,
  GET_COURSE_DETAILS_SUCCEEDED,
} from '../actions/index';

// tslint:disable-next-line:no-empty-interface
export interface DetailedCourse extends EnhancedCourse {}

export interface CourseDetailsResult {
  readonly course: DetailedCourse;
}

export const getCourseDetailsRequested = (slug: string) => ({
  payload: { slug },
  type: GET_COURSE_DETAILS_REQUESTED,
});

export const getCourseDetailsSucceeded = (result: CourseDetailsResult) => ({
  payload: result,
  type: GET_COURSE_DETAILS_SUCCEEDED,
});

export const getCourseDetailsFailed = (error: any) => ({
  payload: {
    error,
  },
  type: GET_COURSE_DETAILS_FAILED,
});
