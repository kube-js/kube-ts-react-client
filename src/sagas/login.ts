import { call, put, takeLatest } from 'redux-saga/effects';

// trying out redux-saga
const Api = {
  login: ({ email }: { email: string; password: string }) =>
    Promise.resolve({ user: { id: 1, email }, token: 'Bearer yourtoken' }),
};

// worker Saga: will be fired on LOGIN_REQUESTED actions
function* login(action: { payload: { email: string; password: string } }) {
  try {
    const { email, password } = action.payload;
    const { user, token } = yield call(Api.login, { email, password });
    yield put({ type: 'LOGIN_SUCCEEDED', user, token });
  } catch (e) {
    yield put({ type: 'LOGIN_FAILED', message: e.message });
  }
}

function* loginSaga() {
  yield takeLatest<any>('LOGIN_REQUESTED', login);
}

export default loginSaga;
