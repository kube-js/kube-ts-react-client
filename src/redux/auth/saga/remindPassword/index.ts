import { call, put, takeLatest } from 'redux-saga/effects';
import api, { Api } from '../../../../api';
import {
  remindPasswordFailed,
  remindPasswordSucceeded,
} from '../../actionCreators';
import { REMIND_PASSWORD_REQUESTED } from '../../actions';

export interface Options {
  readonly api: Api;
}

export const remindPasswordCreator = (options: Options) =>
  function* remindPassword(action: { payload: { email: string } }) {
    try {
      const { email } = action.payload;

      const { message } = yield call(options.api.auth.remindPassword, {
        email,
      });

      // TODO: implement snackbar
      // tslint:disable-next-line:no-console
      console.log(message);
      yield put(remindPasswordSucceeded());
    } catch (error) {
      // FYI: https://github.com/sindresorhus/ky/issues/107
      const { message } = yield error.response.json();

      // TODO: implement snackbar
      yield put(remindPasswordFailed(message));
    }
  };

export const createRemindPasswordSaga = (options: Options) =>
  function* loginSaga() {
    yield takeLatest<any>(
      REMIND_PASSWORD_REQUESTED,
      remindPasswordCreator(options)
    );
  };

export default createRemindPasswordSaga({ api });
