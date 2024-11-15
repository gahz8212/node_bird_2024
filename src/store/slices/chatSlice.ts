import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
type State = {
  imageList: { url: string }[];
  status: { message: string; loading: boolean };
};
const initialState: State = {
  imageList: [],
  status: { message: "", loading: false },
};
const imageSelector = (state: RootState) => {
  return state.chat.imageList;
};
const statusSelector = (state: RootState) => {
  return state.chat.status;
};
export const chatData = createSelector(
  imageSelector,
  statusSelector,
  (imageList, status) => ({ imageList, status })
);
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<FormData>) => {
      state.imageList = [];
      state.status.message = "";
      state.status.loading = true;
    },
    addImageSuccess: (state, { payload: message }) => {
      // state.imageList = image;
      state.status.message = message;
      state.status.loading = false;
    },
    addImageFailure: (state, { payload: error }) => {
      state.imageList = [];
      state.status.message = error;
      state.status.loading = false;
    },
  },
});
export default chatSlice.reducer;
export const chatActions = chatSlice.actions;
