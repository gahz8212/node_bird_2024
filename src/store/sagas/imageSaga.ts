import { put, call, takeLatest } from "redux-saga/effects";
import * as imageAPI from "../../lib/api/image";
import { imageActions } from "../slices/imageSlice";
import { userActions } from "../slices/userSlice";
function* addImageSaga(action: { payload: { image: FormData } }) {
  try {
    const response: { data: { image: FormData } } = yield call(
      imageAPI,
      action.payload
    );
    yield put(imageActions.addImageSuccess(response.data));
  } catch (e: any) {
    yield put(imageActions.addImageFailure(e.response.data));
  }
}
export function* imageSaga() {
  yield takeLatest(imageActions.addImage, addImageSaga);
}
