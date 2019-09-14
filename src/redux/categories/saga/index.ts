import { toCamel } from 'convert-keys';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import createApi, { Api, Options as ApiOptions } from '../../../api';
import http from '../../../services/http';
import { State } from '../../rootReducer';
import { getCategoriesFailed, getCategoriesSucceeded } from '../actionCreators';
import { GET_CATEGORIES_REQUESTED } from '../actions';

export interface Options {
  readonly createApi: (options: ApiOptions) => Api;
}

export const getCategoriesCreator = (options: Options) =>
  function* getCategories() {
    try {
      const token = yield select((state: State) => state.auth.token);

      const anotherApi = options.createApi({
        httpClient: http,
        token,
      });

      const result = yield call(anotherApi.categories.getItems, {
        filter: {},
        pagination: {
          limit: 10000, // TODO: just fetch all categories for now
        },
      });

      // TODO: apply to Camel for all responses
      yield put(getCategoriesSucceeded(toCamel(result)));
    } catch (error) {
      // FYI: https://github.com/sindresorhus/ky/issues/107
      const { message } = yield error.response.json();

      yield put(getCategoriesFailed(message));
    }
  };

export const createCategoriesSaga = (options: Options) =>
  function* getCategoriesSaga() {
    yield takeLatest<any>(GET_CATEGORIES_REQUESTED, getCategoriesCreator(options));
  };

export default createCategoriesSaga({ createApi });
