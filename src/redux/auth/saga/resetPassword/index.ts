import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';
import createApi, { Api, Options as ApiOptions } from '../../../../api';
import { LOGIN } from '../../../../constants/routes';
import http from '../../../../services/http';
import { enqueueSnackbar } from '../../../alerts/actionCreators';
import {
  resetPasswordFailed,
  ResetPasswordOptions,
  resetPasswordSucceeded,
} from '../../actionCreators';
import { RESET_PASSWORD_REQUESTED } from '../../actions';

export interface Options {
  readonly createApi: (options: ApiOptions) => Api;
}

export const resetPasswordCreator = (options: Options) =>
  function* resetPassword(action: { payload: ResetPasswordOptions }) {
    try {
      const api = options.createApi({
        httpClient: http,
      });

      const { message } = yield call(
        api.auth.resetPassword,
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

export default createResetPasswordSaga({ createApi });
