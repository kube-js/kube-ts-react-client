import { push } from 'connected-react-router'
import { call, put, takeLatest } from 'redux-saga/effects';
import api, { Api } from '../../../../api';
import { LOGIN } from '../../../../constants/routes';
import {
  resetPasswordFailed,
  ResetPasswordOptions,
  resetPasswordSucceeded,
} from '../../actionCreators';
import { RESET_PASSWORD_REQUESTED } from '../../actions';

export interface Options {
  readonly api: Api;
}

export const resetPasswordCreator = (options: Options) =>
  function* resetPassword(action: { payload: ResetPasswordOptions }) {
    try {
      yield call(options.api.auth.resetPassword, action.payload);

      // TODO: implement snackbar
      yield put(resetPasswordSucceeded());
      yield put(push(LOGIN));
    } catch (error) {
      // FYI: https://github.com/sindresorhus/ky/issues/107
      const { message } = yield error.response.json();

      // TODO: implement snackbar
      yield put(resetPasswordFailed(message));
    }
  };

export const createResetPasswordSaga = (options: Options) =>
  function* resetPasswordSaga() {
    yield takeLatest<any>(
      RESET_PASSWORD_REQUESTED,
      resetPasswordCreator(options)
    );
  };

export default createResetPasswordSaga({ api });
