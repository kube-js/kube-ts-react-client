import { toCamel } from 'convert-keys';
import { call, put, takeLatest } from 'redux-saga/effects';
import createApi, { Api, Options as ApiOptions } from '../../../api';
import http from '../../../services/http';
import {
  getDiscoveryItemsFailed,
  getDiscoveryItemsSucceeded,
} from '../actionCreators';
import { GET_DISCOVERY_ITEMS_REQUESTED } from '../actions';

export interface Options {
  readonly createApi: (options: ApiOptions) => Api;
}

export const getDiscoveryItemsCreator = (options: Options) =>
  function* getDiscoveryItems() {
    try {
      const api = options.createApi({
        httpClient: http,
      });

      const result = yield call(api.getDiscoveryItems, {
        searchParams: { type: 'homepage' },
      });

      yield put(getDiscoveryItemsSucceeded(toCamel(result)));
    } catch (error) {
      // FYI: https://github.com/sindresorhus/ky/issues/107
      const { message } = yield error.response.json();

      yield put(getDiscoveryItemsFailed(message));
    }
  };

export const createDiscoveryItemsSaga = (options: Options) =>
  function* getDiscoveryItemsSaga() {
    yield takeLatest<any>(
      GET_DISCOVERY_ITEMS_REQUESTED,
      getDiscoveryItemsCreator(options)
    );
  };

export default createDiscoveryItemsSaga({ createApi });
