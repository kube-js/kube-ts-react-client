import { toCamel } from 'convert-keys';
import { call, put, takeLatest } from 'redux-saga/effects';
import createApi, { Api, Options as ApiOptions } from '../../../api';
import http from '../../../services/http';
import {
  CourseDetailsResult,
  getCourseDetailsFailed,
  getCourseDetailsSucceeded,
} from '../actionCreators';
import { GET_COURSE_DETAILS_REQUESTED } from '../actions';

export interface Options {
  readonly createApi: (options: ApiOptions) => Api;
}

export const getCourseDetailsCreator = (options: Options) =>
  function* getCourseDetails(action: { payload: { slug: string } }) {
    try {
      const api = options.createApi({
        httpClient: http,
      });

      const result: CourseDetailsResult = yield call(api.getDiscoveryItems as any, {
        searchParams: {
          filter: JSON.stringify({ slug: { $eq: action.payload.slug } }),
          type: 'course',
        },
      });

      yield put(getCourseDetailsSucceeded(toCamel(result)));
    } catch (error) {
      // FYI: https://github.com/sindresorhus/ky/issues/107
      const { message } = yield error.response.json();

      yield put(getCourseDetailsFailed(message));
    }
  };

export const createCourseDetailsSaga = (options: Options) =>
  function* getCourseDetailsSaga() {
    yield takeLatest<any>(
      GET_COURSE_DETAILS_REQUESTED,
      getCourseDetailsCreator(options)
    );
  };

export default createCourseDetailsSaga({ createApi });
