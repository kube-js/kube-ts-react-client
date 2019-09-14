import { toCamel } from 'convert-keys';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import createApi, { Api, Options as ApiOptions } from '../../../api';
import http from '../../../services/http';
import { State } from '../../rootReducer';
import { getCoursesFailed, getCoursesSucceeded } from '../actionCreators';
import { GET_COURSES_REQUESTED } from '../actions';

export interface Options {
  readonly createApi: (options: ApiOptions) => Api;
}

export const getCoursesCreator = (options: Options) =>
  function* getCourses() {
    try {
      const token = yield select((state: State) => state.auth.token);

      const anotherApi = options.createApi({
        httpClient: http,
        token,
      });

      const result = yield call(anotherApi.courses.getItems, {
        filter: {},
        pagination: {
          limit: 10000, // TODO: just fetch all courses for now
        },
      });

      // TODO: apply to Camel for all responses
      yield put(getCoursesSucceeded(toCamel(result)));
    } catch (error) {
      // FYI: https://github.com/sindresorhus/ky/issues/107
      const { message } = yield error.response.json();

      yield put(getCoursesFailed(message));
    }
  };

export const createCoursesSaga = (options: Options) =>
  function* getCoursesSaga() {
    yield takeLatest<any>(GET_COURSES_REQUESTED, getCoursesCreator(options));
  };

export default createCoursesSaga({ createApi });
