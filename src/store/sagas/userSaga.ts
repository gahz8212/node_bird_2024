import { call, put, takeLatest } from "redux-saga/effects";
import * as authAPI from "../../lib/api/auth/authAPI";
import { userActions } from "../slices/userSlice";
function* checkSaga() {
  try {
    const response: { data: { id: number; name: string; rank: number } } =
      yield call(authAPI.check);
    console.log(response.data);
    yield put(userActions.checkSuccess(response.data));
  } catch (e: any) {
    yield put(userActions.checkFailure(e.response.data));
  }
}
function* logoutSaga() {
  try {
    yield call(authAPI.logout);
  } catch (e) {
    console.error(e);
  }
}
export function* userSaga() {
  yield takeLatest(userActions.check, checkSaga);
  yield takeLatest(userActions.logout, logoutSaga);
}
