import { call, put, takeLatest } from 'redux-saga/effects';
import createApi, { Api, Options as ApiOptions } from '../../../../api';
import http from '../../../../services/http';
import { enqueueSnackbar } from '../../../alerts/actionCreators';
import {
  resendVerifyTokenFailed,
  ResendVerifyTokenOptions,
  resendVerifyTokenSucceeded,
} from '../../actionCreators';
import { RESEND_VERIFY_TOKEN_REQUESTED } from '../../actions';

export interface Options {
  readonly createApi: (options: ApiOptions) => Api;
}

export const resendVerifyTokenCreator = (options: Options) =>
  function* resendVerifyToken(action: { payload: ResendVerifyTokenOptions }) {
    try {
      const api = options.createApi({
        httpClient: http,
      });

      const { message } = yield call(
        api.auth.resendVerifyToken,
        action.payload
      );

      // TODO: check kube-ts-server should lock only when verifyLockoutExpiresAt is in the future
      // TODO: investigate token is the right one as seems not working

      yield put(resendVerifyTokenSucceeded());

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

      yield put(resendVerifyTokenFailed(message));
    }
  };

export const createResendVerifyTokenSaga = (options: Options) =>
  function* resendVerifyTokenSaga() {
    yield takeLatest<any>(
      RESEND_VERIFY_TOKEN_REQUESTED,
      resendVerifyTokenCreator(options)
    );
  };

export default createResendVerifyTokenSaga({ createApi });
