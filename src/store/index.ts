import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { all, call } from "redux-saga/effects";
import authSlice from "./slices/authSlice";
import userSlice, { userActions } from "./slices/userSlice";
import chatSlice from "./slices/chatSlice";
import { authSaga } from "./sagas/authSaga";
import { userSaga } from "./sagas/userSaga";
import { chatSaga } from "./sagas/chatSaga";
import createSagaMiddleware from "redux-saga";
const reducers = combineReducers({
  auth: authSlice,
  user: userSlice,
  chat: chatSlice,
});
function* rootSaga() {
  yield all([call(authSaga), call(userSaga), call(chatSaga)]);
}
const sagaMiddleware = createSagaMiddleware();
const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    if (!user) return;
    store.dispatch(userActions.check());
  } catch (e) {
    console.error("localstorage is not working");
  }
};
const createStore = () => {
  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
  });
  sagaMiddleware.run(rootSaga);
  return store;
};
const store = createStore();
getUser();
export default store;
export type RootState = ReturnType<typeof store.getState>;
