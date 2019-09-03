import { call, put, takeLatest } from 'redux-saga/effects';
import createApi, { Api, Options as ApiOptions } from '../../../../api';
import {
  AUTH_DATA_ROLES,
  AUTH_DATA_TOKEN,
  AUTH_DATA_USER,
} from '../../../../constants/auth';
import http from '../../../../services/http';
import store from '../../../../services/store';
import { enqueueSnackbar } from '../../../alerts/actionCreators';
import { loginFailed, loginSucceeded } from '../../actionCreators';
import { LOGIN_REQUESTED } from '../../actions';

export interface Options {
  readonly createApi: (options: ApiOptions) => Api;
  readonly store: typeof store;
}

export const loginCreator = (options: Options) =>
  function* login(action: { payload: { email: string; password: string } }) {
    try {
      const { email, password } = action.payload;

      // TODO: refactor this
      // const authToken = yield select((state: State) => state.auth.token);

      const api = options.createApi({
        httpClient: http,
      });

      const { user, token, roles } = yield call(api.auth.login, {
        email,
        password,
      });

      // TODO: refactor this
      // TODO: create /me endpoint
      // TODO: replace connect redux with hooks
      // const anotherApi = options.createApi({
      //   httpClient: http,
      //   token,
      // });
      // const response = yield call(anotherApi.users.getItems, {
      //   filter: {},
      //   pagination: {
      //     limit: 10,
      //   },
      // });

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

export default createLoginSaga({ createApi, store });
