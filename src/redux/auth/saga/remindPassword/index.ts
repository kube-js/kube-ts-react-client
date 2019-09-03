import { call, put, takeLatest } from 'redux-saga/effects';
import createApi, { Api, Options as ApiOptions } from '../../../../api';
import http from '../../../../services/http';
import { enqueueSnackbar } from '../../../alerts/actionCreators';
import {
  remindPasswordFailed,
  remindPasswordSucceeded,
} from '../../actionCreators';
import { REMIND_PASSWORD_REQUESTED } from '../../actions';

export interface Options {
  readonly createApi: (options: ApiOptions) => Api;
}

export const remindPasswordCreator = (options: Options) =>
  function* remindPassword(action: { payload: { email: string } }) {
    try {
      const { email } = action.payload;

      const api = options.createApi({
        httpClient: http,
      });

      const { message } = yield call(api.auth.remindPassword, {
        email,
      });

      yield put(
        enqueueSnackbar({
          message,
          variant: 'success',
        })
      );

      yield put(remindPasswordSucceeded());
    } catch (error) {
      // FYI: https://github.com/sindresorhus/ky/issues/107
      const { message } = yield error.response.json();

      yield put(remindPasswordFailed(message));

      yield put(
        enqueueSnackbar({
          message,
          variant: 'error',
        })
      );
    }
  };

export const createRemindPasswordSaga = (options: Options) =>
  function* loginSaga() {
    yield takeLatest<any>(
      REMIND_PASSWORD_REQUESTED,
      remindPasswordCreator(options)
    );
  };

export default createRemindPasswordSaga({ createApi });
