import { call, put, takeLatest } from 'redux-saga/effects';
import api, { Api } from '../../../api';
import { loginFailed, loginSucceded } from '../actionCreators';
import { LOGIN_REQUESTED } from '../actions';

export interface Options {
  readonly api: Api;
}

export const loginCreator = (options: Options) =>
  function* login(action: { payload: { email: string; password: string } }) {
    try {
      const { email, password } = action.payload;

      const { user, token } = yield call(options.api.auth.login, {
        email,
        password,
      });

      yield put(loginSucceded({ user, token }));
    } catch (error) {
      yield put(loginFailed(JSON.stringify(error)));
    }
  };

export const createLoginSaga = (options: Options) =>
  function* loginSaga() {
    yield takeLatest<any>(LOGIN_REQUESTED, loginCreator(options));
  };

export default createLoginSaga({ api });
