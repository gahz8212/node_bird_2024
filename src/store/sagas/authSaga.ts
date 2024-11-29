import { takeLatest, put, call } from "redux-saga/effects";
import { authActions } from "../slices/authSlice";
import * as authAPI from "../../lib/api/auth/authAPI";
function* loginSaga(action: { payload: { email: string; password: string } }) {
  try {
    const response: { data: string } = yield call(
      authAPI.login,
      action.payload
    );
    yield put(authActions.loginSuccess(response.data));
  } catch (e: any) {
    yield put(authActions.loginFailure(e.response.data));
  }
}
function* joinSaga(action: {
  payload: { email: string; password: string; name?: string; rank?: number };
}) {
  try {
    const response: { data: string } = yield call(authAPI.join, action.payload);
    console.log(response.data);
    yield put(authActions.joinSuccess(response.data));
  } catch (e: any) {
    yield put(authActions.joinFailure(e.response.data));
  }
}

export function* authSaga() {
  yield takeLatest(authActions.login, loginSaga);
  yield takeLatest(authActions.join, joinSaga);
 
}
