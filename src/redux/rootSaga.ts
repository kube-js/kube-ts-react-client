
import { REHYDRATE } from 'redux-persist';
import { all, fork, take } from 'redux-saga/effects';
import authDataSaga from './auth/saga/authData/index';
import loginSaga from './auth/saga/login/index';
import registerSaga from './auth/saga/register/index';
import remindPasswordSaga from './auth/saga/remindPassword/index';
import resendVerifyToken from './auth/saga/resendVerifyToken/index';
import resetPasswordSaga from './auth/saga/resetPassword/index';
import verifyAccount from './auth/saga/verifyAccount';
import autocompleteSaga from './autocomplete/saga/index';
import categoriesSaga from './categories/saga/index';
import courseDetailsSaga from './courseDetails/saga/index';
import coursesSaga from './courses/saga/index';
import discoveryItemsSaga from './discoveryItems/saga/index';
import usersSaga from './users/saga/index';

function* rootSaga() {
  yield take(REHYDRATE); 
  yield all([
    fork(loginSaga),
    fork(registerSaga),
    fork(remindPasswordSaga),
    fork(resetPasswordSaga),
    fork(resendVerifyToken),
    fork(verifyAccount),
    fork(authDataSaga),
    fork(coursesSaga),
    fork(categoriesSaga),
    fork(usersSaga),
    fork(discoveryItemsSaga),
    fork(courseDetailsSaga),
    fork(autocompleteSaga),
  ]);
}

export default rootSaga;