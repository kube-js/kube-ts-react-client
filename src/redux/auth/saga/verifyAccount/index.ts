import { call, put, takeLatest } from 'redux-saga/effects';
import createApi, { Api, Options as ApiOptions } from '../../../../api';
import http from '../../../../services/http';
import { enqueueSnackbar } from '../../../alerts/actionCreators';
import {
  verifyAccountFailed,
  VerifyAccountOptions,
  verifyAccountSucceeded,
} from '../../actionCreators';
import { VERIFY_ACCOUNT_REQUESTED } from '../../actions';

export interface Options {
  readonly createApi: (options: ApiOptions) => Api;
}

export const verifyAccountCreator = (options: Options) =>
  function* verifyAccount(action: { payload: VerifyAccountOptions }) {
    try {
      const api = options.createApi({
        httpClient: http,
      });

      const { message } = yield call(
        api.auth.verifyAccount,
        action.payload
      );

      yield put(verifyAccountSucceeded());

      yield put(
        enqueueSnackbar({
          message,
          variant: 'success',
        })
      );
    } catch (error) {
      // FYI: https://github.com/sindresorhus/ky/issues/107
      const { message } = yield error.response.json();

      yield put(
        enqueueSnackbar({
          message,
          variant: 'error',
        })
      );

      yield put(verifyAccountFailed(message));
    }
  };

export const createVerifyAccountSaga = (options: Options) =>
  function* verifyAccountSaga() {
    yield takeLatest<any>(
      VERIFY_ACCOUNT_REQUESTED,
      verifyAccountCreator(options)
    );
  };

export default createVerifyAccountSaga({ createApi });
