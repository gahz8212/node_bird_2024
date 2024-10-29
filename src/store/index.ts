import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { all, call } from "redux-saga/effects";
import authSlice from "./slices/authSlice";
import { authSaga } from "./sagas/authSaga";
import createSagaMiddleware from "redux-saga";
const reducers = combineReducers({ auth: authSlice });
function* rootSaga() {
  yield all([call(authSaga)]);
}
const sagaMiddleware = createSagaMiddleware();
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
export default store;
export type RootState = ReturnType<typeof store.getState>;
