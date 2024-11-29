import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../";
type State = {
  [key: string]: { [key: string]: string | number | boolean };
  login: { email: string; password: string };
  join: { email: string; password: string; name?: string; rank?: number };
  status: { error: string; message: string; loading: boolean };
};
const initialState: State = {
  login: { email: "", password: "" },
  join: { email: "", password: "", name: "", rank: 0 },
  status: { error: "", message: "", loading: false },
};
const loginSelector = (state: RootState) => {
  return state.auth.login;
};
const joinSelector = (state: RootState) => {
  return state.auth.join;
};
const statusSelector = (state: RootState) => {
  return state.auth.status;
};
export const authData = createSelector(
  loginSelector,
  joinSelector,
  statusSelector,
  (login, join, status) => ({ login, join, status })
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initForm: (state, { payload: form }) => {
      state[form] = initialState[form];
      state.status = initialState.status;
    },
    changeField: (state, { payload: { form, key, value } }) => {
      state[form][key] = value;
    },

    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.status.error = "";
      state.status.message = "";
      state.status.loading = true;
    },
    loginSuccess: (state, { payload: message }) => {
      state.status.error = "";
      state.status.message = message;
      state.status.loading = false;
    },
    loginFailure: (state, { payload: error }) => {
      state.status.error = error;
      state.status.message = "";
      state.status.loading = false;
    },
    join: (
      state,
      action: PayloadAction<{
        email: string;
        password: string;
        name?: string;
        rank?: number;
      }>
    ) => {
      state.status.message = "";
      state.status.error = "";
      state.status.loading = true;
    },
    joinSuccess: (state, { payload: message }) => {
      state.status.error = "";
      state.status.message = message;
      state.status.loading = false;
    },
    joinFailure: (state, { payload: error }) => {
      state.status.error = error;
      state.status.message = "";
      state.status.loading = false;
    },
  },
});
export default authSlice.reducer;
export const authActions = authSlice.actions;
