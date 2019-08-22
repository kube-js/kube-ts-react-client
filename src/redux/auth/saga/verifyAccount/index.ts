import { call, put, takeLatest } from 'redux-saga/effects';
import api, { Api } from '../../../../api';
import { enqueueSnackbar } from '../../../alerts/actionCreators';
import {
  verifyAccountFailed,
  VerifyAccountOptions,
  verifyAccountSucceeded,
} from '../../actionCreators';
import { VERIFY_ACCOUNT_REQUESTED } from '../../actions';

export interface Options {
  readonly api: Api;
}

export const verifyAccountCreator = (options: Options) =>
  function* verifyAccount(action: { payload: VerifyAccountOptions }) {
    try {
      const { message } = yield call(
        options.api.auth.verifyAccount,
        action.payload
      );

      yield put(verifyAccountSucceeded());

      yield put(
        enqueueSnackbar({
          message,
          variant: 'success'
        })
      );
    } catch (error) {
      // FYI: https://github.com/sindresorhus/ky/issues/107
      const { message } = yield error.response.json();

      yield put(
        enqueueSnackbar({
          message,
          variant: 'error'
        })
      );

      yield put(verifyAccountFailed(message));
    }
  };

export const createVerifyAccountSaga = (options: Options) =>
  function* verifyAccountAccountSaga() {
    yield takeLatest<any>(
      VERIFY_ACCOUNT_REQUESTED,
      verifyAccountCreator(options)
    );
  };

export default createVerifyAccountSaga({ api });
