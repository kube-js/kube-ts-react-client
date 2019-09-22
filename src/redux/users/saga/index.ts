import { toCamel } from 'convert-keys';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import createApi, { Api, Options as ApiOptions } from '../../../api';
import http from '../../../services/http';
import { State } from '../../rootReducer';
import { getUsersFailed, getUsersSucceeded } from '../actionCreators';
import { GET_USERS_REQUESTED } from '../actions';

export interface Options {
  readonly createApi: (options: ApiOptions) => Api;
}

export const getUsersCreator = (options: Options) =>
  function* getUsers() {
    try {
      const token = yield select((state: State) => state.auth.token);

      const anotherApi = options.createApi({
        httpClient: http,
        token,
      });

      const result = yield call(anotherApi.users.getItems, {
        filter: {},
        pagination: {
          limit: 10000, // TODO: just fetch all users for now
        },
      });

      // TODO: apply to Camel for all responses
      yield put(getUsersSucceeded(toCamel(result)));
    } catch (error) {
      // FYI: https://github.com/sindresorhus/ky/issues/107
      const { message } = yield error.response.json();

      yield put(getUsersFailed(message));
    }
  };

export const createUsersSaga = (options: Options) =>
  function* getUsersSaga() {
    yield takeLatest<any>(GET_USERS_REQUESTED, getUsersCreator(options));
  };

export default createUsersSaga({ createApi });
