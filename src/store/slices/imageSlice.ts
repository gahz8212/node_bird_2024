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
  return state.images.imageList;
};
const statusSelector = (state: RootState) => {
  return state.images.status;
};
export const imageData = createSelector(
  imageSelector,
  statusSelector,
  (imageList, status) => ({ imageList, status })
);
const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<FormData>) => {
      state.imageList = [];
      state.status.message = "";
      state.status.loading = true;
    },
    addImageSuccess: (state, { payload: image }) => {
      state.imageList = image;
      state.status.message = "image_add_ok";
      state.status.loading = false;
    },
    addImageFailure: (state, { payload: error }) => {
      state.imageList = [];
      state.status.message = error;
      state.status.loading = false;
    },
  },
});
export default imageSlice.reducer;
export const imageActions = imageSlice.actions;
