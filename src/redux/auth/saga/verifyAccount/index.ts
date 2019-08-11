import { push } from 'connected-react-router'
import { call, put, takeLatest } from 'redux-saga/effects';
import api, { Api } from '../../../../api';
import { LOGIN } from '../../../../constants/routes';
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
      yield call(options.api.auth.verifyAccount, action.payload);

      // TODO: implement snackbar
      yield put(verifyAccountSucceeded());
    } catch (error) {
      // FYI: https://github.com/sindresorhus/ky/issues/107
      const { message } = yield error.response.json();

      // TODO: implement snackbar
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
