import { call, put, takeLatest } from 'redux-saga/effects';
import { TEST_TOKEN, TEST_USER } from '../../../utils/tests/testData';
import { loginFailed, loginSucceded } from '../actionCreators';
import { LOGIN_REQUESTED } from '../actions';

const LOGIN_FAKE_TIME = 1000;

const Api = {
  login: ({ email }: { email: string; password: string }) =>
    new Promise(resolve => {
      setTimeout(
        () => resolve({ user: { ...TEST_USER, email }, token: TEST_TOKEN }),
        LOGIN_FAKE_TIME
      );
    }),
};

function* login(action: { payload: { email: string; password: string } }) {
  try {
    const { email, password } = action.payload;

    const { user, token } = yield call(Api.login, { email, password });

    yield put(loginSucceded({ user, token }));
  } catch (error) {
    yield put(loginFailed(error));
  }
}

function* loginSaga() {
  yield takeLatest<any>(LOGIN_REQUESTED, login);
}

export default loginSaga;
