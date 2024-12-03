import { call, put, takeLatest } from "redux-saga/effects";
import * as authAPI from "../../lib/api/auth/authAPI";
import { userActions } from "../slices/userSlice";
function* checkSaga() {
  try {
    const response: {
      data: {
        auth: { id: number; name: string; rank: number };
        expires: string;
        userList: string[];
      };
    } = yield call(authAPI.check);
    console.log(response.data);
    yield put(userActions.checkSuccess(response.data));
  } catch (e: any) {
    yield put(userActions.checkFailure(e.response.data));
  }
}
function* logoutSaga() {
  try {
    const response: { data: string[] } = yield call(authAPI.logout);
    console.log(response.data);
    yield put(userActions.logoutSuccess(response.data));
  } catch (e: any) {
    console.error(e);
    yield put(userActions.logoutFailure(e.response.data));
  }
}
function* extends_auth() {
  try {
    const response: { data: string } = yield call(authAPI.extends_auth);
    yield put(userActions.extends_authSuccess(response.data));
  } catch (e: any) {
    console.error(e);
    yield put(userActions.extends_authFailure(e.response.data));
  }
}
export function* userSaga() {
  yield takeLatest(userActions.check, checkSaga);
  yield takeLatest(userActions.logout, logoutSaga);
  yield takeLatest(userActions.extends_auth, extends_auth);
}
