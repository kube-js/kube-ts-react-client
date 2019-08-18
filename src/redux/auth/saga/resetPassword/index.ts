import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';
import api, { Api } from '../../../../api';
import { LOGIN } from '../../../../constants/routes';
import { enqueueSnackbar } from '../../../notifications/actionCreators';
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
      const { message } = yield call(
        options.api.auth.resetPassword,
        action.payload
      );

      yield put(resetPasswordSucceeded());

      yield put(
        enqueueSnackbar({
          message,
          variant: 'success'
        })
      );

      yield put(push(LOGIN));
    } catch (error) {
      // FYI: https://github.com/sindresorhus/ky/issues/107
      const { message } = yield error.response.json();

      yield put(resetPasswordFailed(message));

      yield put(
        enqueueSnackbar({
          message,
          variant: 'error'
        })
      );
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
