import { put, call, takeLatest } from "redux-saga/effects";
import * as imageAPI from "../../lib/api/image/imageAPI";
import { imageActions } from "../slices/imageSlice";

function* addImageSaga(action: { payload: FormData }) {
  try {
    const response: { data: { url: string }[] } = yield call(
      imageAPI.addImage,
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
