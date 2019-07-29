import { put, takeLatest } from 'redux-saga/effects';
import {
  AUTH_DATA_ROLES,
  AUTH_DATA_TOKEN,
  AUTH_DATA_USER,
} from '../../../../constants/auth';
import store from '../../../../services/store';
import { authDataRetrievalSucceeded } from '../../actionCreators';
import {
  AUTH_DATA_RETRIEVAL_REQUESTED,
  LOGOUT_REQUESTED,
} from '../../actions';

interface Options {
  readonly store: typeof store;
}

export const createFetchData = (options: Options) =>
  function* fetchData() {
    const token = options.store.get(AUTH_DATA_TOKEN);
    const roles = options.store.get(AUTH_DATA_ROLES);
    const user = options.store.get(AUTH_DATA_USER);

    yield put(authDataRetrievalSucceeded({ roles, user, token }));
  };

export const createCleanupData = (options: Options) =>
  function* cleanupData() {
    yield options.store.clearAll();
  };

export const createAuthDataSaga = (options: Options) =>
  function* authDataSaga() {
    yield takeLatest<any>(
      AUTH_DATA_RETRIEVAL_REQUESTED,
      createFetchData(options)
    );

    yield takeLatest<any>(
      LOGOUT_REQUESTED,
      createCleanupData(options)
    );
  };

export default createAuthDataSaga({ store });
