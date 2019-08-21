import { call, put, takeLatest } from 'redux-saga/effects';
import api, { Api } from '../../../../api';
import {
  AUTH_DATA_ROLES,
  AUTH_DATA_TOKEN,
  AUTH_DATA_USER,
} from '../../../../constants/auth';
import store from '../../../../services/store';
import { enqueueSnackbar } from '../../../alerts/actionCreators';
import { loginFailed, loginSucceeded } from '../../actionCreators';
import { LOGIN_REQUESTED } from '../../actions';

export interface Options {
  readonly api: Api;
  readonly store: typeof store;
}

export const loginCreator = (options: Options) =>
  function* login(action: { payload: { email: string; password: string } }) {
    try {
      const { email, password } = action.payload;

      const { user, token, roles } = yield call(options.api.auth.login, {
        email,
        password,
      });

      store.set(AUTH_DATA_TOKEN, token);
      store.set(AUTH_DATA_ROLES, roles);
      store.set(AUTH_DATA_USER, user);

      yield put(loginSucceeded({ user, token, roles }));
    } catch (error) {
      // FYI: https://github.com/sindresorhus/ky/issues/107
      const { message } = yield error.response.json();

      yield put(loginFailed(message));

      yield put(
        enqueueSnackbar({
          message,
          variant: 'error',
        })
      );
    }
  };

export const createLoginSaga = (options: Options) =>
  function* loginSaga() {
    yield takeLatest<any>(LOGIN_REQUESTED, loginCreator(options));
  };

export default createLoginSaga({ api, store });
