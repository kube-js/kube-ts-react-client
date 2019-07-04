import { call, put, takeLatest } from 'redux-saga/effects';
import { TEST_TOKEN, TEST_USER } from '../../../utils/tests/testData';
import { loginFailed, loginSucceded } from '../actionCreators';
import { LOGIN_REQUESTED } from '../actions';

const Api = {
  login: (_: { email: string; password: string }) =>
    Promise.resolve({ user: TEST_USER, token: TEST_TOKEN }),
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
